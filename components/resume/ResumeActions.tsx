"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Printer, Copy, Check, ArrowLeft, Sparkles } from "lucide-react";
import { OWNER } from "@/lib/data";

export default function ResumeActions() {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = async () => {
    const text = `${OWNER.name} — ${OWNER.title}
MCA (AIML) at Sri Balaji University Pune (2025–2027) | UNLOX® AI Fellow | Be10x AI Cohort Member.
Autonomous AI systems, Real-Time MediaPipe (<50ms), Next.js 16, TypeScript, Drizzle ORM, Scikit-Learn.
Email: ${OWNER.email} | GitHub: ${OWNER.github}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="resume-actions-bar bg-slate-900/90 backdrop-blur-md border border-white/10 p-3 rounded-2xl mb-8 flex flex-wrap items-center justify-between gap-3 shadow-xl">
      <Link
        href="/recruiter"
        className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        <span>Recruiter Fast Track</span>
      </Link>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleCopySummary}
          className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
        >
          {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
          <span>{copied ? "Copied!" : "Copy Summary"}</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Printer className="size-3.5" />
          <span>Print / Save PDF</span>
        </button>

        <a
          href="/resume.pdf"
          download="Durgesh_Dutt_Sinha_Resume.pdf"
          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-500 hover:to-rose-400 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-purple-500/20 transition-all cursor-pointer"
        >
          <Download className="size-3.5" />
          <span>Official PDF</span>
        </a>
      </div>
    </div>
  );
}
