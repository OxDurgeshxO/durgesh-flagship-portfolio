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

// Simple in-memory sliding-window IP rate limiter
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;
const ipRequestHistory = new Map<string, number[]>();

export function checkRateLimit(clientIp: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const timestamps = ipRequestHistory.get(clientIp) || [];
  const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  validTimestamps.push(now);
  ipRequestHistory.set(clientIp, validTimestamps);
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - validTimestamps.length };
}
