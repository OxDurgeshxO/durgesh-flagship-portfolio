import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/lab/validation';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

  // 1. IP Rate Limiting (max 5 submissions per minute)
  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many contact requests. Please wait a minute before submitting again.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { name, email, subject, message, _gotcha } = body;

    // 2. Honeypot check (Spam protection)
    if (_gotcha) {
      // Quietly succeed to fool bot harvesters
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

    // 4. Log or dispatch message
    // In Edge environment, we log the verified submission
    console.log(`[Contact API] Message from ${name.trim()} <${email.trim()}>: [${subject || 'General'}] ${message.slice(0, 80)}...`);

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received. Durgesh will respond within 24 hours.',
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body or JSON parsing failure.' },
      { status: 400 }
    );
  }
}
