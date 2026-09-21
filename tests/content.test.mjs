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

  await t.test('No apologetic "To be improvised soon" labels in components or app routes', () => {
    const uiFiles = scanDir(path.join(ROOT_DIR, 'app'), (f) => f.endsWith('.tsx') || f.endsWith('.ts'))
      .concat(scanDir(path.join(ROOT_DIR, 'components'), (f) => f.endsWith('.tsx') || f.endsWith('.ts')));
    const offending = [];

    for (const file of uiFiles) {
      const content = fs.readFileSync(file, 'utf8');
      if (/to be improvised soon/i.test(content) || /beta feature • to be improvised/i.test(content)) {
        offending.push(path.relative(ROOT_DIR, file));
      }
    }

    assert.deepEqual(offending, [], `Found intrusive beta notices in: ${offending.join(', ')}`);
  });

  await t.test('No arbitrary repository ratings in lib/github.ts', () => {
    const githubTs = fs.readFileSync(path.join(ROOT_DIR, 'lib', 'github.ts'), 'utf8');
    assert.ok(!/rating:\s*9\./.test(githubTs), 'lib/github.ts must not contain arbitrary /10 ratings');
  });

  await t.test('docs/claims.md exists and is populated', () => {
    const claimsPath = path.join(ROOT_DIR, 'docs/claims.md');
    assert.ok(fs.existsSync(claimsPath), 'docs/claims.md must exist');
    const content = fs.readFileSync(claimsPath, 'utf8');
    assert.ok(content.includes('CLM-01'), 'claims.md must contain registry rows');
  });

  await t.test('No disputed 404 repository slugs exist in source code', () => {
    const uiFiles = scanDir(path.join(ROOT_DIR, 'app'), (f) => f.endsWith('.tsx') || f.endsWith('.ts'))
      .concat(scanDir(path.join(ROOT_DIR, 'components'), (f) => f.endsWith('.tsx') || f.endsWith('.ts')))
      .concat(scanDir(path.join(ROOT_DIR, 'lib'), (f) => f.endsWith('.tsx') || f.endsWith('.ts')));
    
    const disputedSlugs = [
      'Autonomous-Agent-Orchestrator',
      'Vision-Edge-Inference',
      'RoleRadar-AI-Job-Search-Agent-Aggregator',
    ];

    const offending = [];
    for (const file of uiFiles) {
      const content = fs.readFileSync(file, 'utf8');
      for (const slug of disputedSlugs) {
        if (content.includes(slug)) {
          offending.push(`${path.relative(ROOT_DIR, file)} contains ${slug}`);
        }
      }
    }

    assert.deepEqual(offending, [], `Found disputed 404 repository slugs: ${offending.join(', ')}`);
  });

  await t.test('No fabricated rank badges (#n Top) in ProjectsSection', () => {
    const file = path.join(ROOT_DIR, 'components/sections/ProjectsSection.tsx');
    const content = fs.readFileSync(file, 'utf8');
    assert.ok(!/#\d\s+Top/i.test(content), 'ProjectsSection must not contain arbitrary "#n Top" badges');
    assert.ok(!/hand-picked & scored/i.test(content), 'ProjectsSection must not claim repos were "scored" without criteria');
  });

  await t.test('No deceptive confidence strings in lab endpoints or components', () => {
    const labFiles = [
      path.join(ROOT_DIR, 'functions/api/lab/marketmatch.ts'),
      path.join(ROOT_DIR, 'functions/api/lab/resume.ts'),
      path.join(ROOT_DIR, 'components/lab/ResumeAnalyzerDemo.tsx'),
      path.join(ROOT_DIR, 'components/lab/MarketMatchDemo.tsx'),
    ];

    for (const file of labFiles) {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        assert.ok(!content.includes('Live Edge Inference'), `${path.relative(ROOT_DIR, file)} must not contain "Live Edge Inference"`);
        assert.ok(!content.includes('94% confidence'), `${path.relative(ROOT_DIR, file)} must not contain "94% confidence"`);
      }
    }
  });

});
