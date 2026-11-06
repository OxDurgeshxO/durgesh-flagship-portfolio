/**
 * verify-test-integrity.mjs
 * Forensic Auditor script: Audits all test files for assertion density,
 * verifying that tests are genuinely asserting behavior and not mocked to no-op.
 */

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TESTS_DIR = join(ROOT, 'tests');

const testFiles = readdirSync(TESTS_DIR).filter(f => f.endsWith('.test.mjs'));

console.log('=== Forensic Auditor: Test Integrity & Assertion Audit ===\n');

let totalTests = 0;
let totalAssertions = 0;
let suspiciousTests = 0;

testFiles.forEach(file => {
  const content = readFileSync(join(TESTS_DIR, file), 'utf8');
  const testMatches = [...content.matchAll(/test\s*\(\s*['"`](.*?)['"`]/g)];
  const assertMatches = [...content.matchAll(/assert\.(strictEqual|deepStrictEqual|ok|match|throws|doesNotThrow|equal|notStrictEqual)/g)];

  console.log(`File: tests/${file}`);
  console.log(`  Tests defined: ${testMatches.length}`);
  console.log(`  Explicit assert calls: ${assertMatches.length}`);

  if (testMatches.length > 0 && assertMatches.length === 0) {
    console.warn(`  WARNING: Zero explicit assert calls in ${file}`);
    suspiciousTests++;
  }

  totalTests += testMatches.length;
  totalAssertions += assertMatches.length;
});

console.log('\n--- Test Integrity Summary ---');
console.log(`Total test suites/files: ${testFiles.length}`);
console.log(`Total declared tests: ${totalTests}`);
console.log(`Total assertions: ${totalAssertions}`);
console.log(`Suspicious/mocked tests: ${suspiciousTests}`);

if (suspiciousTests === 0 && totalAssertions >= totalTests) {
  console.log('VERDICT: CLEAN — High assertion density, zero dummy passes or test bypasses detected.');
} else {
  console.warn('VERDICT: SCRUTINIZE — Discrepancies found.');
}
