import fs from 'node:fs';
import path from 'node:path';

/**
 * Link integrity checker for the exported static site.
 *
 * This script previously validated only that *external* URLs parsed as URLs, while the README,
 * CHANGELOG and docs/testing.md all described it as crawling every page "to verify zero broken
 * internal links". It could not detect a single broken internal link, which is the case it was
 * documented to catch.
 *
 * It now performs three real checks against `out/`:
 *   1. External links must parse and use the http(s) protocol.
 *   2. Internal links must resolve to an HTML page or a file that was actually emitted.
 *   3. Same-page and cross-page anchors must resolve to an id that exists in the target page.
 */

const OUT_DIR = path.join(process.cwd(), 'out');

function getFiles(dir, predicate, list = []) {
  if (!fs.existsSync(dir)) return list;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      getFiles(full, predicate, list);
    } else if (predicate(entry)) {
      list.push(full);
    }
  }
  return list;
}

const htmlFiles = getFiles(OUT_DIR, (entry) => entry.endsWith('.html'));

if (htmlFiles.length === 0) {
  console.error('No HTML files found in out/. Run `npm run build` before checking links.');
  process.exit(1);
}

/** Every non-HTML file emitted by the build, as a site-absolute path (e.g. /resume.pdf). */
const emittedAssets = new Set(
  getFiles(OUT_DIR, () => true)
    .filter((file) => !file.endsWith('.html'))
    .map((file) => '/' + path.relative(OUT_DIR, file).split(path.sep).join('/')),
);

/** Map each exported HTML file to the URL path that serves it. */
function routeForFile(file) {
  const rel = path.relative(OUT_DIR, file).split(path.sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel === '404.html') return '/404.html';
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'/index.html'.length);
  return '/' + rel.replace(/\.html$/, '');
}

const pages = new Map(); // urlPath -> { file, content, ids: Set }
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  pages.set(routeForFile(file), { file, content, ids: collectIds(content) });
}

function collectIds(html) {
  const ids = new Set();
  const idRegex = /\sid=["']([^"']+)["']/g;
  let match;
  while ((match = idRegex.exec(html)) !== null) {
    ids.add(match[1]);
  }
  // <a name="..."> is a legacy anchor target that still resolves in browsers.
  const nameRegex = /<a\s[^>]*name=["']([^"']+)["']/gi;
  while ((match = nameRegex.exec(html)) !== null) {
    ids.add(match[1]);
  }
  return ids;
}

const hrefRegex = /href=["']([^"']+)["']/g;
const brokenInternal = [];
const brokenAnchors = [];
const invalidExternal = [];
const externalUrls = new Set();
let internalLinkCount = 0;

for (const [pagePath, page] of pages) {
  let match;
  hrefRegex.lastIndex = 0;
  while ((match = hrefRegex.exec(page.content)) !== null) {
    const href = match[1].trim();

    if (
      href === '' ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('data:') ||
      href.startsWith('javascript:')
    ) {
      continue;
    }

    if (/^https?:\/\//i.test(href)) {
      externalUrls.add(href);
      try {
        const parsed = new URL(href);
        if (!parsed.protocol.startsWith('http')) invalidExternal.push({ pagePath, href });
      } catch {
        invalidExternal.push({ pagePath, href });
      }
      continue;
    }

    // Anything else is an internal reference.
    internalLinkCount += 1;

    if (href.startsWith('//')) {
      invalidExternal.push({ pagePath, href });
      continue;
    }

    const [rawPath, rawHash = ''] = href.split('#');
    const targetPath = rawPath.split('?')[0];

    let resolvedPath;
    if (targetPath === '') {
      resolvedPath = pagePath; // pure same-page anchor
    } else if (targetPath.startsWith('/')) {
      resolvedPath = targetPath.replace(/\/+$/, '') || '/';
    } else {
      // Relative link — resolve against the directory of the current page.
      const baseDir = pagePath.slice(0, pagePath.lastIndexOf('/') + 1);
      resolvedPath = path.posix.normalize(baseDir + targetPath).replace(/\/+$/, '') || '/';
    }

    const targetPage = pages.get(resolvedPath) ?? pages.get(resolvedPath + '/');
    const isAsset =
      emittedAssets.has(targetPath) ||
      emittedAssets.has(targetPath + '/') ||
      emittedAssets.has(resolvedPath);

    if (!targetPage && !isAsset) {
      brokenInternal.push({ pagePath, href, resolvedPath });
      continue;
    }

    // Anchor validation: only meaningful when we resolved an HTML page.
    if (rawHash && targetPage && !targetPage.ids.has(rawHash)) {
      brokenAnchors.push({ pagePath, href, resolvedPath, anchor: rawHash });
    }
  }
}

console.log(`Scanned ${pages.size} exported HTML pages.`);
console.log(`Checked ${internalLinkCount} internal links and ${externalUrls.size} unique external links.`);

let failed = false;

if (invalidExternal.length > 0) {
  console.error('\nMalformed external links:');
  for (const { pagePath, href } of invalidExternal) console.error(`  ${pagePath} -> ${href}`);
  failed = true;
}

if (brokenInternal.length > 0) {
  console.error('\nBroken internal links:');
  for (const { pagePath, href, resolvedPath } of brokenInternal) {
    console.error(`  ${pagePath} -> ${href} (resolved: ${resolvedPath})`);
  }
  failed = true;
}

if (brokenAnchors.length > 0) {
  console.error('\nAnchors with no matching id:');
  for (const { pagePath, href, anchor } of brokenAnchors) {
    console.error(`  ${pagePath} -> ${href} (missing #${anchor})`);
  }
  failed = true;
}

if (failed) {
  console.error('\nLink integrity check FAILED.');
  process.exit(1);
}

console.log('All external links are structurally valid; all internal links and anchors resolve.');
process.exit(0);
