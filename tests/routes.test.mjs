import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();

test('Required Routes Specification Verification', async (t) => {
  const requiredPageRoutes = [
    'app/page.tsx',
    'app/resume/page.tsx',
    'app/recruiter/page.tsx',
    'app/performance/page.tsx',
    'app/changelog/page.tsx',
    'app/lab/page.tsx',
    'app/github-health/page.tsx',
    'app/privacy/page.tsx',
    'app/work/[slug]/page.tsx',
  ];

  for (const routePath of requiredPageRoutes) {
    await t.test(`Route file exists: ${routePath}`, () => {
      const fullPath = path.join(ROOT_DIR, routePath);
      assert.ok(fs.existsSync(fullPath), `Expected route file ${routePath} to exist`);
      const content = fs.readFileSync(fullPath, 'utf8');
      assert.ok(content.includes('export default'), `${routePath} must export a default page component`);
    });
  }

  await t.test('Case study canonical slugs match specification', () => {
    const caseStudiesPath = path.join(ROOT_DIR, 'lib/case-studies.ts');
    assert.ok(fs.existsSync(caseStudiesPath), 'lib/case-studies.ts must exist');
    const content = fs.readFileSync(caseStudiesPath, 'utf8');
    
    assert.ok(content.includes("slug: 'roleradar'"), 'Must declare canonical roleradar slug');
    assert.ok(content.includes("slug: 'fittrack'"), 'Must declare canonical fittrack slug');
    assert.ok(content.includes("slug: 'marketmatch-ai'"), 'Must declare canonical marketmatch-ai slug');
  });

  await t.test('Hero section resume CTA is active and links directly to /resume and /resume.pdf', () => {
    const heroPath = path.join(ROOT_DIR, 'components/sections/HeroSection.tsx');
    const heroContent = fs.readFileSync(heroPath, 'utf8');
    assert.ok(heroContent.includes('href="/resume"'), 'Hero must link directly to /resume');
    assert.ok(heroContent.includes('href="/resume.pdf"'), 'Hero must link directly to /resume.pdf');
    assert.ok(!heroContent.includes('cursor-not-allowed'), 'Hero must not disable resume button');
  });
});
