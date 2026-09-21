import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();

test('Required Public Assets Verification', async (t) => {
  await t.test('Resume PDF is a structurally valid, resume-length PDF', () => {
    const resumePath = path.join(ROOT_DIR, 'public/resume.pdf');
    assert.ok(fs.existsSync(resumePath), 'public/resume.pdf must exist');

    const buf = fs.readFileSync(resumePath);
    const raw = buf.toString('latin1');

    assert.strictEqual(
      buf.subarray(0, 5).toString('latin1'),
      '%PDF-',
      'resume.pdf must begin with the %PDF- magic bytes',
    );
    assert.ok(raw.includes('%%EOF'), 'resume.pdf must carry a %%EOF trailer (not truncated)');

    // Page count is the assertion that actually protects this file.
    // A resume is 1-3 pages. This check would have caught the document that shipped
    // here previously: a 12-page "Portfolio Improvement Plan" committed as resume.pdf.
    const pageCount = (raw.match(/\/Type\s*\/Page[^s]/g) || []).length;
    assert.ok(pageCount >= 1, `resume.pdf must contain at least one page, found ${pageCount}`);
    assert.ok(
      pageCount <= 6,
      `resume.pdf looks like a report rather than a resume: ${pageCount} pages found. ` +
        'If the resume legitimately grew, raise this ceiling deliberately.',
    );

    // Size is a truncation floor only. The previous rule required > 500 KB, which is
    // exactly why a 534 KB WRONG document passed CI. Never reintroduce a size threshold
    // as a proxy for authenticity — it cannot distinguish a resume from anything else.
    assert.ok(buf.length > 20000, `resume.pdf looks truncated (${buf.length} bytes)`);
  });

  await t.test('Branding icon SVG is valid', () => {
    const iconPath = path.join(ROOT_DIR, 'public/icon.svg');
    assert.ok(fs.existsSync(iconPath), 'public/icon.svg must exist');
    const content = fs.readFileSync(iconPath, 'utf8');
    assert.ok(content.includes('<svg'), 'icon.svg must contain valid SVG root');
  });

  await t.test('OpenGraph social sharing image exists', () => {
    const ogPath = path.join(ROOT_DIR, 'public/og-image.png');
    assert.ok(fs.existsSync(ogPath), 'public/og-image.png must exist');
    const stats = fs.statSync(ogPath);
    assert.ok(stats.size > 1000, 'og-image.png must not be empty');
  });
});
