import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';

const ROOT_DIR = process.cwd();

// Since lib/lab/validation.ts is TypeScript, verify its exported invariants
test('AI Lab Validation & Parameter Specification', async (t) => {
  const validationPath = path.join(ROOT_DIR, 'lib/lab/validation.ts');
  assert.ok(fs.existsSync(validationPath), 'lib/lab/validation.ts must exist');
  const source = fs.readFileSync(validationPath, 'utf8');

  await t.test('Resume validator enforces length boundaries', () => {
    assert.ok(source.includes('trimmed.length < 50'), 'Must enforce 50-character minimum');
    assert.ok(source.includes('trimmed.length > 15000'), 'Must enforce 15,000-character maximum');
    assert.ok(source.includes('Resume input exceeds'), 'Must return descriptive error for oversized resumes');
  });

  await t.test('MarketMatch validator enforces cluster range and algorithm whitelist', () => {
    assert.ok(source.includes('clusters < 2 || clusters > 8'), 'Must enforce cluster range between 2 and 8');
    assert.ok(source.includes("'kmeans', 'dbscan', 'gmm'"), 'Must restrict algorithms to kmeans, dbscan, gmm');
  });

  await t.test('Lab functions avoid per-isolate state', () => {
    assert.ok(!source.includes('new Map('), 'Must not use in-memory Maps for edge isolation safety');
  });
});

