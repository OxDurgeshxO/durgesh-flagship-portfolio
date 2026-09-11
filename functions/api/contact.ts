interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const onRequestGet = async () => {
  return new Response(JSON.stringify({ status: 'ok', endpoint: '/api/contact' }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const body: any = await context.request.json();
    const { name, email, subject, message, _gotcha } = body;

    // Honeypot check
    if (_gotcha) {
      return new Response(JSON.stringify({
        success: true,
        message: 'Your message has been queued for delivery.',
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      return new Response(JSON.stringify({ error: 'Please provide a valid name (between 2 and 100 characters).' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return new Response(JSON.stringify({ error: 'Please provide a valid email address (e.g. name@domain.com).' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 2 || message.trim().length > 2500) {
      return new Response(JSON.stringify({ error: 'Message must be between 2 and 2,500 characters.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = (subject || 'General Enquiry').trim();
    const cleanMessage = message.trim();

    const apiKey = context.env?.RESEND_API_KEY || '';
    const toEmail = context.env?.CONTACT_TO_EMAIL || 'durgeshdsinha@gmail.com';

    // Send via Resend REST API
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'DDS Portfolio <onboarding@resend.dev>',
        to: [toEmail],
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
                  <span style="font-size:15px;color:#f1f5f9;font-weight:600;">${cleanName}</span>
                </td></tr>
                <tr><td style="padding:10px 14px;background:#1a1a2e;border-bottom:1px solid #2d2d4a;">
                  <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#7c3aed;font-weight:600;">EMAIL</span><br/>
                  <a href="mailto:${cleanEmail}" style="color:#a78bfa;font-size:14px;">${cleanEmail}</a>
                </td></tr>
                <tr><td style="padding:10px 14px;background:#1a1a2e;border-radius:0 0 8px 8px;">
                  <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#7c3aed;font-weight:600;">TOPIC</span><br/>
                  <span style="font-size:14px;color:#f1f5f9;">${cleanSubject}</span>
                </td></tr>
              </table>
              <div style="background:#1a1a2e;border-radius:8px;padding:18px;border-left:3px solid #7c3aed;">
                <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#7c3aed;font-weight:600;">MESSAGE</p>
                <p style="margin:0;font-size:15px;line-height:1.7;color:#e2e8f0;white-space:pre-wrap;">${cleanMessage}</p>
              </div>
              <div style="margin-top:24px;text-align:center;">
                <a href="mailto:${cleanEmail}?subject=Re: [Portfolio Contact] ${encodeURIComponent(cleanSubject)}"
                   style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#7c3aed,#e11d48);color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
                  ↩ Reply to ${cleanName}
                </a>
              </div>
            </div>
            <div style="padding:16px 32px;background:#0a0a14;border-top:1px solid #2d2d4a;text-align:center;">
              <p style="margin:0;font-size:11px;color:#475569;font-family:monospace;">Sent via durgesh-flagship-portfolio · Direct Message Dispatch · Beta</p>
            </div>
          </div>
        `,
      }),
    });

    if (!resendRes.ok) {
      let resendError = 'Resend API error';
      try { const d = await resendRes.json(); resendError = d?.message || resendError; } catch {}
      console.error('[Contact Function] Resend error:', resendError);
      return new Response(JSON.stringify({ error: 'Message delivery failed. Please email me directly or try again shortly.' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Thank you! Your message has been received. Durgesh will respond within 24 hours.',
      timestamp: new Date().toISOString(),
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
