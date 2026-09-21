import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();

function readSource(relativePath) {
  const fullPath = path.join(ROOT_DIR, relativePath);
  assert.ok(fs.existsSync(fullPath), `${relativePath} must exist`);
  return fs.readFileSync(fullPath, 'utf8');
}

test('Security Guardrails & Input Validation Specification', async (t) => {
  // The production /api/* handlers are the Cloudflare Pages Functions, not the
  // Next.js API routes. The Next.js app is a static export (output: 'export'), so
  // app/api/** was never served. These assertions deliberately target functions/**
  // — the earlier revision asserted against app/api/contact/route.ts and therefore
  // reported green while the deployed endpoint had no rate limiting at all.
  await t.test('Production contact handler (functions/api/contact.ts) enforces rate limiting, honeypot and validation', () => {
    const content = readSource('functions/api/contact.ts');

    assert.ok(content.includes("lib/api/guards"), 'Contact function must import the shared guards module');
    assert.ok(content.includes('checkRateLimit'), 'Contact function must enforce checkRateLimit');
    assert.ok(content.includes('getClientIp'), 'Contact function must derive the client IP from a trusted header');
    assert.ok(content.includes('_gotcha'), 'Contact function must check honeypot _gotcha field');
    assert.ok(content.includes('EMAIL_REGEX'), 'Contact function must enforce email regex validation');
    assert.ok(content.includes('429'), 'Contact function must return 429 on rate limit exceeded');
    assert.ok(content.includes('400'), 'Contact function must return 400 on malformed input');
  });

  await t.test('Contact handler escapes all interpolated values before building the email body', () => {
    const content = readSource('functions/api/contact.ts');

    assert.ok(content.includes('escapeHtml'), 'Contact function must escape user input before HTML interpolation');
    for (const field of ['safeName', 'safeEmail', 'safeSubject', 'safeMessage']) {
      assert.ok(content.includes(field), `Contact function must use escaped ${field} in the email template`);
    }
    // Resend validates reply_to, so the raw address must be sent there — never escaped entities.
    assert.ok(content.includes('reply_to: cleanEmail'), 'reply_to must carry the raw address, not escaped text');
  });

  await t.test('Functions never echo internal error details to the caller', () => {
    for (const file of [
      'functions/api/contact.ts',
      'functions/api/lab/resume.ts',
      'functions/api/lab/marketmatch.ts',
    ]) {
      const content = readSource(file);
      assert.ok(
        !/error:\s*err\?\.message/.test(content),
        `${file} must not return err?.message to unauthenticated callers`,
      );
    }
  });

  await t.test('AI Lab endpoints apply the shared validators (length caps, allowed algorithms)', () => {
    const resume = readSource('functions/api/lab/resume.ts');
    assert.ok(resume.includes('validateResumeInput'), 'resume function must use validateResumeInput (enforces the 15,000 char cap)');
    assert.ok(resume.includes('checkRateLimit'), 'resume function must enforce checkRateLimit');

    const marketmatch = readSource('functions/api/lab/marketmatch.ts');
    assert.ok(marketmatch.includes('validateMarketMatchParams'), 'marketmatch function must validate algorithm and cluster count');
    assert.ok(marketmatch.includes('checkRateLimit'), 'marketmatch function must enforce checkRateLimit');
  });

  await t.test('Rate limiting is not implemented with a per-isolate in-memory Map', () => {
    const validation = readSource('lib/lab/validation.ts');
    assert.ok(
      !validation.includes('ipRequestHistory'),
      'lib/lab/validation.ts must not contain the removed in-memory limiter — isolates are ephemeral and scaled, so it cannot limit anything',
    );

    const guards = readSource('lib/api/guards.ts');
    assert.ok(guards.includes('RATE_LIMIT'), 'guards.ts must read the RATE_LIMIT KV binding');
    assert.ok(guards.includes('cf-connecting-ip'), 'guards.ts must key on the Cloudflare-set client IP header');
  });

  await t.test('Unreachable Next.js API routes stay deleted', () => {
    assert.ok(
      !fs.existsSync(path.join(ROOT_DIR, 'app', 'api')),
      'app/api must not exist — those routes cannot run under output: export and duplicate the Cloudflare Functions',
    );
  });

  await t.test('No secrets or private API keys leaked in client-side code', () => {
    const componentsDir = path.join(ROOT_DIR, 'components');
    const appDir = path.join(ROOT_DIR, 'app');
    const files = [...fs.readdirSync(componentsDir, { recursive: true }), ...fs.readdirSync(appDir, { recursive: true })]
      .filter((f) => typeof f === 'string' && (f.endsWith('.tsx') || f.endsWith('.ts')))
      .filter((f) => !f.startsWith('api' + path.sep) && !f.includes(path.sep + 'api' + path.sep))
      .map((f) => (fs.existsSync(path.join(componentsDir, f)) ? path.join(componentsDir, f) : path.join(appDir, f)));

    for (const filePath of files) {
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) continue;
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(!content.includes('RESEND_API_KEY'), `${filePath} must never reference RESEND_API_KEY`);
      assert.ok(!content.includes('AWS_SECRET_ACCESS_KEY'), `${filePath} must never reference AWS secret keys`);
    }
  });
});
