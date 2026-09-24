"use client";

import { copyToClipboard } from "@/lib/clipboard";

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
    const ok = await copyToClipboard(CANDIDATE_SUMMARY);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="glass rounded-2xl p-6 border border-border mb-8 bg-muted/60">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <h2 className="text-sm md:text-base font-bold text-ink tracking-tight">
            1-Click Candidate Summary for Hiring Teams
          </h2>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg border border-primary/40 bg-primary/10 hover:bg-primary/10 text-primary flex items-center gap-1.5 transition-all cursor-pointer"
          aria-label="Copy candidate executive summary to clipboard"
        >
          {copied ? <Check className="size-3.5 text-[var(--accent-lab)]" /> : <Copy className="size-3.5" />}
          <span>{copied ? "Copied to Clipboard!" : "Copy Summary"}</span>
        </button>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed font-mono bg-black/40 p-4 rounded-xl border border-border/60 whitespace-pre-line select-all">
        {CANDIDATE_SUMMARY}
      </p>
    </div>
  );
}
