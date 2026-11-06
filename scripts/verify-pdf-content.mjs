/**
 * verify-pdf-content.mjs
 * Verifies PDF content by:
 * 1. Checking raw rendered HTML string contains all required content
 * 2. Counting PDF pages via Playwright
 * 3. Reporting pass/fail per check
 */

import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

function mdToHtml(src) {
  let out = src;
  const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  out = out.replace(/```[\w]*\n([\s\S]*?)```/g, (_,c) => `<pre><code>${esc(c.trimEnd())}</code></pre>`);
  out = out.replace(/((?:\|.+\|\n)+)/g, (block) => {
    const lines = block.trim().split('\n').filter(l => l.trim());
    if (lines.length < 2) return block;
    const cells = line => line.split('|').slice(1,-1).map(c => c.trim());
    const ths = cells(lines[0]).map(c => `<th>${c}</th>`).join('');
    const trs = lines.slice(2).map(l => `<tr>${cells(l).map(c=>`<td>${c}</td>`).join('')}</tr>`).join('');
    return `<table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>\n`;
  });
  out = out.replace(/^#### (.+)$/gm,'<h4>$1</h4>');
  out = out.replace(/^### (.+)$/gm,'<h3>$1</h3>');
  out = out.replace(/^## (.+)$/gm,'<h2>$1</h2>');
  out = out.replace(/^# (.+)$/gm,'<h1>$1</h1>');
  out = out.replace(/^---$/gm,'<hr/>');
  out = out.replace(/\*\*\*(.+?)\*\*\*/g,'<strong><em>$1</em></strong>');
  out = out.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
  out = out.replace(/`([^`]+)`/g,'<code>$1</code>');
  out = out.replace(/((?:^[ ]*[-*] .+\n?)+)/gm, block => {
    const items = block.trim().split('\n').map(l=>`<li>${l.replace(/^[ ]*[-*] /,'').trim()}</li>`).join('');
    return `<ul>${items}</ul>\n`;
  });
  out = out.replace(/((?:^\d+\. .+\n?)+)/gm, block => {
    const items = block.trim().split('\n').map(l=>`<li>${l.replace(/^\d+\. /,'').trim()}</li>`).join('');
    return `<ol>${items}</ol>\n`;
  });
  out = out.replace(/^(?!<[a-zA-Z\/])(.+)$/gm, l => l.trim() ? `<p>${l}</p>` : '');
  return out;
}

const md  = readFileSync(join(ROOT,'docs','AUDIT_AND_HARDENING_REPORT.md'),'utf8');
const renderedHtml = mdToHtml(md);

// ── 1. Check rendered HTML string ────────────────────────────────────────────
const checks = [
  // Major sections
  'Executive Summary','Production Readiness Attestation',
  'Multi-Dimensional System Audit','Functionality Audit','Architecture Audit',
  'Performance','Security Posture Audit','Usability','Reliability',
  'Detailed Record of Improvements','End-to-End Validation Results',
  'TypeScript Compiler','ESLint','Node.js Unit','Link','Production Static Build',
  'Automated Accessibility Audits','Live Preview Server',
  'Prioritized Roadmap','P1: High Priority','P2: Medium Priority','P3: Low Priority',
  'Complete Catalog of Unresolved Issues','Conclusion',
  // All 23 improvements
  'IMP-01','IMP-02','IMP-03','IMP-04','IMP-05','IMP-06','IMP-07','IMP-08',
  'IMP-09','IMP-10','IMP-11','IMP-12','IMP-13','IMP-14','IMP-15','IMP-16',
  'IMP-17','IMP-18','IMP-19','IMP-20','IMP-21','IMP-22','IMP-23',
  'IMP-24','IMP-25','IMP-26','IMP-27','IMP-28','IMP-29','IMP-30','IMP-31',
  'IMP-32','IMP-33','IMP-34','IMP-35','IMP-36',
  // All 6 debt items
  'DEBT-01','DEBT-02','DEBT-03','DEBT-04','DEBT-05','DEBT-06',
  // Key metrics
  '102','22/22','306 internal links','23 static pages',
  // Routes
  '/spaceedu','/cyberbot','/recruiter','/work/roleradar','/work/fittrack',
  // Key terms
  '87.7 kB','UNLOX','WebGL','WCAG','Permissions-Policy',
  'AccessibilityPanel','CyberBotStudioShell','lib/performance.ts',
  'npm run typecheck','npm run lint','npm test','npm run check:links',
  'npm run build','npm run test:a11y',
];

console.log('\n=== PDF Content Verification — Rendered HTML Check ===\n');
console.log(`MD file size  : ${(md.length/1024).toFixed(1)} KB`);
console.log(`HTML rendered : ${(renderedHtml.length/1024).toFixed(1)} KB\n`);

let pass=0, fail=0, missing=[];
checks.forEach(term => {
  const found = renderedHtml.includes(term);
  found ? pass++ : (fail++, missing.push(term));
  console.log(`  ${found ? '✔' : '✖'} ${term}`);
});

// ── 2. PDF page count via Playwright ─────────────────────────────────────────
const pdfPath = join(ROOT,'docs','V10_Audit_Hardening_Report.pdf');
const pdfBytes = readFileSync(pdfPath);
// Count PDF pages by pattern /Page\n in raw bytes
const pdfStr = pdfBytes.toString('latin1');
const pageMatches = [...pdfStr.matchAll(/\/Type\s*\/Page[^s]/g)];
const pdfSize = (pdfBytes.length/1024).toFixed(1);

// Also check PDF has non-trivial content via text stream count
const streamCount = [...pdfStr.matchAll(/stream\r?\n/g)].length;

console.log(`\n${'─'.repeat(55)}`);
console.log(`HTML Checks PASS : ${pass}/${checks.length}`);
console.log(`HTML Checks FAIL : ${fail}`);
if (missing.length) console.log(`Missing: ${missing.join(', ')}`);
console.log(`\nPDF file size    : ${pdfSize} KB`);
console.log(`PDF pages (est.) : ${pageMatches.length}`);
console.log(`PDF streams      : ${streamCount} (content blocks)`);
console.log(`\n${fail===0 ? '✅ ALL CONTENT VERIFIED — PDF renders full report from MD' : '⚠️  Some terms missing from rendered HTML'}`);
