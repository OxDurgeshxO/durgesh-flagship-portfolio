/**
 * Shared request guards for the Cloudflare Pages Functions in `functions/`.
 *
 * These live here rather than duplicated inside each Function so the guards cannot
 * silently drift apart — which is exactly how the previous duplication shipped an
 * unprotected production endpoint while the protected copy sat in an unreachable
 * Next.js API route.
 *
 * This file is compiled twice: by `tsc` (tsconfig `include` covers `**\/*.ts`) and
 * by the Cloudflare Pages Functions bundler. It must therefore typecheck with only
 * the DOM + ESNext libs. Do NOT add `@cloudflare/workers-types` or Node built-ins.
 */

export interface KVNamespaceLike {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

export interface RateLimitEnv {
  /** Optional KV binding. When absent, throttling is skipped and logged (see below). */
  RATE_LIMIT?: KVNamespaceLike;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  /** True when the limiter could not run (missing binding or KV failure) and the request was let through. */
  degraded: boolean;
}

const DEFAULT_WINDOW_SECONDS = 60;
const DEFAULT_LIMIT = 5;

/**
 * Resolve the client IP for rate-limit keying.
 *
 * `cf-connecting-ip` is set by Cloudflare's edge and overwrites any value supplied
 * by the client, so it is the trusted source. `x-forwarded-for` is deliberately NOT
 * used as the primary key: it is a client-influenceable, comma-separated string, so
 * an attacker could rotate it to obtain a fresh bucket on every request.
 */
export function getClientIp(request: Request): string {
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp && cfIp.trim()) return cfIp.trim();

  const realIp = request.headers.get('x-real-ip');
  if (realIp && realIp.trim()) return realIp.trim();

  // Local `wrangler pages dev` and non-Cloudflare contexts land here. All such
  // callers share one bucket, which is acceptable for development only.
  return 'unknown';
}

/**
 * KV-backed fixed-window rate limiter.
 *
 * Why KV and not the previous in-memory `Map`: Cloudflare isolates are ephemeral and
 * horizontally scaled, so every isolate kept its own counters and the limiter did not
 * actually limit anything. The old map also grew without bound because entries were
 * only ever filtered for the key being accessed.
 *
 * ACCURACY: Cloudflare KV is eventually consistent and has no atomic increment, so
 * this throttles approximately — a concurrent burst from one IP can slip a few extra
 * requests through, and KV writes can lag briefly between edge locations. That is
 * acceptable for contact-form spam control. For exact enforcement, replace the store
 * with a Durable Object and keep this function signature.
 */
export async function checkRateLimit(
  env: RateLimitEnv | undefined,
  clientIp: string,
  options?: { limit?: number; windowSeconds?: number },
): Promise<RateLimitResult> {
  const limit = options?.limit ?? DEFAULT_LIMIT;
  const windowSeconds = options?.windowSeconds ?? DEFAULT_WINDOW_SECONDS;
  const store = env?.RATE_LIMIT;

  if (!store) {
    console.warn(
      '[rate-limit] RATE_LIMIT KV binding is not configured — request was NOT throttled. ' +
        'Add a [[kv_namespaces]] binding named RATE_LIMIT in wrangler.toml. See docs/security.md.',
    );
    return { allowed: true, remaining: limit, degraded: true };
  }

  const window = Math.floor(Date.now() / (windowSeconds * 1000));
  const key = `ratelimit:${clientIp}:${window}`;

  try {
    const raw = await store.get(key);
    const used = raw ? Number.parseInt(raw, 10) || 0 : 0;

    if (used >= limit) {
      return { allowed: false, remaining: 0, degraded: false };
    }

    await store.put(key, String(used + 1), { expirationTtl: windowSeconds * 2 });
    return { allowed: true, remaining: Math.max(0, limit - used - 1), degraded: false };
  } catch (error) {
    // Fail open: a KV outage should not take the contact form down with it.
    console.error('[rate-limit] KV operation failed; failing open:', error);
    return { allowed: true, remaining: limit, degraded: true };
  }
}

/**
 * Escape a value before interpolating it into an HTML email body.
 *
 * Without this, a contact-form submission can inject arbitrary markup — including
 * links — into the notification email. The `&` replacement runs first so that
 * already-escaped entities are not double-encoded.
 */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Build the standard JSON error response used by the Functions. */
export function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
