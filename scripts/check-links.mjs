import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.join(process.cwd(), 'out');

function getHtmlFiles(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      getHtmlFiles(full, list);
    } else if (entry.endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

const htmlFiles = getHtmlFiles(OUT_DIR);
console.log(`Scanning ${htmlFiles.length} HTML pages for external URLs...`);

const urlRegex = /href=["'](https?:\/\/[^"']+)["']/g;
const urls = new Set();

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = urlRegex.exec(content)) !== null) {
    const url = match[1];
    // Skip localhost and schema URLs
    if (!url.includes('localhost') && !url.includes('schema.org') && !url.includes('w3.org')) {
      urls.add(url);
    }
  }
}

console.log(`Found ${urls.size} unique external links.`);
console.log('Validating external link formats...');

// Check URLs for malformed or placeholder links
const invalid = [];
for (const url of urls) {
  try {
    const parsed = new URL(url);
    if (!parsed.protocol.startsWith('http')) {
      invalid.push(url);
    }
  } catch {
    invalid.push(url);
  }
}

if (invalid.length > 0) {
  console.error('Invalid URLs found:', invalid);
  process.exit(1);
} else {
  console.log('All external links verified structurally valid.');
  process.exit(0);
}
