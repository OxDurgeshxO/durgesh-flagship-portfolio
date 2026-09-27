"use client";

import React from "react";
import Link from "next/link";
import { Download, FileText, ArrowRight, CheckCircle2, Sparkles, MapPin, Briefcase, Eye, X } from "lucide-react";
import { OWNER } from "@/lib/data";

export default function RecruiterHero() {
  const [previewOpen, setPreviewOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewOpen(false);
    };
    if (previewOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewOpen]);
  return (
    <div className="border-b border-border pb-8 mb-8">
      {/* Top Breadcrumb & Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/30">
            <Sparkles className="size-3 text-secondary" />
            <span>Recruiter & Hiring Manager Fast Track</span>
          </div>
        </div>
        <Link
          href="/"
          className="text-xs font-mono text-muted-foreground hover:text-ink flex items-center gap-1.5 transition-colors"
        >
          <span>Switch to 3D Immersive Portfolio</span>
          <ArrowRight className="size-3 text-primary" />
        </Link>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight mb-3">
        {OWNER.name}
      </h1>

      <p className="text-lg md:text-xl font-medium text-primary mb-3">
        {OWNER.title}
      </p>

      {/* Value proposition */}
      <p className="text-body text-sm md:text-base leading-relaxed max-w-3xl mb-6">
        MCA (AIML) scholar at Sri Balaji University Pune building production-grade AI systems, multi-modal computer vision pipelines, and resilient full-stack web platforms with sub-50ms inference.
      </p>

      {/* Target Roles & Meta Chips */}
      <div className="flex flex-wrap gap-2.5 mb-6">
        <span className="px-3 py-1 rounded-lg bg-muted border border-border text-xs font-mono text-ink flex items-center gap-1.5">
          <Briefcase className="size-3.5 text-primary" /> Target: AIML Engineer • GenAI Developer • Full-Stack Architect
        </span>
        <span className="px-3 py-1 rounded-lg bg-muted border border-border text-xs font-mono text-ink flex items-center gap-1.5">
          <MapPin className="size-3.5 text-secondary" /> Pune, Maharashtra, India (Open to Relocation & Remote)
        </span>
        <span className="px-3 py-1 rounded-lg bg-[var(--accent-lab-bg)] border border-emerald-500/20 text-xs font-mono text-[var(--accent-lab)] flex items-center gap-1.5">
          <CheckCircle2 className="size-3.5" /> Available Immediately for 2026 Opportunities
        </span>
      </div>

      {/* High-Priority CTAs (Above the fold) */}
      <div className="flex flex-wrap items-center gap-3">
        <a
          href="/resume.pdf"
          download="Durgesh_Dutt_Sinha_Resume.pdf"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] hover:from-[var(--gradient-start)] hover:to-rose-400 text-white font-semibold text-xs md:text-sm inline-flex items-center gap-2 shadow-lg shadow-purple-500/25 transition-all cursor-pointer"
        >
          <Download className="size-4" />
          <span>Download PDF Resume (ATS Optimized)</span>
        </a>

        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          className="px-4 py-2.5 rounded-xl glass hover:bg-accent text-primary hover:text-ink font-semibold text-xs md:text-sm inline-flex items-center gap-2 border border-primary/40 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-400"
          title="Open in-page PDF preview modal"
        >
          <Eye className="size-4 text-primary" />
          <span>Quick Preview PDF</span>
        </button>

        <Link
          href="/resume"
          className="px-5 py-2.5 rounded-xl glass hover:bg-accent text-ink hover:text-ink font-semibold text-xs md:text-sm inline-flex items-center gap-2 border border-border transition-all"
        >
          <FileText className="size-4" />
          <span>View HTML Resume</span>
        </Link>

        <Link
          href="/performance"
          className="px-4 py-2 rounded-xl text-xs font-mono text-muted-foreground hover:text-ink border border-border/60 hover:border-border-strong transition-all"
        >
          ⚡ Performance Center
        </Link>
      </div>
      {/* Inline PDF Preview Modal */}
      {previewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Verified ATS Resume Preview"
          onClick={() => setPreviewOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--overlay-scrim)] backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-card border border-border rounded-2xl p-4 shadow-2xl flex flex-col h-[85vh]"
          >
            <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
              <div className="flex items-center gap-3 text-sm font-bold text-ink">
                <FileText className="size-4 text-primary" />
                <span>Verified ATS Resume Preview</span>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-normal text-primary hover:text-ink underline ml-2"
                >
                  Open in New Tab ↗
                </a>
              </div>
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                className="p-1.5 rounded-lg bg-muted hover:bg-accent text-muted-foreground hover:text-ink transition-colors cursor-pointer"
                aria-label="Close preview (Escape)"
              >
                <X className="size-4" />
              </button>
            </div>
            <iframe
              src="/resume.pdf#toolbar=0"
              className="w-full flex-1 rounded-xl bg-white border-0"
              title="Resume Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
}
