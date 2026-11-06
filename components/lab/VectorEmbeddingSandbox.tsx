'use client';

import React, { useState, useMemo } from 'react';
import { Compass, Sparkles, RefreshCw, BarChart2, CheckCircle2, AlertCircle } from 'lucide-react';
import { tokenize, calculateVectorSimilarity } from '@/lib/vector-math';

interface Preset {
  name: string;
  desc: string;
  promptA: string;
  promptB: string;
}

const PRESETS: Preset[] = [
  {
    name: 'Autonomous Agents (Semantic Match)',
    desc: 'High conceptual overlap across agentic architecture terms',
    promptA: 'Autonomous AI agents coordinate tool calling and multi-agent workflow swarms',
    promptB: 'AI agent systems collaborate through structured function execution and tools',
  },
  {
    name: 'Computer Vision & Deep Learning',
    desc: 'Shared domain terminology in deep neural networks',
    promptA: 'Deep convolutional neural networks perform real-time video pose estimation',
    promptB: 'Computer vision models detect human pose landmarks and kinematic joints',
  },
  {
    name: 'Backend vs Frontend (Moderate Overlap)',
    desc: 'Both software engineering, but distinct tech stacks',
    promptA: 'PostgreSQL relational database schema design, ACID transactions, and indexing',
    promptB: 'React 18 Next.js frontend client components, Tailwind styling, and UI animations',
  },
  {
    name: 'Orthogonal Domains (Near Zero)',
    desc: 'Edge cloud infrastructure vs culinary recipe',
    promptA: 'Cloudflare Workers edge anycast routing with zero cold start latency',
    promptB: 'Baking artisanal chocolate chip cookies with brown butter and organic flour',
  },
];

