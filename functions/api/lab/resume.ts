import { checkRateLimit, getClientIp, jsonError, type RateLimitEnv } from '../../../lib/api/guards';
import { validateResumeInput } from '../../../lib/lab/validation';

const ROLE_TAXONOMIES: Record<string, { required: string[]; optional: string[] }> = {
  'AIML Engineer': {
    required: ['python', 'pytorch', 'deep learning', 'machine learning', 'computer vision', 'model deployment'],
    optional: ['tensorflow', 'scikit-learn', 'docker', 'cuda', 'fastapi', 'mlops', 'aws'],
  },
  'Full-Stack Architect': {
    required: ['typescript', 'next.js', 'react', 'postgresql', 'rest', 'system design', 'tailwind'],
    optional: ['drizzle orm', 'node.js', 'websockets', 'docker', 'redis', 'ci/cd'],
  },
  'GenAI / LLM Engineer': {
    required: ['prompt engineering', 'autonomous agents', 'rag', 'langchain', 'embeddings', 'python', 'vector database'],
    optional: ['gemini', 'whisper', 'fine-tuning', 'fastapi', 'evaluation', 'guardrails'],
  },
};

const DEFAULT_ROLE = 'AIML Engineer';
const LAB_RATE_LIMIT = { limit: 20, windowSeconds: 60 };

export const onRequestGet = async () => {
  return new Response(JSON.stringify({ status: 'ok', endpoint: '/api/lab/resume' }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const onRequestPost = async (context: { request: Request; env: RateLimitEnv }) => {
  const startTime = Date.now();
  try {
    const clientIp = getClientIp(context.request);
    const rate = await checkRateLimit(context.env, clientIp, LAB_RATE_LIMIT);

    if (!rate.allowed) {
      return new Response(
        JSON.stringify({ error: 'Too many analysis requests. Please wait a minute before trying again.' }),
        {
          status: 429,
          headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
        },
      );
    }

    const body: any = await context.request.json();
    const { text, role } = body;

    const resolvedRole = typeof role === 'string' && role.trim() ? role.trim() : DEFAULT_ROLE;
    const validation = validateResumeInput(text, resolvedRole);

    if (!validation.valid) {
      return jsonError(validation.error || 'Invalid resume analysis request.', 400);
    }

    const taxonomy = ROLE_TAXONOMIES[resolvedRole] || ROLE_TAXONOMIES[DEFAULT_ROLE];
    const lowerText = text.toLowerCase();

    const foundRequired = taxonomy.required.filter((s) => lowerText.includes(s));
    const missingKeywords = taxonomy.required.filter((s) => !lowerText.includes(s));
    const foundOptional = taxonomy.optional.filter((s) => lowerText.includes(s));

    const totalScoreRaw =
      (foundRequired.length / taxonomy.required.length) * 70 +
      (foundOptional.length / taxonomy.optional.length) * 30;
    const atsScore = Math.min(100, Math.round(totalScoreRaw));

    const numbersRegex = /\b\d+(?:\.\d+)?%?|\$\d+(?:,\d+)*(?:\.\d+)?|\b\d+\s*(?:ms|fps|x|k|m|users|clients|orders)\b/gi;
    const metricMatches = text.match(numbersRegex) || [];
    const metricDensity = Math.min(100, Math.round((metricMatches.length / 5) * 100));

    const lines = text.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 20);
    const sampleWeakBullet = lines.find((l: string) => !/\d+/.test(l)) || lines[0] || 'Developed an AI system for workflow automation.';

    const googleXYZRewrite = 'Accomplished [Impact/Result X] as measured by [Quantifiable Metric Y] by implementing [Methodology/Architecture Z]. Example: Accelerated operational workflow throughput by 42% as measured by task latency by engineering an asynchronous agent pipeline.';

    const executionLatencyMs = Date.now() - startTime;

    return new Response(JSON.stringify({
      role: resolvedRole,
      atsScore,
      rating: atsScore >= 80 ? 'Strong Match' : atsScore >= 60 ? 'Moderate Match' : 'Significant Gaps',
      extractedSkills: [...foundRequired, ...foundOptional],
      missingKeywords,
      metricDensityScore: metricDensity,
      bulletAudit: {
        analyzedBullet: sampleWeakBullet,
        critique: 'Lacks explicit quantifiable metric and methodology framing.',
        googleXYZFormula: 'Accomplished [X] as measured by [Y] by doing [Z]',
        suggestedRewrite: googleXYZRewrite,
      },
      executionLatencyMs,
      isDemonstration: true,
      engine: 'Deterministic Keyword-Match Rule Engine (Demonstration)',
      disclaimer: 'AI Lab interactive demonstration. No resume inputs are persisted to disk or external servers.',
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[Lab Resume Function] Unhandled error:', err);
    return jsonError('Invalid request body or JSON parsing failure.', 400);
  }
};
