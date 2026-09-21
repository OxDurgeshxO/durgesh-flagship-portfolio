import { checkRateLimit, getClientIp, jsonError, type RateLimitEnv } from '../../../lib/api/guards';
import { validateMarketMatchParams } from '../../../lib/lab/validation';

const LAB_RATE_LIMIT = { limit: 20, windowSeconds: 60 };

export const onRequestGet = async () => {
  return new Response(JSON.stringify({ status: 'ok', endpoint: '/api/lab/marketmatch' }), {
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
        JSON.stringify({ error: 'Too many simulation requests. Please wait a minute before trying again.' }),
        {
          status: 429,
          headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
        },
      );
    }

    const body: any = await context.request.json();
    const clusters = Number(body.clusters) || 5;
    const algorithm = String(body.algorithm || 'kmeans').toLowerCase();

    const validation = validateMarketMatchParams(clusters, algorithm);
    if (!validation.valid) {
      return jsonError(validation.error || 'Invalid simulation parameters.', 400);
    }

    const silhouetteMap: Record<number, number> = {
      2: 0.421,
      3: 0.468,
      4: 0.495,
      5: 0.507,
      6: 0.482,
      7: 0.451,
      8: 0.419,
    };

    const silhouetteScore = silhouetteMap[clusters] || 0.48;

    const segmentDistribution = [
      { name: 'Champions', count: 680, share: '17%', avgSpend: '$5,840', clv: 'High' },
      { name: 'Loyal Regulars', count: 1240, share: '31%', avgSpend: '$2,890', clv: 'Medium-High' },
      { name: 'Potential Loyalists', count: 860, share: '21.5%', avgSpend: '$640', clv: 'Growing' },
      { name: 'At-Risk Customers', count: 720, share: '18%', avgSpend: '$1,620', clv: 'Needs Intervention' },
      { name: 'Hibernating / Lost', count: 500, share: '12.5%', avgSpend: '$160', clv: 'Low' },
    ].slice(0, clusters);

    const executionLatencyMs = Date.now() - startTime;

    return new Response(JSON.stringify({
      clusters,
      algorithm,
      silhouetteScore,
      optimalK: 5,
      segmentDistribution,
      executionLatencyMs,
      isDemonstration: true,
      engine: 'Pre-computed Heuristic Cluster Model (Demonstration)',
      disclaimer: 'AI Lab interactive demonstration. No parameters or data are persisted.',
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[Lab MarketMatch Function] Unhandled error:', err);
    return jsonError('Invalid request body or JSON parsing failure.', 400);
  }
};
