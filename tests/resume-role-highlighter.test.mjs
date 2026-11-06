import test from 'node:test';
import assert from 'node:assert/strict';
import { ROLE_DEFINITIONS } from '../lib/resume-roles.ts';

test('Resume Role Highlighter: All roles have valid descriptions and keywords', () => {
  const roles = ['all', 'aiml', 'fullstack', 'agents'];

  roles.forEach((r) => {
    const def = ROLE_DEFINITIONS[r];
    assert.ok(def, `Role definition for ${r} should exist`);
    assert.ok(def.label.length > 0);
    assert.ok(def.description.length > 0);
  });
});

test('Resume Role Highlighter: AIML role targets core deep learning and vision keywords', () => {
  const keywords = ROLE_DEFINITIONS.aiml.keywords;
  assert.ok(keywords.includes('PyTorch'));
  assert.ok(keywords.includes('Computer Vision'));
  assert.ok(keywords.includes('MediaPipe'));
  assert.ok(keywords.includes('Scikit-Learn'));
});

test('Resume Role Highlighter: Fullstack role targets edge, database and frontend keywords', () => {
  const keywords = ROLE_DEFINITIONS.fullstack.keywords;
  assert.ok(keywords.includes('Next.js'));
  assert.ok(keywords.includes('TypeScript'));
  assert.ok(keywords.includes('PostgreSQL'));
  assert.ok(keywords.includes('Cloudflare Pages'));
});

test('Resume Role Highlighter: Agents role targets autonomous multimodal keywords', () => {
  const keywords = ROLE_DEFINITIONS.agents.keywords;
  assert.ok(keywords.includes('J.A.R.V.I.S.'));
  assert.ok(keywords.includes('Multimodal AI Voice Assistant'));
  assert.ok(keywords.includes('Whisper STT'));
});
