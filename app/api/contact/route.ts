import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/lab/validation';

export const runtime = 'edge';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function GET() {
  return NextResponse.json({ status: 'ok', endpoint: '/api/contact' });
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

    // 1. IP Rate Limiting (max 5 submissions per minute)
    try {
      const { allowed } = checkRateLimit(ip);
      if (!allowed) {
        return NextResponse.json(
          { error: 'Too many contact requests. Please wait a minute before submitting again.' },
          { status: 429 }
        );
      }
    } catch {
      // Graceful fallback if rate limiter fails
    }

    const toEmail = (typeof process !== 'undefined' && process.env?.CONTACT_TO_EMAIL) || 'durgeshdsinha@gmail.com';
    const resendApiKey = (typeof process !== 'undefined' && process.env?.RESEND_API_KEY) || '';

    const body = await req.json();
    const { name, email, subject, message, _gotcha } = body;

    // 2. Honeypot check (Spam protection)
    if (_gotcha) {
      return NextResponse.json({
        success: true,
        message: 'Your message has been queued for delivery.',
      });
    }

    // 3. Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { error: 'Please provide a valid name (between 2 and 100 characters).' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid email address (e.g. name@domain.com).' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 2 || message.trim().length > 2500) {
      return NextResponse.json(
        { error: 'Message must be between 2 and 2,500 characters.' },
        { status: 400 }
      );
    }

    const cleanName    = name.trim();
    const cleanEmail   = email.trim();
    const cleanSubject = (subject || 'General Enquiry').trim();
    const cleanMessage = message.trim();

    // 4. Send via Resend REST API (pure fetch — works on Edge + Node.js runtimes)
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
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
              <p style="margin:0;font-size:11px;color:#475569;font-family:monospace;">Sent via durgesh-flagship-portfolio · Direct Message Dispatch · Production Edge</p>
            </div>
          </div>
        `,
      }),
    });

    if (!resendRes.ok) {
      let resendError = 'Resend API error';
      try { const d = await resendRes.json(); resendError = d?.message || resendError; } catch { /* ignore */ }
      console.error(`[Contact API] Resend error ${resendRes.status}:`, resendError);
      return NextResponse.json(
        { error: 'Message delivery failed. Please email me directly or try again shortly.' },
        { status: 502 }
      );
    }

    console.log(`[Contact API] ✅ Delivered — from ${cleanName} <${cleanEmail}>: [${cleanSubject}]`);

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received. Durgesh will respond within 24 hours.',
      timestamp: new Date().toISOString(),
    });

  } catch (err: any) {
    console.error('[Contact API error]', err);
    return NextResponse.json(
      { error: 'Invalid request body or JSON parsing failure.' },
      { status: 400 }
    );
  }
}
