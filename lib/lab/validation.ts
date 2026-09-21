// AI Lab Validation & Security Guardrails

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateResumeInput(text: string, role: string): ValidationResult {
  if (!text || typeof text !== 'string') {
    return { valid: false, error: 'Resume text is required.' };
  }
  const trimmed = text.trim();
  if (trimmed.length < 50) {
    return { valid: false, error: 'Resume text must be at least 50 characters for meaningful analysis.' };
  }
  if (trimmed.length > 15000) {
    return { valid: false, error: 'Resume input exceeds the 15,000 character maximum threshold.' };
  }
  if (!role || typeof role !== 'string') {
    return { valid: false, error: 'Target engineering role must be specified.' };
  }
  return { valid: true };
}

export function validateMarketMatchParams(clusters: number, algorithm: string): ValidationResult {
  if (typeof clusters !== 'number' || clusters < 2 || clusters > 8) {
    return { valid: false, error: 'Cluster count (K) must be an integer between 2 and 8.' };
  }
  if (!['kmeans', 'dbscan', 'gmm'].includes(algorithm.toLowerCase())) {
    return { valid: false, error: 'Algorithm must be one of: kmeans, dbscan, or gmm.' };
  }
  return { valid: true };
}

// NOTE: the in-memory `checkRateLimit` that used to live here has been removed.
// A module-level Map cannot rate limit on Cloudflare edge — isolates are ephemeral and
// horizontally scaled, so each isolate kept its own counters, and the map grew without
// bound because entries were only ever filtered for the key being accessed. The
// KV-backed replacement lives in `lib/api/guards.ts` and is used by every Function.
