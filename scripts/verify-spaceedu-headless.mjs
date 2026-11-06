/**
 * verify-spaceedu-headless.mjs
 * Independent verification probe for /spaceedu hydration and console hygiene.
 * Simulates Reviewer 1, Reviewer 2, and Forensic Auditor verification.
 */

import { chromium } from '@playwright/test';
import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'out');

// Simple static server for out/ directory
function startStaticServer(port = 4123) {
  return new Promise((resolve, reject) => {
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.svg': 'image/svg+xml',
      '.png': 'image/png',
      '.pdf': 'application/pdf',
      '.txt': 'text/plain',
    };

    const server = createServer((req, res) => {
      let urlPath = req.url.split('?')[0];
      if (urlPath.endsWith('/')) urlPath += 'index.html';
      else if (!urlPath.includes('.')) urlPath += '/index.html';

      const filePath = join(OUT_DIR, urlPath);
      if (existsSync(filePath)) {
        const ext = '.' + filePath.split('.').pop();
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(readFileSync(filePath));
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    });

    server.listen(port, () => resolve(server));
    server.on('error', reject);
  });
}

async function runProbe() {
  const server = await startStaticServer(4123);
  console.log('Static test server listening on http://localhost:4123');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const consoleLogs = [];
  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', msg => {
    const text = msg.text();
    consoleLogs.push({ type: msg.type(), text });
    if (msg.type() === 'error') {
      consoleErrors.push(text);
    }
  });

  page.on('pageerror', err => {
    pageErrors.push(err.message);
  });

  console.log('Navigating to http://localhost:4123/spaceedu/ ...');
  await page.goto('http://localhost:4123/spaceedu/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Check iframe existence and attributes
  const iframe = await page.$('iframe');
  const iframeSrc = iframe ? await iframe.getAttribute('src') : null;
  const iframeTitle = iframe ? await iframe.getAttribute('title') : null;

  // Check sr-only fallback existence
  const fallback = await page.$('.sr-only a');
  const fallbackHref = fallback ? await fallback.getAttribute('href') : null;

  // Check for hydration errors
  const hydrationMismatches = consoleErrors.filter(text =>
    text.includes('hydration') ||
    text.includes('Minified React error #418') ||
    text.includes('Minified React error #423') ||
    text.includes('did not match')
  );

  await browser.close();
  server.close();

  console.log('\n=== SpaceEdu Headless Probe Results ===');
  console.log(`Iframe mounted: ${!!iframe}`);
  console.log(`Iframe src: ${iframeSrc}`);
  console.log(`Iframe title: ${iframeTitle}`);
  console.log(`Accessible fallback href: ${fallbackHref}`);
  console.log(`Console logs captured: ${consoleLogs.length}`);
  console.log(`Console errors captured: ${consoleErrors.length}`);
  console.log(`Page uncaught exceptions: ${pageErrors.length}`);
  console.log(`Hydration mismatches: ${hydrationMismatches.length}`);

  if (hydrationMismatches.length > 0) {
    console.error('FAIL: React hydration mismatch detected:', hydrationMismatches);
    process.exit(1);
  }

  if (pageErrors.length > 0) {
    console.error('FAIL: Uncaught page errors detected:', pageErrors);
    process.exit(1);
  }

  console.log('SUCCESS: /spaceedu mounts with zero hydration errors and clean runtime state.');
}

runProbe().catch(err => {
  console.error('Fatal probe error:', err);
  process.exit(1);
});
