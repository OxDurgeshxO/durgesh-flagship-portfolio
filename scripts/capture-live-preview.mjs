import { chromium } from '@playwright/test';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ARTIFACT_DIR = process.env.ARTIFACT_DIR || join(ROOT, 'out');

async function main() {
  console.log('Launching Chromium for live preview verification...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  // 1. Verify Vector Embedding Lab
  console.log('Navigating to http://localhost:3000/lab ...');
  await page.goto('http://localhost:3000/lab', { waitUntil: 'networkidle' });
  // Click the Vector Embeddings tab
  const vectorTab = page.locator('button:has-text("Vector Embeddings")');
  await vectorTab.click();
  await page.waitForTimeout(500);
  const labPath = join(ARTIFACT_DIR, 'live_preview_vector_lab.png');
  await page.screenshot({ path: labPath, fullPage: false });
  console.log('Saved Vector Lab screenshot:', labPath);

  // 2. Verify Resume Role Lens
  console.log('Navigating to http://localhost:3000/resume ...');
  await page.goto('http://localhost:3000/resume', { waitUntil: 'networkidle' });
  // Click AI/ML role lens
  const aimlLens = page.locator('button:has-text("AI / ML Engineer")');
  await aimlLens.click();
  await page.waitForTimeout(500);
  const resumePath = join(ARTIFACT_DIR, 'live_preview_resume_lens.png');
  await page.screenshot({ path: resumePath, fullPage: false });
  console.log('Saved Resume Role Lens screenshot:', resumePath);

  // 3. Verify Case Study Architecture Zoom
  console.log('Navigating to http://localhost:3000/work/roleradar ...');
  await page.goto('http://localhost:3000/work/roleradar', { waitUntil: 'networkidle' });
  // Scroll to Architecture Diagram
  const archSection = page.locator('text=Architecture & Data Flow');
  await archSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  // Click Zoom In button
  const zoomIn = page.locator('button[aria-label="Zoom In Architecture Diagram"]');
  if (await zoomIn.isVisible()) {
    await zoomIn.click();
    await page.waitForTimeout(300);
  }
  const archPath = join(ARTIFACT_DIR, 'live_preview_architecture_zoom.png');
  await page.screenshot({ path: archPath, fullPage: false });
  console.log('Saved Architecture Zoom screenshot:', archPath);

  // 4. Verify FitTrack Camera & Pose Canvas
  console.log('Navigating to FitTrack in http://localhost:3000/lab ...');
  await page.goto('http://localhost:3000/lab', { waitUntil: 'networkidle' });
  const fitTab = page.locator('button:has-text("FitTrack Kinematics")');
  await fitTab.click();
  await page.waitForTimeout(600);
  const fitPath = join(ARTIFACT_DIR, 'live_preview_fittrack.png');
  await page.screenshot({ path: fitPath, fullPage: false });
  console.log('Saved FitTrack screenshot:', fitPath);

  // 5. Verify Home Page
  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const homePath = join(ARTIFACT_DIR, 'live_preview_home.png');
  await page.screenshot({ path: homePath, fullPage: false });
  console.log('Saved Home screenshot:', homePath);

  await browser.close();
  console.log('Live preview verification complete.');
}

main().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
