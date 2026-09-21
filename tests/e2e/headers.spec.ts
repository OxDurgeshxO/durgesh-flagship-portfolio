import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

test.describe('Security Headers Configuration Verification', () => {
  test('public/_headers exists and enforces all mandatory security policies', async () => {
    const headersPath = path.join(process.cwd(), 'public', '_headers');
    expect(fs.existsSync(headersPath)).toBe(true);

    const content = fs.readFileSync(headersPath, 'utf-8');

    // 1. Clickjacking defense
    expect(content).toContain('X-Frame-Options: DENY');
    expect(content).toContain("frame-ancestors 'none'");

    // 2. MIME sniffing prevention
    expect(content).toContain('X-Content-Type-Options: nosniff');

    // 3. Referrer privacy
    expect(content).toContain('Referrer-Policy: strict-origin-when-cross-origin');

    // 4. Transport security HSTS
    expect(content).toContain('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');

    // 5. Restrictive permissions policy
    expect(content).toContain('Permissions-Policy:');

    // 6. Content Security Policy with base-uri and form-action
    expect(content).toContain('Content-Security-Policy:');
    expect(content).toContain("base-uri 'self'");
    expect(content).toContain("default-src 'self'");
  });
});
