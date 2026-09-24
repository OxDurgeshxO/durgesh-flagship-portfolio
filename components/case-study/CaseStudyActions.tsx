"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, FileText, Share2, Check } from "lucide-react";
import { CaseStudy } from "@/lib/case-studies";
import { copyToClipboard } from "@/lib/clipboard";

interface Props {
  caseStudy: CaseStudy;
}

export default function CaseStudyActions({ caseStudy }: Props) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      const ok = await copyToClipboard(window.location.href);
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      }
    }
  };

  return (
    <div className="glass rounded-2xl p-8 border border-border my-12 text-center relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(90deg, transparent, ${caseStudy.accent}, transparent)` }}
      />
      <h3 className="text-xl md:text-2xl font-bold text-ink mb-2">
        Explore More or Review Credentials
      </h3>
      <p className="text-muted-foreground text-xs md:text-sm max-w-lg mx-auto mb-6">
        Ready to see how {caseStudy.title} fits into real-world production engineering?
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleShare}
          className="px-5 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-primary border border-primary/40 font-semibold text-xs md:text-sm inline-flex items-center gap-2 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-400"
          title="Copy direct link to this case study"
          aria-label="Share case study link"
        >
          {copied ? <Check className="size-4 text-[var(--accent-lab)]" /> : <Share2 className="size-4" />}
          <span>{copied ? "Link Copied to Clipboard!" : "Share Case Study"}</span>
        </button>

        {caseStudy.demoUrl && (
          <a
            href={caseStudy.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] hover:from-[var(--gradient-start)] hover:to-rose-400 text-white font-semibold text-xs md:text-sm inline-flex items-center gap-2 shadow-lg shadow-black/20 transition-all focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            <ExternalLink className="size-4" />
            <span>Launch Live App</span>
          </a>
        )}
        <a
          href={caseStudy.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl glass hover:bg-accent text-ink hover:text-ink font-semibold text-xs md:text-sm inline-flex items-center gap-2 border border-border transition-all focus-visible:ring-2 focus-visible:ring-purple-400"
        >
          <Github className="size-4" />
          <span>View Source Code</span>
        </a>
        <Link
          href="/resume"
          className="px-5 py-2.5 rounded-xl glass hover:bg-accent text-ink hover:text-ink font-semibold text-xs md:text-sm inline-flex items-center gap-2 border border-border transition-all focus-visible:ring-2 focus-visible:ring-purple-400"
        >
          <FileText className="size-4" />
          <span>View Full Resume</span>
        </Link>
        <Link
          href="/#projects"
          className="px-5 py-2.5 rounded-xl glass hover:bg-accent text-muted-foreground hover:text-ink font-mono text-xs inline-flex items-center gap-2 border border-border transition-all focus-visible:ring-2 focus-visible:ring-purple-400"
        >
          <ArrowLeft className="size-3.5" />
          <span>All Projects</span>
        </Link>
      </div>
    </div>
  );
}
