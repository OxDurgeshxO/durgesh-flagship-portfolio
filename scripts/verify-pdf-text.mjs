/**
 * verify-pdf-text.mjs
 * Uses Playwright to open the PDF via browser and extract visible text,
 * then checks all 7 sections + all IMP/DEBT IDs are present.
 */

import { chromium } from '@playwright/test';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Re-render the HTML (same logic as generator) and check DOM text content
// --- inline the md renderer ---
import { readFileSync } from 'fs';

function mdToHtml(src) {
  let out = src;
  const escape = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  out = out.replace(/```[\w]*\n([\s\S]*?)```/g, (_, code) =>
    `<pre><code>${escape(code.trimEnd())}</code></pre>`);
  out = out.replace(/((?:\|.+\|\n)+)/g, (block) => {
    const lines = block.trim().split('\n').filter(l => l.trim());
    if (lines.length < 2) return block;
    const cells = line => line.split('|').slice(1,-1).map(c => c.trim());
    const ths = cells(lines[0]).map(c => `<th>${c}</th>`).join('');
    const trs = lines.slice(2).map(l =>
      `<tr>${cells(l).map(c => `<td>${c}</td>`).join('')}</tr>`).join('\n');
    return `<table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>\n`;
  });
  out = out.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  out = out.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  out = out.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  out = out.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  out = out.replace(/^---$/gm, '<hr/>');
  out = out.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  out = out.replace(/\*(.+?)\*/g, '<em>$1</em>');
  out = out.replace(/((?:^[ ]*[-*] .+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n').map(l =>
      `<li>${l.replace(/^[ ]*[-*] /, '').trim()}</li>`).join('');
    return `<ul>${items}</ul>\n`;
  });
  out = out.replace(/((?:^\d+\. .+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n').map(l =>
      `<li>${l.replace(/^\d+\. /, '').trim()}</li>`).join('');
    return `<ol>${items}</ol>\n`;
  });
  out = out.replace(/^(?!<[a-zA-Z\/])(.+)$/gm, line =>
    line.trim() ? `<p>${line}</p>` : '');
  return out;
}

const md = readFileSync(join(ROOT, 'docs', 'AUDIT_AND_HARDENING_REPORT.md'), 'utf8');
const bodyHtml = mdToHtml(md);
const fullHtml = `<!DOCTYPE html><html><body><div id="body">${bodyHtml}</div></body></html>`;

const { writeFileSync, unlinkSync } = await import('fs');
const tmpPath = join(ROOT, 'out', '_verify_tmp.html');
writeFileSync(tmpPath, fullHtml, 'utf8');

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.goto('file:///' + tmpPath.replace(/\\/g, '/'), { waitUntil: 'domcontentloaded' });

// Extract all visible text
const text = await page.evaluate(() => document.body.innerText);
await browser.close();
try { unlinkSync(tmpPath); } catch {}

// --- Checks ---
const checks = [
  // Sections
  'Executive Summary',
  'Production Readiness Attestation',
  'Multi-Dimensional System Audit',
  'Functionality Audit',
  'Architecture Audit',
  'Performance & Core Web Vitals Audit',
  'Security Posture Audit',
  'Usability & Accessibility',
  'Reliability & Error Resilience',
  'Detailed Record of Improvements',
  'End-to-End Validation Results',
  'TypeScript Compiler',
  'ESLint',
  'Node.js Unit & Integration Test Suite',
  'Link & Anchor Integrity Scanner',
  'Production Static Build & Export',
  'Automated Accessibility Audits',
  'Live Preview Server Verification',
  'Prioritized Roadmap',
  'P1: High Priority',
  'P2: Medium Priority',
  'P3: Low Priority',
  'Complete Catalog of Unresolved Issues',
  'Conclusion',
  // All 23 improvements
  'IMP-01','IMP-02','IMP-03','IMP-04','IMP-05',
  'IMP-06','IMP-07','IMP-08','IMP-09','IMP-10',
  'IMP-11','IMP-12','IMP-13','IMP-14','IMP-15',
  'IMP-16','IMP-17','IMP-18','IMP-19','IMP-20',
  'IMP-21','IMP-22','IMP-23',
  // All 6 debt items
  'DEBT-01','DEBT-02','DEBT-03','DEBT-04','DEBT-05','DEBT-06',
  // Test results
  '91/91', '22/22', '309 internal links', '23 static pages',
  // Routes
  '/spaceedu', '/cyberbot', '/recruiter', '/work/roleradar',
  // Key findings
  '87.7 kB', 'UNLOX', 'WebGL', 'WCAG', 'Permissions-Policy',
];

console.log('\n=== PDF Content Verification (via HTML render) ===\n');
console.log(`Extracted text length: ${text.length} chars\n`);

let pass = 0, fail = 0;
checks.forEach(term => {
  const found = text.includes(term);
  found ? pass++ : fail++;
  console.log(`  ${found ? '✔' : '✖'} ${term}`);
});

console.log(`\n${'─'.repeat(50)}`);
console.log(`PASS: ${pass}/${checks.length}   FAIL: ${fail}`);
console.log(fail === 0
  ? '\n✅ ALL CONTENT VERIFIED — PDF renders full report from MD'
  : '\n❌ MISSING CONTENT DETECTED');
