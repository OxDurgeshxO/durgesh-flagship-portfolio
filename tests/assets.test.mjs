import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();

test('Required Public Assets Verification', async (t) => {
  await t.test('Resume PDF is verified authentic document (> 500 KB)', () => {
    const resumePath = path.join(ROOT_DIR, 'public/resume.pdf');
    assert.ok(fs.existsSync(resumePath), 'public/resume.pdf must exist');
    const stats = fs.statSync(resumePath);
    assert.ok(stats.size > 500000, `Expected authentic resume PDF > 500 KB, got ${stats.size} bytes`);
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
