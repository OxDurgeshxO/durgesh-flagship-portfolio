import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();

test('Executive 1-Page Resume Verification', async (t) => {
  const resumeViewPath = path.join(ROOT_DIR, 'components/resume/ResumeView.tsx');
  const resumeActionsPath = path.join(ROOT_DIR, 'components/resume/ResumeActions.tsx');
  const resumeCssPath = path.join(ROOT_DIR, 'styles/resume.css');
  const resumePdfPath = path.join(ROOT_DIR, 'public/resume.pdf');

  await t.test('ResumeView.tsx exists and has no RoleHighlighter or gimmick references', () => {
    assert.ok(fs.existsSync(resumeViewPath), 'ResumeView.tsx must exist');
    const content = fs.readFileSync(resumeViewPath, 'utf8');
    assert.ok(!content.includes('RoleHighlighter'), 'Must not reference RoleHighlighter component');
    assert.ok(!content.includes('Recruiter Role Lens'), 'Must not contain Recruiter Role Lens heading');
    assert.ok(!content.includes('role-highlighter'), 'Must not import role-highlighter styles');
  });

  await t.test('ResumeView.tsx features top 3 flagship projects in priority order', () => {
    const content = fs.readFileSync(resumeViewPath, 'utf8');
    const jarvisIndex = content.indexOf('J.A.R.V.I.S.');
    const roleradarIndex = content.indexOf('RoleRadar');
    const marketmatchIndex = content.indexOf('MarketMatch-AI');

    assert.ok(jarvisIndex !== -1, 'Must feature J.A.R.V.I.S.');
    assert.ok(roleradarIndex !== -1, 'Must feature RoleRadar');
    assert.ok(marketmatchIndex !== -1, 'Must feature MarketMatch-AI');

    assert.ok(jarvisIndex < roleradarIndex, 'J.A.R.V.I.S. must precede RoleRadar');
    assert.ok(roleradarIndex < marketmatchIndex, 'RoleRadar must precede MarketMatch-AI');
  });

  await t.test('ResumeView.tsx projects contain bold technical lead-ins', () => {
    const content = fs.readFileSync(resumeViewPath, 'utf8');
    assert.ok(content.includes('Full-Duplex Voice Engine:'), 'Must include Full-Duplex Voice Engine lead-in');
    assert.ok(content.includes('Resume Parsing Engine:'), 'Must include Resume Parsing Engine lead-in');
    assert.ok(content.includes('Unsupervised ML Pipeline:'), 'Must include Unsupervised ML Pipeline lead-in');
  });

  await t.test('ResumeActions.tsx 1-click ATS export matches 3-flagship layout with bold lead-ins', () => {
    assert.ok(fs.existsSync(resumeActionsPath), 'ResumeActions.tsx must exist');
    const content = fs.readFileSync(resumeActionsPath, 'utf8');
    assert.ok(content.includes('Portfolio: https://durgesh-portfolio.pages.dev'), 'Must label URL cleanly as Portfolio');
    assert.ok(content.includes('J.A.R.V.I.S. — Real-Time Multimodal AI Voice Assistant'), 'ATS text must contain J.A.R.V.I.S.');
    assert.ok(content.includes('RoleRadar — AI Resume Intelligence & ATS Compatibility Engine'), 'ATS text must contain RoleRadar');
    assert.ok(content.includes('MarketMatch-AI — Customer Segmentation & Lookalike Studio'), 'ATS text must contain MarketMatch-AI');
    assert.ok(content.includes('Full-Duplex Voice Engine:'), 'ATS text must have Full-Duplex Voice Engine lead-in');
  });

  await t.test('Compiled vector PDF exists on disk and is non-empty', () => {
    assert.ok(fs.existsSync(resumePdfPath), 'public/resume.pdf must exist');
    const stat = fs.statSync(resumePdfPath);
    assert.ok(stat.size > 50000, `resume.pdf should be non-empty vector PDF (actual: ${stat.size} bytes)`);
  });

  await t.test('styles/resume.css enforces 1-page print constraints', () => {
    assert.ok(fs.existsSync(resumeCssPath), 'styles/resume.css must exist');
    const content = fs.readFileSync(resumeCssPath, 'utf8');
    assert.ok(content.includes('@page'), 'Must declare @page print rules');
    assert.ok(content.includes('page-break-inside: avoid'), 'Must avoid breaks inside items');
  });
});
