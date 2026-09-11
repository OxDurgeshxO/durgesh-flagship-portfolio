import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();

function scanDir(dir, filterFn, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!['node_modules', '.next', '.git', '.wrangler'].includes(file)) {
        scanDir(fullPath, filterFn, fileList);
      }
    } else if (filterFn(file)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

test('Content Hygiene & Security Scan', async (t) => {
  await t.test('No hardcoded personal Windows paths in source code or docs', () => {
    const codeFiles = scanDir(ROOT_DIR, (f) => f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.md') || f.endsWith('.mjs'))
      .filter((file) => !file.includes(path.sep + 'tests' + path.sep));
    const offending = [];

    for (const file of codeFiles) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('C:\\Users') || content.includes('C:/Users')) {
        offending.push(path.relative(ROOT_DIR, file));
      }
    }

    assert.deepEqual(offending, [], `Found hardcoded Windows paths in: ${offending.join(', ')}`);
  });

  await t.test('Root SECURITY.md policy document exists', () => {
    const secPath = path.join(ROOT_DIR, 'SECURITY.md');
    assert.ok(fs.existsSync(secPath), 'Root SECURITY.md must be present');
  });

  await t.test('.gitignore contains all required security rules', () => {
    const gitignorePath = path.join(ROOT_DIR, '.gitignore');
    const content = fs.readFileSync(gitignorePath, 'utf8');
    assert.ok(content.includes('.wrangler/'), '.gitignore must ignore .wrangler/');
    assert.ok(content.includes('coverage/'), '.gitignore must ignore coverage/');
    assert.ok(content.includes('test-results/'), '.gitignore must ignore test-results/');
    assert.ok(content.includes('!.env.example'), '.gitignore must preserve !.env.example');
  });

  await t.test('No legacy Netlify configuration remains in root', () => {
    const netlifyPath = path.join(ROOT_DIR, 'netlify.toml');
    assert.ok(!fs.existsSync(netlifyPath), 'netlify.toml must be decommissioned');
  });
});
