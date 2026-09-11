"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, RefreshCw, Sliders, Layers, Users, Download } from "lucide-react";

export default function MarketMatchDemo() {
  const [clusters, setClusters] = useState(5);
  const [algorithm, setAlgorithm] = useState("kmeans");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const fetchSimulation = async (k: number, algo: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/lab/marketmatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clusters: k, algorithm: algo }),
      });
      const json = await res.json();
      setData(json);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSimulation(5, "kmeans");
  }, []);

  const handleClusterChange = (newK: number) => {
    setClusters(newK);
    fetchSimulation(newK, algorithm);
  };

  const handleAlgorithmChange = (newAlgo: string) => {
    setAlgorithm(newAlgo);
    fetchSimulation(clusters, newAlgo);
  };

  const getPointColor = (persona: string) => {
    if (persona.includes("Champions")) return "#ec4899";
    if (persona.includes("Loyal")) return "#a855f7";
    if (persona.includes("Potential")) return "#3b82f6";
    if (persona.includes("At-Risk")) return "#f59e0b";
    if (persona.includes("Lost")) return "#64748b";
    return "#10b981";
  };

  return (
    <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 mb-8 bg-white/[0.02]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <ShoppingBag className="size-5 text-rose-400" />
            <span>MarketMatch-AI: Interactive RFM Segmentation Studio</span>
          </h3>
          <p className="text-xs text-slate-400">
            Unsupervised clustering benchmark simulating real-world e-commerce retail behavior
          </p>
        </div>
        {data && (
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span>Silhouette: {data.silhouetteScore}</span>
            <span>•</span>
            <span>Latency: {data.executionLatencyMs}ms</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2 flex items-center justify-between">
              <span>Cluster Count (K-Means K):</span>
              <span className="font-bold text-purple-300 font-mono text-sm">{clusters} Clusters</span>
            </label>
            <input
              type="range"
              min={2}
              max={8}
              value={clusters}
              onChange={(e) => handleClusterChange(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>K=2</span>
              <span className="text-purple-400 font-bold">K=5 (Optimal)</span>
              <span>K=8</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">
              Clustering Algorithm:
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              {[
                { id: "kmeans", label: "K-Means" },
                { id: "gmm", label: "GMM Soft" },
                { id: "dbscan", label: "DBSCAN" },
              ].map((algo) => (
                <button
                  key={algo.id}
                  onClick={() => handleAlgorithmChange(algo.id)}
                  className={`py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                    algorithm === algo.id
                      ? "bg-purple-600/30 border-purple-400 text-white font-bold"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {algo.label}
                </button>
              ))}
            </div>
          </div>

          {/* Segment Breakdown */}
          {data && data.segments && (
            <div className="rounded-xl bg-black/40 border border-white/5 p-4">
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-2.5 flex items-center gap-1.5">
                <Users className="size-3.5 text-purple-400" /> Active Segment Personas
              </h4>
              <div className="space-y-2 text-xs">
                {data.segments.map((seg: any) => (
                  <div key={seg.name} className="flex items-center justify-between border-b border-white/5 pb-1">
                    <span className="text-slate-300 font-medium">{seg.name}</span>
                    <span className="font-mono text-[11px] text-purple-300">
                      {seg.share} • Avg {seg.avgSpend}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2D PCA Dimensionality Projection Scatter Sandbox */}
        <div className="lg:col-span-2 rounded-xl bg-black/50 border border-white/10 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>2D PCA Dimensionality Coordinates (Log1p RFM Space)</span>
            <span className="text-[11px] text-slate-500">Seed sample: 12 anchor profiles</span>
          </div>

          {/* Scatter Plot Coordinate Area */}
          <div className="relative w-full h-56 bg-slate-950/80 rounded-xl border border-white/5 p-4 overflow-hidden flex items-center justify-center">
            {/* Coordinate grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem]" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10" />
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10" />

            {data &&
              data.points &&
              data.points.map((pt: any) => {
                // Map PCA (-3 to +4) to percentage (5% to 95%)
                const leftPercent = Math.min(92, Math.max(8, ((pt.pca_x + 3.2) / 7.2) * 100));
                const topPercent = Math.min(92, Math.max(8, 100 - ((pt.pca_y + 2.5) / 6.0) * 100));
                const color = getPointColor(pt.persona);

                return (
                  <div
                    key={pt.id}
                    className="absolute size-3 rounded-full transition-all duration-500 group/pt cursor-pointer -translate-x-1/2 -translate-y-1/2 hover:scale-150"
                    style={{
                      left: `${leftPercent}%`,
                      top: `${topPercent}%`,
                      backgroundColor: color,
                      boxShadow: `0 0 10px ${color}80`,
                    }}
                  >
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pt:block whitespace-nowrap bg-black/90 text-white text-[10px] font-mono px-2 py-1 rounded border border-white/20 z-20 pointer-events-none shadow-xl">
                      #{pt.id} {pt.persona} (${pt.m})
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400 mt-4 border-t border-white/5 pt-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-pink-500" /> Champions
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-purple-500" /> Regulars
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-blue-500" /> Potential
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-amber-500" /> At-Risk
              </span>
            </div>
            <a
              href="https://oxdurgeshxo-marketmatch-ai-app-y8ysbm.streamlit.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-white underline"
            >
              Open Full 3D Streamlit Studio ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
