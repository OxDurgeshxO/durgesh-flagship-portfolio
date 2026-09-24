"use client";

import { copyToClipboard } from "@/lib/clipboard";
import React, { useState } from "react";
import Link from "next/link";
import { Download, Printer, Copy, Check, ArrowLeft, Palette } from "lucide-react";
import { OWNER } from "@/lib/data";

export type ResumeTheme = "pure-white" | "warm-ivory" | "light-gray";

interface ResumeActionsProps {
  currentTheme?: ResumeTheme;
  onThemeChange?: (theme: ResumeTheme) => void;
}

export default function ResumeActions({
  currentTheme = "pure-white",
  onThemeChange,
}: ResumeActionsProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = async () => {
    const text = `${OWNER.name} — ${OWNER.title}
MCA (AIML) at Sri Balaji University Pune (2025–2027) | UNLOX® AI Fellow | Be10x AI Cohort Member.
Autonomous AI systems, Real-Time MediaPipe (<50ms), Next.js 16, TypeScript, Drizzle ORM, Scikit-Learn.
Email: ${OWNER.email} | GitHub: ${OWNER.github}`;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const themes: { id: ResumeTheme; name: string; bgClass: string; desc: string }[] = [
    { id: "pure-white", name: "Pure White", bgClass: "bg-white border-slate-300", desc: "ATS Gold Standard (Recommended)" },
    { id: "warm-ivory", name: "Warm Ivory", bgClass: "bg-[#FAF9F5] border-stone-300", desc: "Editorial Off-White" },
    { id: "light-gray", name: "Light Gray", bgClass: "bg-[#F8FAFC] border-slate-300", desc: "Modern Minimal" },
  ];

  return (
    <div className="resume-actions-bar bg-slate-900/95 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl mb-8 flex flex-wrap items-center justify-between gap-4 shadow-xl">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          aria-label="Back to Portfolio Home"
        >
          <ArrowLeft className="size-3.5" />
          <span>Home</span>
        </Link>

        <span className="text-white/20">|</span>

        <Link
          href="/recruiter"
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <span>Recruiter Fast Track</span>
        </Link>

        {/* ATS Background Theme Selector */}
        {onThemeChange && (
          <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-white/10">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mr-1">
              <Palette className="size-3 text-purple-400" />
              <span>Theme:</span>
            </span>
            <div className="flex items-center rounded-lg bg-white/5 p-0.5 border border-white/10">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onThemeChange(t.id)}
                  title={`${t.name} - ${t.desc}`}
                  aria-label={`Switch to ${t.name} background theme`}
                  aria-pressed={currentTheme === t.id}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                    currentTheme === t.id
                      ? "bg-white text-slate-900 font-semibold shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className={`size-2.5 rounded-full border border-black/20 ${t.bgClass}`} />
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

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
