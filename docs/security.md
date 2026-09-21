# Security & Privacy Architecture

## Threat Modeling & Defense-in-Depth

The portfolio incorporates defense-in-depth measures against common web application threat vectors:

---

## 1. Secrets & Credentials Isolation
- **Client Bundle Sanitization**: No private environment variables are prefixed with `NEXT_PUBLIC_`.
- **Serverless API Execution**: Inbound email dispatches via Resend are executed strictly in serverless edge handlers. API tokens are stored in Cloudflare environment secrets.
- **Automated Scans**: CI workflows run secret-scanning and AST static analysis to catch accidental credentials commits before merging.

---

## 2. API Abuse & Denial of Service Protection
- **Fixed-Window IP Rate Limiting (IMPLEMENTED BUT INACTIVE)**: The limiter in `lib/api/guards.ts` uses a **fixed** window (`Math.floor(Date.now() / window)`), not a sliding window. It is **not enforcing anything in production**: the `RATE_LIMIT` KV binding is commented out in `wrangler.toml` (lines 19-21), so `checkRateLimit` fails open — it logs a warning and returns `{ allowed: true, degraded: true }` while allowing the request through.
- **Configured Limits (apply only once the binding is provisioned)**: `/api/contact` = 5 requests/minute (`HTTP 429 Too Many Requests` when exceeded); the AI Lab endpoints (`/api/lab/resume`, `/api/lab/marketmatch`) = 20 requests/minute (`LAB_RATE_LIMIT = { limit: 20, windowSeconds: 60 }`).
- **Honeypot Trapping**: A hidden `_gotcha` form field silently captures bot spiders without executing external API calls.
- **Payload Sanitization**: Inbound JSON payloads are strictly bounded (e.g. name ≤ 100 characters, message ≤ 2,500 characters, regex email validation).

---

## 3. Client Hardware Isolation
- **Camera Access**: Strictly opt-in for the FitTrack AI Lab demo. Video streams run in local browser memory and never leave the device.
- **Microphone**: Zero microphone access across all components.
- **Web Audio**: CyberBot companion sound synthesis generates non-persistent sine waves through the HTML5 AudioContext API.

---

## 4. Dependency Risk Acceptance (Next.js Advisories)

- `npm ci` reports exactly **1 critical vulnerability**, and the sole vulnerable package is **`next@14.2.35`**, which carries **23 advisories** (not 2). Representative examples: GHSA-h25m-26qc-wcjf (RSC deserialization DoS) and GHSA-9g9p-9gw9-jx7f (Image Optimizer `remotePatterns` DoS).
- The full set of 23 advisories is auto-accepted by `scripts/audit.mjs`, which only runs `npm audit --json` and exits 0 when `next` is the sole vulnerable package; `npm run audit` exits 0 today. `scripts/audit.mjs` does **not** check `.env` files, CSP headers, or bundle sizes.
- **Generalized justification**: production ships a static export (`output: "export"`) with `images.unoptimized: true`, so there is no Next.js server runtime in production at all. Every advisory in the set targets a server-side Next.js code path (RSC deserialization, image optimization endpoint, middleware/server actions) that is never present in the exported static output.
- **Remediation Plan**: a major Next.js upgrade (15+) is tracked as an isolated future milestone.
