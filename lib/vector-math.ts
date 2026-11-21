/**
 * Vector Math & Semantic Similarity Utilities
 * Zero runtime dependencies. Client-side ephemeral execution.
 */

export interface VectorMetrics {
  cosine: number;
  euclidean: number;
  angleDeg: number;
  sharedTerms: string[];
  uniqueA: string[];
  uniqueB: string[];
  vectorA: [number, number];
  vectorB: [number, number];
  vocabSize: number;
}

// Tokenize & normalize text
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

// Calculate Cosine Similarity, Angular Separation, and Euclidean Distance
export function calculateVectorSimilarity(textA: string, textB: string): VectorMetrics {
  const tokensA = tokenize(textA);
  const tokensB = tokenize(textB);

  if (tokensA.length === 0 || tokensB.length === 0) {
    return {
      cosine: 0,
      euclidean: 0,
      angleDeg: 90,
      sharedTerms: [],
      uniqueA: tokensA,
      uniqueB: tokensB,
      vectorA: [0, 0],
      vectorB: [0, 0],
      vocabSize: 0,
    };
  }

  // Unified vocabulary
  const vocab = Array.from(new Set([...tokensA, ...tokensB]));

  // Frequency mapping
  const freqA = new Map<string, number>();
  const freqB = new Map<string, number>();
  tokensA.forEach((t) => freqA.set(t, (freqA.get(t) || 0) + 1));
  tokensB.forEach((t) => freqB.set(t, (freqB.get(t) || 0) + 1));

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  let sumSqDiff = 0;

  const sharedTerms: string[] = [];
  const uniqueA: string[] = [];
  const uniqueB: string[] = [];

  vocab.forEach((word) => {
    const countA = freqA.get(word) || 0;
    const countB = freqB.get(word) || 0;

    dotProduct += countA * countB;
    normA += countA * countA;
    normB += countB * countB;
    sumSqDiff += Math.pow(countA - countB, 2);

    if (countA > 0 && countB > 0) sharedTerms.push(word);
    else if (countA > 0) uniqueA.push(word);
    else if (countB > 0) uniqueB.push(word);
  });

  const magnitudeA = Math.sqrt(normA);
  const magnitudeB = Math.sqrt(normB);

  const cosine = magnitudeA > 0 && magnitudeB > 0 ? dotProduct / (magnitudeA * magnitudeB) : 0;
  const clampedCosine = Math.max(0, Math.min(1, cosine));
  const euclidean = Math.sqrt(sumSqDiff);
  const angleRad = Math.acos(clampedCosine);
  const angleDeg = (angleRad * 180) / Math.PI;

  // 2D Projection for Cartesian plane:
  // Baseline angle 15° for visual layout, vector B offset by angular separation
  const baseAngleRad = (15 * Math.PI) / 180;
  const len = 120;

  const vxA = Math.cos(baseAngleRad) * len;
  const vyA = Math.sin(baseAngleRad) * len;

  const vxB = Math.cos(baseAngleRad + angleRad) * len;
  const vyB = Math.sin(baseAngleRad + angleRad) * len;

  return {
    cosine: Number(clampedCosine.toFixed(4)),
    euclidean: Number(euclidean.toFixed(2)),
    angleDeg: Number(angleDeg.toFixed(1)),
    sharedTerms,
    uniqueA,
    uniqueB,
    vectorA: [vxA, vyA],
    vectorB: [vxB, vyB],
    vocabSize: vocab.length,
  };
}