// Main Component
export default function VectorEmbeddingSandbox() {
  const [promptA, setPromptA] = useState(PRESETS[0].promptA);
  const [promptB, setPromptB] = useState(PRESETS[0].promptB);

  const metrics = useMemo(() => calculateVectorSimilarity(promptA, promptB), [promptA, promptB]);

  const getTier = (cos: number) => {
    if (cos >= 0.85) return { label: 'High Semantic Overlap', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    if (cos >= 0.5) return { label: 'Moderate Similarity', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' };
    if (cos >= 0.2) return { label: 'Low / Distant Overlap', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
    return { label: 'Orthogonal / Dissimilar', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
  };

  const tier = getTier(metrics.cosine);

  return (
    <div className="rounded-2xl border border-border/80 bg-card/60 p-6 md:p-8 space-y-8 backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent-lab)]">
            <Compass className="h-4 w-4" />
            <span>Interactive Vector Space Engine</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mt-1">In-Browser Vector Embedding & Cosine Lab</h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Calculates token-frequency dot product, angular distance ($\theta$), and Euclidean separation across multidimensional vocabularies in real time with client-side zero-latency math.
          </p>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">Presets:</span>
          <select
            aria-label="Vector Sandbox Presets"
            onChange={(e) => {
              const idx = Number(e.target.value);
              if (PRESETS[idx]) {
                setPromptA(PRESETS[idx].promptA);
                setPromptB(PRESETS[idx].promptB);
              }
            }}
            className="rounded-lg border border-border/80 bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {PRESETS.map((p, i) => (
              <option key={i} value={i}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Prompts Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prompt A */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Prompt Vector A</span>
            </label>
            <span className="text-[11px] font-mono text-muted-foreground">{tokenize(promptA).length} tokens</span>
          </div>
          <textarea
            value={promptA}
            onChange={(e) => setPromptA(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-border/80 bg-background/60 p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/60 font-sans transition-all resize-none"
            placeholder="Type first prompt..."
          />
        </div>

        {/* Prompt B */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span>Prompt Vector B</span>
            </label>
            <span className="text-[11px] font-mono text-muted-foreground">{tokenize(promptB).length} tokens</span>
          </div>
          <textarea
            value={promptB}
            onChange={(e) => setPromptB(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-border/80 bg-background/60 p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 font-sans transition-all resize-none"
            placeholder="Type second prompt..."
          />
        </div>
      </div>

      {/* Metrics & Vector Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Metric Cards */}
        <div className="space-y-3">
          {/* Cosine Score */}
          <div className="rounded-xl border border-border/80 bg-background/40 p-4">
            <div className="text-xs text-muted-foreground font-mono uppercase">Cosine Similarity</div>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-4xl font-extrabold font-mono text-foreground tracking-tight">
                {metrics.cosine.toFixed(4)}
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${tier.color}`}>
                {tier.label}
              </span>
            </div>
            <div className="w-full bg-border/40 h-2 rounded-full overflow-hidden mt-3">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${metrics.cosine * 100}%` }}
              />
            </div>
          </div>

          {/* Angular Distance & Euclidean */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border/80 bg-background/40 p-3">
              <div className="text-[11px] text-muted-foreground font-mono uppercase">Angular Sep (θ)</div>
              <div className="text-xl font-bold font-mono text-foreground mt-0.5">{metrics.angleDeg}°</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">0° = identical, 90° = orthogonal</div>
            </div>
            <div className="rounded-xl border border-border/80 bg-background/40 p-3">
              <div className="text-[11px] text-muted-foreground font-mono uppercase">Euclidean Dist</div>
              <div className="text-xl font-bold font-mono text-foreground mt-0.5">{metrics.euclidean}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">Token frequency L2 delta</div>
            </div>
          </div>
        </div>

        {/* 2D Vector Projection Graph */}
        <div className="lg:col-span-2 rounded-xl border border-border/80 bg-slate-950/70 p-5 flex flex-col items-center justify-center relative min-h-[260px] overflow-hidden">
          <div className="absolute top-3 left-4 text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <BarChart2 className="h-3.5 w-3.5 text-cyan-400" />
            <span>2D Cartesian Projection Plane</span>
          </div>
          <div className="absolute top-3 right-4 text-[10px] font-mono text-emerald-400">
            Vocab: {metrics.vocabSize} dimensions
          </div>

          {/* SVG Vector Plot */}
          <svg viewBox="-140 -140 280 280" className="w-full max-w-[280px] h-auto my-2">
            {/* Grid Circles */}
            <circle cx="0" cy="0" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
            <circle cx="0" cy="0" r="80" fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
            <circle cx="0" cy="0" r="120" fill="none" stroke="rgba(255,255,255,0.12)" />

            {/* Axes */}
            <line x1="-130" y1="0" x2="130" y2="0" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <line x1="0" y1="-130" x2="0" y2="130" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

            {/* Vector A (Emerald) */}
            <line
              x1="0"
              y1="0"
              x2={metrics.vectorA[0]}
              y2={-metrics.vectorA[1]}
              stroke="#10b981"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx={metrics.vectorA[0]} cy={-metrics.vectorA[1]} r="5" fill="#10b981" />
            <text
              x={metrics.vectorA[0] + 8}
              y={-metrics.vectorA[1] + 4}
              fill="#10b981"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
            >
              A
            </text>

            {/* Vector B (Cyan) */}
            <line
              x1="0"
              y1="0"
              x2={metrics.vectorB[0]}
              y2={-metrics.vectorB[1]}
              stroke="#06b6d4"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx={metrics.vectorB[0]} cy={-metrics.vectorB[1]} r="5" fill="#06b6d4" />
            <text
              x={metrics.vectorB[0] + 8}
              y={-metrics.vectorB[1] + 4}
              fill="#06b6d4"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
            >
              B
            </text>

            {/* Origin */}
            <circle cx="0" cy="0" r="3" fill="#ffffff" />
          </svg>

          <div className="flex items-center gap-6 text-[11px] font-mono text-muted-foreground mt-1">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Vector A
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400" /> Vector B
            </span>
            <span className="text-slate-400">θ = {metrics.angleDeg}°</span>
          </div>
        </div>
      </div>

      {/* Shared vs Unique Vocabulary Chips */}
      <div className="border-t border-border/60 pt-5 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Vocabulary Overlap Analysis
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Shared */}
          <div className="rounded-xl border border-border/60 bg-background/40 p-3 space-y-2">
            <div className="text-[11px] font-semibold text-emerald-400 uppercase">
              Shared Overlap ({metrics.sharedTerms.length})
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {metrics.sharedTerms.length > 0 ? (
                metrics.sharedTerms.map((w) => (
                  <span
                    key={w}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                  >
                    {w}
                  </span>
                ))
              ) : (
                <span className="text-[11px] text-muted-foreground italic">No shared tokens</span>
              )}
            </div>
          </div>

          {/* Unique A */}
          <div className="rounded-xl border border-border/60 bg-background/40 p-3 space-y-2">
            <div className="text-[11px] font-semibold text-slate-300 uppercase">
              Unique to A ({metrics.uniqueA.length})
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {metrics.uniqueA.map((w) => (
                <span key={w} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {w}
                </span>
              ))}
            </div>
          </div>

          {/* Unique B */}
          <div className="rounded-xl border border-border/60 bg-background/40 p-3 space-y-2">
            <div className="text-[11px] font-semibold text-slate-300 uppercase">
              Unique to B ({metrics.uniqueB.length})
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {metrics.uniqueB.map((w) => (
                <span key={w} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
