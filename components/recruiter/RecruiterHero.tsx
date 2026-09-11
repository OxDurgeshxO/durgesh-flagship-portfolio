"use client";

import React from "react";
import Link from "next/link";
import { Download, FileText, ArrowRight, CheckCircle2, Sparkles, MapPin, Briefcase } from "lucide-react";
import { OWNER } from "@/lib/data";

export default function RecruiterHero() {
  return (
    <div className="border-b border-white/10 pb-8 mb-8">
      {/* Top Breadcrumb & Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
            <Sparkles className="size-3 text-rose-400" />
            <span>Recruiter & Hiring Manager Fast Track</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-mono font-semibold">
            Beta Mode · Actively Enhanced
          </span>
        </div>
        <Link
          href="/"
          className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <span>Switch to 3D Immersive Portfolio</span>
          <ArrowRight className="size-3 text-purple-400" />
        </Link>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
        {OWNER.name}
      </h1>

      <p className="text-lg md:text-xl font-medium text-purple-300 mb-3">
        {OWNER.title}
      </p>

      {/* Value proposition */}
      <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl mb-6">
        MCA (AIML) scholar at Sri Balaji University Pune building production-grade AI systems, multi-modal computer vision pipelines, and resilient full-stack web platforms with sub-50ms inference.
      </p>

      {/* Target Roles & Meta Chips */}
      <div className="flex flex-wrap gap-2.5 mb-6">
        <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200 flex items-center gap-1.5">
          <Briefcase className="size-3.5 text-purple-400" /> Target: AIML Engineer • GenAI Developer • Full-Stack Architect
        </span>
        <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-200 flex items-center gap-1.5">
          <MapPin className="size-3.5 text-rose-400" /> Pune, Maharashtra, India (Open to Relocation & Remote)
        </span>
        <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300 flex items-center gap-1.5">
          <CheckCircle2 className="size-3.5" /> Available Immediately for 2026 Opportunities
        </span>
      </div>

      {/* High-Priority CTAs (Above the fold) */}
      <div className="flex flex-wrap items-center gap-3">
        <a
          href="/resume.pdf"
          download="Durgesh_Dutt_Sinha_Resume.pdf"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-500 hover:to-rose-400 text-white font-semibold text-xs md:text-sm inline-flex items-center gap-2 shadow-lg shadow-purple-500/25 transition-all cursor-pointer"
        >
          <Download className="size-4" />
          <span>Download PDF Resume (ATS Optimized)</span>
        </a>

        <Link
          href="/resume"
          className="px-5 py-2.5 rounded-xl glass hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-xs md:text-sm inline-flex items-center gap-2 border border-white/10 transition-all"
        >
          <FileText className="size-4" />
          <span>View HTML Resume</span>
        </Link>

        <Link
          href="/performance"
          className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white border border-white/5 hover:border-white/20 transition-all"
        >
          ⚡ Performance Center
        </Link>
      </div>
    </div>
  );
}
