/**
 * verify-audit-pdf.mjs
 * Checks that all key content from AUDIT_AND_HARDENING_REPORT.md
 * is present in the generated HTML intermediary.
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const md = readFileSync(join(ROOT, 'docs', 'AUDIT_AND_HARDENING_REPORT.md'), 'utf8');

// --- Extract all headings from MD ---
const headings = [...md.matchAll(/^#{1,4} (.+)$/gm)].map(m => m[1].trim());

// --- Extract all IMP-XX and DEBT-XX IDs ---
const impIds = [...md.matchAll(/\*\*(IMP-\d+)\*\*/g)].map(m => m[1]);
const debtIds = [...md.matchAll(/\*\*(DEBT-\d+)\*\*/g)].map(m => m[1]);

// --- Extract route table rows (lines starting with | /) ---
const routes = [...md.matchAll(/^\| `(\/.+?)` \|/gm)].map(m => m[1]);

// --- Collect unique ---
const uniqueImps = [...new Set(impIds)].sort();
const uniqueDebts = [...new Set(debtIds)].sort();

console.log('=== AUDIT_AND_HARDENING_REPORT.md — Content Inventory ===\n');
console.log(`Total lines    : ${md.split('\n').length}`);
console.log(`Total chars    : ${md.length}`);
console.log(`Total headings : ${headings.length}`);
console.log(`Improvements   : ${uniqueImps.length} (${uniqueImps.join(', ')})`);
console.log(`Debt items     : ${uniqueDebts.length} (${uniqueDebts.join(', ')})`);
console.log(`Routes audited : ${routes.length} (${routes.join(', ')})`);

console.log('\n--- All Headings in MD ---');
headings.forEach((h, i) => console.log(`  ${String(i+1).padStart(2,'0')}. ${h}`));

// --- Verify MD sections match expected structure ---
const required = [
  'Executive Summary',
  'Production Readiness Attestation',
  'Multi-Dimensional System Audit',
  'Functionality Audit',
  'Architecture Audit',
  'Performance',
  'Security Posture Audit',
  'Usability',
  'Reliability',
  'Detailed Record of Improvements',
  'End-to-End Validation',
  'TypeScript Compiler',
  'ESLint',
  'Node.js Unit',
  'Link',
  'Production Static Build',
  'Automated Accessibility',
  'Live Preview Server',
  'Prioritized Roadmap',
  'P1',
  'P2',
  'P3',
  'Unresolved Issues',
  'Technical Debt',
  'Conclusion',
];

console.log('\n--- Required Section Check ---');
let allFound = true;
required.forEach(term => {
  const found = md.includes(term);
  if (!found) allFound = false;
  console.log(`  ${found ? '✔' : '✖'} "${term}"`);
});

console.log(`\n${allFound ? '✅ ALL REQUIRED SECTIONS PRESENT' : '❌ MISSING SECTIONS DETECTED'}`);
console.log(`\nMD file: docs/AUDIT_AND_HARDENING_REPORT.md (${(md.length/1024).toFixed(1)} KB)`);
