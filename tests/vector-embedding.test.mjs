import test from 'node:test';
import assert from 'node:assert/strict';
import { tokenize, calculateVectorSimilarity } from '../lib/vector-math.ts';

test('Vector Embedding: Tokenizer cleans and filters words', () => {
  const tokens = tokenize('Hello, world! Autonomous AI-Agents 2026.');
  assert.deepEqual(tokens, ['hello', 'world', 'autonomous', 'ai', 'agents', '2026']);

  const empty = tokenize('');
  assert.deepEqual(empty, []);
});

test('Vector Embedding: Cosine similarity for identical strings is 1.0', () => {
  const text = 'Autonomous agents collaborate using tool calling and planning.';
  const res = calculateVectorSimilarity(text, text);

  assert.equal(res.cosine, 1.0);
  assert.equal(res.angleDeg, 0);
  assert.equal(res.euclidean, 0);
  assert.ok(res.sharedTerms.length > 0);
  assert.equal(res.uniqueA.length, 0);
  assert.equal(res.uniqueB.length, 0);
});

test('Vector Embedding: Cosine similarity for orthogonal strings is 0', () => {
  const textA = 'PostgreSQL database ACID transactions';
  const textB = 'Baking cookies butter chocolate';
  const res = calculateVectorSimilarity(textA, textB);

  assert.equal(res.cosine, 0);
  assert.equal(res.angleDeg, 90);
  assert.equal(res.sharedTerms.length, 0);
});

test('Vector Embedding: Cosine similarity handles empty or blank inputs gracefully', () => {
  const res = calculateVectorSimilarity('', '');
  assert.equal(res.cosine, 0);
  assert.equal(res.angleDeg, 90);
  assert.equal(res.vocabSize, 0);
});
