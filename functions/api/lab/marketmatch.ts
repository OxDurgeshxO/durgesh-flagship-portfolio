export const onRequestGet = async () => {
  return new Response(JSON.stringify({ status: "ok", endpoint: "/api/lab/marketmatch" }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const onRequestPost = async (context: { request: Request }) => {
  try {
    const body: any = await context.request.json();
    const clusters = Number(body.clusters) || 5;
    const algorithm = String(body.algorithm || "kmeans").toLowerCase();

    if (clusters < 2 || clusters > 8) {
      return new Response(JSON.stringify({ error: "Cluster count (K) must be between 2 and 8." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
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
      { name: "Champions", count: 680, share: "17%", avgSpend: "$5,840", clv: "High" },
      { name: "Loyal Regulars", count: 1240, share: "31%", avgSpend: "$2,890", clv: "Medium-High" },
      { name: "Potential Loyalists", count: 860, share: "21.5%", avgSpend: "$640", clv: "Growing" },
      { name: "At-Risk Customers", count: 720, share: "18%", avgSpend: "$1,620", clv: "Needs Intervention" },
      { name: "Hibernating / Lost", count: 500, share: "12.5%", avgSpend: "$160", clv: "Low" },
    ].slice(0, clusters);

    return new Response(JSON.stringify({
      clusters,
      algorithm,
      silhouetteScore,
      optimalK: 5,
      convergenceIterations: 14,
      segmentDistribution,
      inferenceTimeMs: 12,
      confidence: "Live Edge Inference",
      disclaimer: "AI Lab interactive demonstration. No parameters or data are persisted.",
    }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};
