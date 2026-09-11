"use client";

import React, { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";
import { OWNER } from "@/lib/data";

const CANDIDATE_SUMMARY = `Durgesh Dutt Sinha — AIML Engineer & Full-Stack Architect
• Master of Computer Applications (AIML) at Sri Balaji University Pune (2025–2027) | BCA Graduate.
• Fellowships: UNLOX® AI Program Fellow, Be10x AI Cohort Member.
• Core Competencies: Autonomous AI Agents, Real-Time MediaPipe Computer Vision (<50ms latency), Next.js 16, TypeScript, Drizzle ORM, Scikit-Learn (K-Means/GMM/DBSCAN), AWS Cloud Pipelines.
• Featured Platforms:
  - RoleRadar: AI career platform with 8-point ATS scanner & Google XYZ bullet optimizer.
  - AI Fitness Ecosystem: Edge pose estimation & biomechanical form validation.
  - MarketMatch-AI: Retail RFM segmentation & lookalike recommendation engine.
• Contact: ${OWNER.email} | ${OWNER.github} | ${OWNER.linkedin}`;

export default function RecruiterSummary() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CANDIDATE_SUMMARY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="glass rounded-2xl p-6 border border-white/10 mb-8 bg-white/[0.02]">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-purple-400" />
          <h2 className="text-sm md:text-base font-bold text-white tracking-tight">
            1-Click Candidate Summary for Hiring Teams
          </h2>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 flex items-center gap-1.5 transition-all cursor-pointer"
          aria-label="Copy candidate executive summary to clipboard"
        >
          {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
          <span>{copied ? "Copied to Clipboard!" : "Copy Summary"}</span>
        </button>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed font-mono bg-black/40 p-4 rounded-xl border border-white/5 whitespace-pre-line select-all">
        {CANDIDATE_SUMMARY}
      </p>
    </div>
  );
}
