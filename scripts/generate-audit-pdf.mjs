/**
 * generate-audit-pdf.mjs
 * Converts docs/AUDIT_AND_HARDENING_REPORT.md → out/audit-report.pdf
 * Uses Playwright Chromium headless print-to-PDF.
 */

import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const md = readFileSync(join(ROOT, 'docs', 'AUDIT_AND_HARDENING_REPORT.md'), 'utf8');

// Convert markdown to styled HTML for PDF rendering
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>V10 Flagship Portfolio — Audit &amp; Hardening Report</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --accent: #06b6d4;
    --accent-dark: #0891b2;
    --bg: #ffffff;
    --surface: #f8fafc;
    --border: #e2e8f0;
    --text: #0f172a;
    --muted: #64748b;
    --pass: #16a34a;
    --warn: #d97706;
    --fail: #dc2626;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 10pt;
    line-height: 1.65;
    color: var(--text);
    background: var(--bg);
    padding: 0;
  }

  /* Cover page */
  .cover {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c1a2e 100%);
    color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 72px;
    page-break-after: always;
  }
  .cover-badge {
    display: inline-block;
    background: rgba(6,182,212,0.15);
    border: 1px solid rgba(6,182,212,0.4);
    color: #67e8f9;
    font-size: 8pt;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 4px;
    margin-bottom: 32px;
  }
  .cover h1 {
    font-size: 32pt;
    font-weight: 700;
    line-height: 1.15;
    color: white;
    margin-bottom: 16px;
  }
  .cover-subtitle {
    font-size: 14pt;
    color: #94a3b8;
    margin-bottom: 48px;
  }
  .cover-meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 48px;
  }
  .cover-meta-item label {
    display: block;
    font-size: 7.5pt;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 4px;
  }
  .cover-meta-item span {
    font-size: 10pt;
    color: #cbd5e1;
  }
  .cover-verdict {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(22,163,74,0.1);
    border: 1px solid rgba(22,163,74,0.3);
    border-radius: 8px;
    padding: 20px 24px;
  }
  .cover-verdict .dot {
    width: 10px; height: 10px;
    background: #22c55e;
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: 0 0 10px #22c55e;
  }
  .cover-verdict strong {
    color: #4ade80;
    font-size: 11pt;
  }
  .cover-verdict p { color: #86efac; font-size: 9pt; }

  /* Score grid on cover */
  .score-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-top: 32px;
  }
  .score-card {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 14px;
    text-align: center;
  }
  .score-card .num {
    font-size: 20pt;
    font-weight: 700;
    color: #67e8f9;
    display: block;
  }
  .score-card .lbl {
    font-size: 7.5pt;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  /* Content area */
  .content {
    padding: 48px 72px;
    max-width: 100%;
  }

  h1, h2, h3, h4 { font-weight: 700; line-height: 1.3; }

  h1 {
    font-size: 20pt;
    color: var(--text);
    margin-bottom: 24px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--accent);
  }
  h2 {
    font-size: 14pt;
    color: var(--text);
    margin-top: 36px;
    margin-bottom: 12px;
    padding-left: 12px;
    border-left: 3px solid var(--accent);
  }
  h3 {
    font-size: 11pt;
    color: #334155;
    margin-top: 20px;
    margin-bottom: 8px;
  }
  h4 {
    font-size: 10pt;
    color: #475569;
    margin-top: 14px;
    margin-bottom: 6px;
  }

  p { margin-bottom: 10px; }

  ul, ol { margin-left: 20px; margin-bottom: 10px; }
  li { margin-bottom: 4px; }

  code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8.5pt;
    background: #f1f5f9;
    color: #0891b2;
    padding: 1px 5px;
    border-radius: 3px;
  }

  pre {
    background: #0f172a;
    color: #e2e8f0;
    padding: 16px 20px;
    border-radius: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 8pt;
    line-height: 1.6;
    overflow: hidden;
    margin: 12px 0;
    white-space: pre-wrap;
    word-break: break-all;
  }
  pre code {
    background: none;
    color: inherit;
    padding: 0;
    font-size: inherit;
  }

  strong { font-weight: 600; }
  em { font-style: italic; color: #475569; }

  hr {
    border: none;
    border-top: 1px solid var(--border);
    margin: 24px 0;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0;
    font-size: 8.5pt;
    page-break-inside: avoid;
  }
  thead tr {
    background: #0f172a;
    color: #e2e8f0;
  }
  thead th {
    padding: 8px 10px;
    text-align: left;
    font-weight: 600;
    font-size: 8pt;
  }
  tbody tr { border-bottom: 1px solid var(--border); }
  tbody tr:nth-child(even) { background: var(--surface); }
  tbody td { padding: 7px 10px; vertical-align: top; }

  /* Status badges */
  .pass-badge, .badge-green {
    color: var(--pass);
    font-weight: 600;
  }
  .fail-badge { color: var(--fail); font-weight: 600; }

  /* Callout boxes */
  .callout {
    border-left: 4px solid var(--accent);
    background: #f0f9ff;
    padding: 12px 16px;
    border-radius: 0 6px 6px 0;
    margin: 14px 0;
    font-size: 9.5pt;
  }

  /* Section header chips */
  .section-num {
    display: inline-block;
    background: var(--accent);
    color: white;
    font-size: 7.5pt;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 3px;
    margin-right: 8px;
    letter-spacing: 0.05em;
  }

  /* Page breaks */
  .page-break { page-break-before: always; }

  /* Footer watermark */
  @page {
    margin: 0.6in 0.75in 0.7in;
    @bottom-center {
      content: "V10 Flagship Portfolio Audit & Hardening Report — Confidential | Page " counter(page) " of " counter(pages);
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      color: #94a3b8;
    }
    @top-right {
      content: "Generated " attr(data-date);
      font-family: 'Inter', sans-serif;
      font-size: 7.5pt;
      color: #94a3b8;
    }
  }
</style>
</head>
<body>

<!-- ═══════════════════════════ COVER PAGE ═══════════════════════════ -->
<div class="cover">
  <div class="cover-badge">🔐 Confidential Engineering Report</div>
  <h1>V10 Flagship Portfolio<br/>Audit &amp; Hardening<br/>Report</h1>
  <div class="cover-subtitle">Durgesh Dutt Sinha — AI/ML Engineering Portfolio</div>

  <div class="cover-meta">
    <div class="cover-meta-item">
      <label>Report Date</label>
      <span>November 6, 2026</span>
    </div>
    <div class="cover-meta-item">
      <label>Branch / Tag</label>
      <span>V10 (commit 418cab8)</span>
    </div>
    <div class="cover-meta-item">
      <label>Framework</label>
      <span>Next.js 14.2 App Router + Cloudflare Pages</span>
    </div>
    <div class="cover-meta-item">
      <label>Audit Scope</label>
      <span>Functionality · Architecture · Performance · Security · A11y · Reliability</span>
    </div>
    <div class="cover-meta-item">
      <label>Milestones Executed</label>
      <span>M1 through M5 (5 milestones, 23 improvements)</span>
    </div>
    <div class="cover-meta-item">
      <label>Live Preview</label>
      <span>http://localhost:3000</span>
    </div>
  </div>

  <div class="cover-verdict">
    <div class="dot"></div>
    <div>
      <strong>PRODUCTION READY — ALL GATES PASSED</strong>
      <p>91/91 unit tests · 0 TypeScript errors · 22/22 a11y tests · 0 broken links · 23 static pages</p>
    </div>
  </div>

  <div class="score-grid">
    <div class="score-card"><span class="num">91</span><span class="lbl">Tests Passing</span></div>
    <div class="score-card"><span class="num">22</span><span class="lbl">A11y Tests</span></div>
    <div class="score-card"><span class="num">23</span><span class="lbl">Static Pages</span></div>
    <div class="score-card"><span class="num">23</span><span class="lbl">Improvements</span></div>
  </div>
</div>

<!-- ═══════════════════════════ BODY ═══════════════════════════ -->
<div class="content" id="report-body">
</div>

<script>
// Simple markdown-to-HTML renderer
function renderMarkdown(md) {
  let html = md;

  // Escape HTML in code blocks first (before other processing)
  const codeBlocks = [];
  html = html.replace(/\`\`\`[\w]*\\n([\\s\\S]*?)\`\`\`/g, (_, code) => {
    const escaped = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    codeBlocks.push('<pre><code>' + escaped + '</code></pre>');
    return '___CODEBLOCK_' + (codeBlocks.length - 1) + '___';
  });

  // Tables
  html = html.replace(/(\\|.+\\|\\n)(\\|[-:| ]+\\|\\n)([\\s\\S]*?)(?=\\n\\n|$)/g, (match) => {
    const rows = match.trim().split('\\n').filter(r => r.trim());
    if (rows.length < 2) return match;
    const headers = rows[0].split('|').filter(h => h.trim()).map(h => '<th>' + h.trim() + '</th>').join('');
    const bodyRows = rows.slice(2).map(r => {
      const cells = r.split('|').filter(c => c !== undefined).slice(1, -1);
      return '<tr>' + cells.map(c => '<td>' + c.trim() + '</td>').join('') + '</tr>';
    }).join('');
    return '<table><thead><tr>' + headers + '</tr></thead><tbody>' + bodyRows + '</tbody></table>';
  });

  // Headings
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold + Italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Inline code
  html = html.replace(/\`([^\`]+)\`/g, '<code>$1</code>');

  // HR
  html = html.replace(/^---$/gm, '<hr/>');

  // Lists
  html = html.replace(/((?:^- .+\\n?)+)/gm, (block) => {
    const items = block.trim().split('\\n').map(l => '<li>' + l.replace(/^- /, '') + '</li>').join('');
    return '<ul>' + items + '</ul>';
  });
  html = html.replace(/((?:^\\d+\\. .+\\n?)+)/gm, (block) => {
    const items = block.trim().split('\\n').map(l => '<li>' + l.replace(/^\\d+\\. /, '') + '</li>').join('');
    return '<ol>' + items + '</ol>';
  });

  // Paragraphs — wrap remaining text blocks
  html = html.replace(/^(?!<[a-z]|___)(.+)$/gm, (line) => {
    if (!line.trim()) return '';
    return '<p>' + line + '</p>';
  });

  // Restore code blocks
  codeBlocks.forEach((block, i) => {
    html = html.replace('___CODEBLOCK_' + i + '___', block);
  });

  // Double blank lines → paragraph breaks
  html = html.replace(/\\n\\n+/g, '\\n');

  return html;
}

const mdContent = document.getElementById('md-source').textContent;
document.getElementById('report-body').innerHTML = renderMarkdown(mdContent);
</script>

<pre id="md-source" style="display:none">${md.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/`/g,'\\`')}</pre>

</body>
</html>`;

// Write HTML to temp file
const htmlPath = join(ROOT, 'out', '_audit_report_temp.html');
writeFileSync(htmlPath, html, 'utf8');

// Launch Playwright and print to PDF
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle' });

// Allow fonts to render
await page.waitForTimeout(1500);

const pdfPath = join(ROOT, 'out', 'V10_Audit_Hardening_Report.pdf');
await page.pdf({
  path: pdfPath,
  format: 'A4',
  printBackground: true,
  margin: {
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
  },
  displayHeaderFooter: true,
  headerTemplate: `<div style="width:100%;font-family:Inter,sans-serif;font-size:7.5pt;color:#94a3b8;padding:8px 56px;display:flex;justify-content:space-between;border-bottom:1px solid #e2e8f0;">
    <span>V10 Flagship Portfolio — Audit &amp; Hardening Report</span>
    <span>November 6, 2026</span>
  </div>`,
  footerTemplate: `<div style="width:100%;font-family:Inter,sans-serif;font-size:7.5pt;color:#94a3b8;padding:8px 56px;display:flex;justify-content:space-between;border-top:1px solid #e2e8f0;">
    <span>Confidential Engineering Document — durgesh-flagship-portfolio</span>
    <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
  </div>`,
});

await browser.close();

// Cleanup temp html
import { unlinkSync } from 'fs';
try { unlinkSync(htmlPath); } catch {}

console.log('PDF generated:', pdfPath);
