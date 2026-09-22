import {
  checkRateLimit,
  escapeHtml,
  getClientIp,
  jsonError,
  type RateLimitEnv,
} from '../../lib/api/guards';

interface Env extends RateLimitEnv {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const CONTACT_RATE_LIMIT = { limit: 5, windowSeconds: 60 };

/** Hard cap on the request body, enforced before the JSON parser is invoked. */
const MAX_BODY_BYTES = 20_000;

/** Upper bound for the optional subject line, which is echoed into the notification email. */
const MAX_SUBJECT_LENGTH = 120;

export const onRequestGet = async () => {
  return new Response(JSON.stringify({ status: 'ok', endpoint: '/api/contact' }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    // 1. IP Rate Limiting (KV-backed — see lib/api/guards.ts for why in-memory fails here)
    const clientIp = getClientIp(context.request);
    const rate = await checkRateLimit(context.env, clientIp, CONTACT_RATE_LIMIT);

    if (!rate.allowed) {
      return new Response(
        JSON.stringify({
          error: 'Too many contact requests. Please wait a minute before submitting again.',
        }),
        {
          status: 429,
          headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
        },
      );
    }

    // Reject oversized bodies before parsing. Without this a caller can post an arbitrarily
    // large JSON document and the isolate pays to parse it.
    const contentLength = Number(context.request.headers.get('content-length') ?? 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return jsonError('Request body too large.', 413);
    }

    const parsed: unknown = await context.request.json();
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return jsonError('Request body must be a JSON object.', 400);
    }
    // Typed as an index signature rather than `any`: every field is still narrowed with
    // typeof checks below, so unvalidated external data never reaches the interpolation sites.
    const body = parsed as Record<string, unknown>;
    const name = body.name;
    const email = body.email;
    const subject = body.subject;
    const message = body.message;
    const _gotcha = body._gotcha;

    // 2. Honeypot check (Spam protection)
    if (_gotcha) {
      return new Response(JSON.stringify({
        success: true,
        message: 'Your message has been queued for delivery.',
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3. Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      return jsonError('Please provide a valid name (between 2 and 100 characters).', 400);
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return jsonError('Please provide a valid email address (e.g. name@domain.com).', 400);
    }

    if (!message || typeof message !== 'string' || message.trim().length < 2 || message.trim().length > 2500) {
      return jsonError('Message must be between 2 and 2,500 characters.', 400);
    }

    if (subject !== undefined && subject !== null && typeof subject !== 'string') {
      return jsonError('Please provide the subject as text.', 400);
    }

    if (typeof subject === 'string' && subject.trim().length > MAX_SUBJECT_LENGTH) {
      return jsonError(`Subject must be ${MAX_SUBJECT_LENGTH} characters or fewer.`, 400);
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = (typeof subject === 'string' && subject.trim() ? subject : 'General Enquiry').trim();
    const cleanMessage = message.trim();

    // 4. Escape everything that reaches the email body. Without this a submission can
    //    inject arbitrary markup and links into the notification email.
    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safeSubject = escapeHtml(cleanSubject);
    const safeMessage = escapeHtml(cleanMessage);
    const mailtoEmail = encodeURIComponent(cleanEmail);

    const apiKey = context.env?.RESEND_API_KEY || '';
    const toEmail = context.env?.CONTACT_TO_EMAIL || 'durgeshdsinha@gmail.com';

    // 5. Send via Resend REST API if key is available, or gracefully log dispatch
    if (apiKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'DDS Portfolio <onboarding@resend.dev>',
            to: [toEmail],
            // reply_to must be the raw address — Resend validates it, so never send escaped entities.
            reply_to: cleanEmail,
            subject: `[Portfolio Contact] ${cleanSubject} — from ${cleanName}`,
            html: `
              <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0f0f1a;color:#e2e8f0;border-radius:12px;overflow:hidden;border:1px solid #2d2d4a;">
                <div style="background:linear-gradient(135deg,#7c3aed,#e11d48);padding:28px 32px;">
                  <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff;letter-spacing:-0.5px;">📬 New Contact Message</h1>
                  <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.8);font-family:monospace;">durgesh-flagship-portfolio · Direct Message Dispatch</p>
                </div>
                <div style="padding:28px 32px;">
                  <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
                    <tr><td style="padding:10px 14px;background:#1a1a2e;border-radius:8px 8px 0 0;border-bottom:1px solid #2d2d4a;">
                      <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#7c3aed;font-weight:600;">FROM</span><br/>
                      <span style="font-size:15px;color:#f1f5f9;font-weight:600;">${safeName}</span>
                    </td></tr>
                    <tr><td style="padding:10px 14px;background:#1a1a2e;border-bottom:1px solid #2d2d4a;">
                      <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#7c3aed;font-weight:600;">EMAIL</span><br/>
                      <a href="mailto:${mailtoEmail}" style="color:#a78bfa;font-size:14px;">${safeEmail}</a>
                    </td></tr>
                    <tr><td style="padding:10px 14px;background:#1a1a2e;border-radius:0 0 8px 8px;">
                      <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#7c3aed;font-weight:600;">TOPIC</span><br/>
                      <span style="font-size:14px;color:#f1f5f9;">${safeSubject}</span>
                    </td></tr>
                  </table>
                  <div style="background:#1a1a2e;border-radius:8px;padding:18px;border-left:3px solid #7c3aed;">
                    <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#7c3aed;font-weight:600;">MESSAGE</p>
                    <p style="margin:0;font-size:15px;line-height:1.7;color:#e2e8f0;white-space:pre-wrap;">${safeMessage}</p>
                  </div>
                  <div style="margin-top:24px;text-align:center;">
                    <a href="mailto:${mailtoEmail}?subject=Re: [Portfolio Contact] ${encodeURIComponent(cleanSubject)}"
                       style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#7c3aed,#e11d48);color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
                      ↩ Reply to ${safeName}
                    </a>
                  </div>
                </div>
                <div style="padding:16px 32px;background:#0a0a14;border-top:1px solid #2d2d4a;text-align:center;">
                  <p style="margin:0;font-size:11px;color:#475569;font-family:monospace;">Sent via durgesh-flagship-portfolio · Direct Message Dispatch · Production Edge</p>
                </div>
              </div>
            `,
          }),
        });

        if (!resendRes.ok) {
          let resendError = 'Resend API error';
          try { const d = await resendRes.json(); resendError = d?.message || resendError; } catch {}
          console.warn('[Contact Function] Resend warning:', resendRes.status, resendError);
        }
      } catch (e) {
        console.warn('[Contact Function] Resend network error:', e);
      }
    } else {
      console.log(`[Contact Function] Simulation dispatch for ${safeEmail}: ${safeSubject}`);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Thank you! Your message has been received. Durgesh will respond within 24 hours.',
      timestamp: new Date().toISOString(),
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[Contact Function] Unhandled error:', err);
    return jsonError('Invalid request body or JSON parsing failure.', 400);
  }
};
