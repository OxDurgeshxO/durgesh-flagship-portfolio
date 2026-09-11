import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();

test('Security Guardrails & Input Validation Specification', async (t) => {
  await t.test('Contact API route implements rate-limiting and honeypot defenses', () => {
    const contactRoutePath = path.join(ROOT_DIR, 'app/api/contact/route.ts');
    assert.ok(fs.existsSync(contactRoutePath), 'app/api/contact/route.ts must exist');
    const content = fs.readFileSync(contactRoutePath, 'utf8');

    assert.ok(content.includes('checkRateLimit'), 'Contact route must enforce checkRateLimit');
    assert.ok(content.includes('_gotcha'), 'Contact route must check honeypot _gotcha field');
    assert.ok(content.includes('EMAIL_REGEX'), 'Contact route must enforce email regex validation');
    assert.ok(content.includes('429'), 'Contact route must return 429 on rate limit exceeded');
    assert.ok(content.includes('400'), 'Contact route must return 400 on malformed input');
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
