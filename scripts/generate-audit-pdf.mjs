/**
 * generate-audit-pdf.mjs
 * Pre-renders AUDIT_AND_HARDENING_REPORT.md → styled HTML → PDF via Playwright.
 * All markdown-to-HTML conversion happens in Node.js (no client-side JS needed).
 */

import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const md = readFileSync(join(ROOT, 'docs', 'AUDIT_AND_HARDENING_REPORT.md'), 'utf8');

/* ─── Markdown → HTML (Node-side) ─── */
function mdToHtml(src) {
  let out = src;

  // Escape HTML entities first (safe baseline)
  const escape = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  // --- Fenced code blocks (``` ... ```) ---
  out = out.replace(/```[\w]*\n([\s\S]*?)```/g, (_, code) =>
    `<pre><code>${escape(code.trimEnd())}</code></pre>`
  );

  // --- Tables ---
  out = out.replace(/((?:\|.+\|\n)+)/g, (block) => {
    const lines = block.trim().split('\n').filter(l => l.trim());
    if (lines.length < 2) return block;
    const isAlignRow = l => /^\|[\s\-:| ]+\|$/.test(l);
    const headerLine = lines[0];
    const bodyLines = lines.slice(2); // skip separator
    const cells = line => line.split('|').slice(1,-1).map(c => c.trim());
    const ths = cells(headerLine).map(c => `<th>${c}</th>`).join('');
    const trs = bodyLines.map(l =>
      `<tr>${cells(l).map(c => `<td>${c}</td>`).join('')}</tr>`
    ).join('\n');
    return `<table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>\n`;
  });

  // --- Headings ---
  out = out.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  out = out.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  out = out.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  out = out.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // --- HR ---
  out = out.replace(/^---$/gm, '<hr/>');

  // --- Bold + Italic ---
  out = out.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // --- Inline code (must come before italic to avoid collisions) ---
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');

  // --- Italic ---
  out = out.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // --- Unordered lists ---
  out = out.replace(/((?:^[ ]*[-*] .+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n').map(l =>
      `<li>${l.replace(/^[ ]*[-*] /, '').trim()}</li>`
    ).join('');
    return `<ul>${items}</ul>\n`;
  });

  // --- Ordered lists ---
  out = out.replace(/((?:^\d+\. .+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n').map(l =>
      `<li>${l.replace(/^\d+\. /, '').trim()}</li>`
    ).join('');
    return `<ol>${items}</ol>\n`;
  });

  // --- Paragraphs: wrap plain text lines ---
  out = out.replace(/^(?!<[a-zA-Z\/])(.+)$/gm, line => {
    if (!line.trim()) return '';
    return `<p>${line}</p>`;
  });

  return out;
}

const bodyHtml = mdToHtml(md);

