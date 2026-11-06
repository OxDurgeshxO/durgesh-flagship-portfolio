import { chromium } from '@playwright/test';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

async function main() {
  console.log('Generating updated 1-page resume PDF from http://localhost:3000/resume ...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/resume', { waitUntil: 'networkidle' });

  // Emulate print media
  await page.emulateMedia({ media: 'print' });

  const targetPdf = join(ROOT, 'public', 'resume.pdf');
  await page.pdf({
    path: targetPdf,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '8mm',
      bottom: '8mm',
      left: '10mm',
      right: '10mm',
    },
  });

  const stats = fs.statSync(targetPdf);
  console.log(`Successfully generated public/resume.pdf (${(stats.size / 1024).toFixed(1)} KB)`);

  // Also mirror to out/resume.pdf
  const outPdf = join(ROOT, 'out', 'resume.pdf');
  fs.copyFileSync(targetPdf, outPdf);
  console.log('Mirrored to out/resume.pdf');

  // Also take a screenshot for visual artifact verification
  await page.emulateMedia({ media: 'screen' });
  const artifactDir = process.env.ARTIFACT_DIR || join(ROOT, 'out');
  const screenshotPath = join(artifactDir, 'live_preview_elevated_resume.png');
  const resumeContainer = page.locator('article[aria-label="Official Resume of Durgesh Dutt Sinha"]');
  if (await resumeContainer.isVisible()) {
    await resumeContainer.screenshot({ path: screenshotPath });
    console.log('Saved visual screenshot:', screenshotPath);
  }

  await browser.close();
}

main().catch((err) => {
  console.error('PDF generation error:', err);
  process.exit(1);
});
