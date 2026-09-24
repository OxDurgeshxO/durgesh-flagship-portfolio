"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Sparkles, Calendar, UserCheck, Clock } from "lucide-react";
import { CaseStudy } from "@/lib/case-studies";

interface Props {
  caseStudy: CaseStudy;
}

export default function CaseStudyHeader({ caseStudy }: Props) {
  return (
    <header className="mb-12 border-b border-border pb-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-ink transition-colors group"
        >
          <ArrowLeft className="size-3.5 group-hover:-translate-x-1 transition-transform" />
          Back to Featured Projects
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/recruiter"
            className="text-xs font-mono px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary hover:bg-primary/10 transition-all"
          >
            👔 Recruiter Mode
          </Link>
        </div>
      </div>

            <div className="flex flex-wrap items-center gap-2.5 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted text-xs font-mono text-body">
          <Sparkles className="size-3 text-secondary" />
          <span>{caseStudy.category}</span>
          <span className="text-muted-foreground">&middot;</span>
          <span className="text-primary">{caseStudy.badge}</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs font-mono text-primary">
          <Clock className="size-3 text-primary" />
          <span>~5 min technical read</span>
        </div>
      </div>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight mb-4">
        {caseStudy.title}
      </h1>

      <p className="text-lg md:text-xl text-body max-w-3xl leading-relaxed mb-6 font-light">
        {caseStudy.tagline}
      </p>

      {/* Meta Bar */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground border-t border-border/60 pt-4">
        <div className="flex items-center gap-1.5">
          <UserCheck className="size-3.5 text-primary" />
          <span>Role: {caseStudy.role}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="size-3.5 text-secondary" />
          <span>Timeline: {caseStudy.timeline}</span>
        </div>
      </div>

      {/* Direct Action Links */}
      <div className="flex flex-wrap items-center gap-3 mt-6">
        {caseStudy.demoUrl && (
          <a
            href={caseStudy.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] hover:from-[var(--gradient-start)] hover:to-rose-400 text-white font-semibold text-xs md:text-sm inline-flex items-center gap-2 shadow-lg shadow-black/20 transition-all"
          >
            <ExternalLink className="size-4" />
            <span>Launch Live Production App</span>
          </a>
        )}
        <a
          href={caseStudy.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl glass hover:bg-accent text-ink hover:text-ink font-semibold text-xs md:text-sm inline-flex items-center gap-2 border border-border transition-all"
        >
          <Github className="size-4" />
          <span>View Source Repository</span>
        </a>
      </div>
    </header>
  );
}