/* ─── Full HTML Document ─── */
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>V10 Flagship Portfolio — Audit &amp; Hardening Report</title>
<style>
  @page {
    size: A4;
    margin: 18mm 20mm 20mm;
  }
  @page :first { margin: 0; }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10pt;
    line-height: 1.6;
    color: #0f172a;
    background: #fff;
  }

  /* ── COVER ── */
  .cover {
    background: linear-gradient(145deg, #0f172a 0%, #1e293b 60%, #0c1a2e 100%);
    color: #fff;
    width: 210mm;
    min-height: 297mm;
    padding: 56px 64px;
    page-break-after: always;
    display: block;
  }
  .cover-badge {
    display: inline-block;
    border: 1px solid #22d3ee;
    color: #67e8f9;
    font-size: 8pt;
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 4px;
    margin-bottom: 32px;
  }
  .cover h1 {
    font-size: 30pt;
    font-weight: 900;
    line-height: 1.1;
    color: #fff;
    margin-bottom: 12px;
  }
  .cover-sub {
    font-size: 13pt;
    color: #94a3b8;
    margin-bottom: 40px;
  }
  .meta-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 40px;
  }
  .meta-item label {
    display: block;
    font-size: 7pt;
    font-weight: bold;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #475569;
    margin-bottom: 3px;
  }
  .meta-item span { font-size: 9.5pt; color: #cbd5e1; }

  .verdict-box {
    border: 1px solid #16a34a;
    background: rgba(22,163,74,0.08);
    border-radius: 8px;
    padding: 18px 22px;
    margin-bottom: 32px;
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }
  .verdict-dot {
    width: 10px; height: 10px; min-width: 10px;
    background: #22c55e;
    border-radius: 50%;
    margin-top: 4px;
  }
  .verdict-box strong { color: #4ade80; font-size: 11pt; display: block; margin-bottom: 4px; }
  .verdict-box span { color: #86efac; font-size: 9pt; }

  .score-row {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 12px;
  }
  .score-card {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 16px 10px;
    text-align: center;
  }
  .score-card .num { font-size: 26pt; font-weight: 900; color: #22d3ee; display: block; }
  .score-card .lbl { font-size: 7pt; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }

  /* ── BODY ── */
  .body { padding-top: 4px; }

  h1 {
    font-size: 18pt;
    color: #0f172a;
    border-bottom: 2.5px solid #06b6d4;
    padding-bottom: 8px;
    margin: 24px 0 14px;
  }
  h2 {
    font-size: 13pt;
    color: #0f172a;
    border-left: 4px solid #06b6d4;
    padding-left: 10px;
    margin: 22px 0 10px;
    page-break-after: avoid;
  }
  h3 {
    font-size: 11pt;
    color: #1e293b;
    margin: 16px 0 7px;
    page-break-after: avoid;
  }
  h4 {
    font-size: 10pt;
    color: #334155;
    margin: 12px 0 5px;
    page-break-after: avoid;
  }

  p { margin: 0 0 9px; }

  ul, ol { margin: 0 0 9px 22px; }
  li { margin-bottom: 3px; }

  code {
    font-family: Consolas, 'Courier New', monospace;
    font-size: 8pt;
    background: #f1f5f9;
    color: #0891b2;
    padding: 1px 4px;
    border-radius: 3px;
  }

  pre {
    background: #0f172a;
    color: #e2e8f0;
    border-radius: 6px;
    padding: 14px 18px;
    margin: 10px 0;
    overflow: hidden;
    page-break-inside: avoid;
  }
  pre code {
    background: none;
    color: #e2e8f0;
    padding: 0;
    font-size: 8pt;
    line-height: 1.55;
    white-space: pre-wrap;
    word-break: break-all;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
    font-size: 8.5pt;
    page-break-inside: avoid;
  }
  thead tr { background: #0f172a; }
  thead th {
    color: #e2e8f0;
    padding: 7px 9px;
    text-align: left;
    font-size: 8pt;
    font-weight: bold;
  }
  tbody tr { border-bottom: 1px solid #e2e8f0; }
  tbody tr:nth-child(even) { background: #f8fafc; }
  tbody td { padding: 6px 9px; vertical-align: top; word-break: break-word; }

  strong { font-weight: 700; }
  em { font-style: italic; color: #475569; }

  hr { border: none; border-top: 1px solid #e2e8f0; margin: 20px 0; }

  .page-break { page-break-before: always; }
</style>
</head>
<body>

<!-- COVER PAGE -->
<div class="cover">
  <div class="cover-badge">&#128272; Confidential Engineering Report</div>
  <h1>V10 Flagship Portfolio<br/>Audit &amp; Hardening<br/>Report</h1>
  <div class="cover-sub">Durgesh Dutt Sinha &mdash; AI/ML Engineering Portfolio</div>

  <div class="meta-grid">
    <div class="meta-item"><label>Report Date</label><span>November 6, 2026</span></div>
    <div class="meta-item"><label>Branch / Commit</label><span>V10 &mdash; 08a6795</span></div>
    <div class="meta-item"><label>Framework</label><span>Next.js 14.2 App Router + Cloudflare Pages</span></div>
    <div class="meta-item"><label>Audit Scope</label><span>Functionality &middot; Architecture &middot; Performance &middot; Security &middot; A11y &middot; Reliability</span></div>
    <div class="meta-item"><label>Milestones</label><span>M1 &rarr; M5 (5 milestones, 23 improvements)</span></div>
    <div class="meta-item"><label>Live Preview</label><span>http://localhost:3000</span></div>
  </div>

  <div class="verdict-box">
    <div class="verdict-dot"></div>
    <div>
      <strong>&#9989; PRODUCTION READY &mdash; ALL GATES PASSED</strong>
      <span>91/91 unit tests &nbsp;&bull;&nbsp; 0 TypeScript errors &nbsp;&bull;&nbsp; 22/22 a11y tests &nbsp;&bull;&nbsp; 309 internal links clean &nbsp;&bull;&nbsp; 23 static pages exported</span>
    </div>
  </div>

  <div class="score-row">
    <div class="score-card"><span class="num">91</span><span class="lbl">Tests Passing</span></div>
    <div class="score-card"><span class="num">22</span><span class="lbl">A11y Tests</span></div>
    <div class="score-card"><span class="num">23</span><span class="lbl">Static Pages</span></div>
    <div class="score-card"><span class="num">23</span><span class="lbl">Improvements</span></div>
  </div>
</div>

<!-- REPORT BODY (pre-rendered from Markdown) -->
<div class="body">
${bodyHtml}
</div>

</body>
</html>`;

/* ─── Write temp HTML & print to PDF ─── */
const tmpHtml = join(ROOT, 'out', '_audit_tmp.html');
writeFileSync(tmpHtml, html, 'utf8');

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 794, height: 1123 });
await page.goto('file:///' + tmpHtml.replace(/\\/g, '/'), { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(500);

const pdfOut = join(ROOT, 'out', 'V10_Audit_Hardening_Report.pdf');
await page.pdf({
  path: pdfOut,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: `<div style="width:100%;font-family:Arial,sans-serif;font-size:7pt;color:#94a3b8;padding:4px 20mm;display:flex;justify-content:space-between;border-bottom:1px solid #e2e8f0;box-sizing:border-box;">
    <span>V10 Flagship Portfolio — Audit &amp; Hardening Report</span><span>November 6, 2026</span></div>`,
  footerTemplate: `<div style="width:100%;font-family:Arial,sans-serif;font-size:7pt;color:#94a3b8;padding:4px 20mm;display:flex;justify-content:space-between;border-top:1px solid #e2e8f0;box-sizing:border-box;">
    <span>Confidential — durgesh-flagship-portfolio / V10</span>
    <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`,
  margin: { top: '14mm', bottom: '14mm', left: '0', right: '0' },
});

await browser.close();
try { unlinkSync(tmpHtml); } catch {}

const size = readFileSync(pdfOut).length;
console.log(`PDF saved: ${pdfOut}`);
console.log(`Size: ${(size/1024).toFixed(1)} KB`);
