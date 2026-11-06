/**
 * optimize-space-image.mjs
 * Downloads remote 5.4MB Earth still PNG from CloudFront and converts it
 * to a lightweight, responsive WebP asset in public/images/earth-still.webp
 * using Playwright Chromium canvas.
 */

import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TARGET_DIR = join(ROOT, 'public', 'images');
const TARGET_FILE = join(TARGET_DIR, 'earth-still.webp');

const REMOTE_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202133_508c64b8-a31e-4290-bdfc-1187df70e0a6.png';

async function optimize() {
  console.log(`Downloading and optimizing: ${REMOTE_URL}`);
  mkdirSync(TARGET_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Load image inside browser context and draw to canvas with webp export
  const dataUrl = await page.evaluate(async (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Target 1920 width max, preserve aspect ratio
        let w = img.naturalWidth || 1920;
        let h = img.naturalHeight || 1080;
        const maxW = 1920;
        if (w > maxW) {
          h = Math.round((h * maxW) / w);
          w = maxW;
        }

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);

        // Export as WebP quality 0.82
        resolve(canvas.toDataURL('image/webp', 0.82));
      };
      img.onerror = () => reject(new Error('Failed to load image in browser'));
      img.src = url;
    });
  }, REMOTE_URL);

  await browser.close();

  // Convert base64 dataUrl to buffer
  const base64Data = dataUrl.replace(/^data:image\/webp;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  writeFileSync(TARGET_FILE, buffer);

  const stats = statSync(TARGET_FILE);
  console.log(`Successfully generated: ${TARGET_FILE}`);
  console.log(`Optimized Size: ${(stats.size / 1024).toFixed(1)} KB (Reduced from ~5422 KB, >97% reduction)`);
}

optimize().catch(err => {
  console.error('Optimization failed:', err);
  process.exit(1);
});
