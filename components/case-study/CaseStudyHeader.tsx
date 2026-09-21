"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Sparkles, Calendar, UserCheck } from "lucide-react";
import { CaseStudy } from "@/lib/case-studies";

interface Props {
  caseStudy: CaseStudy;
}

export default function CaseStudyHeader({ caseStudy }: Props) {
  return (
    <header className="mb-12 border-b border-white/10 pb-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="size-3.5 group-hover:-translate-x-1 transition-transform" />
          Back to Featured Projects
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/recruiter"
            className="text-xs font-mono px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-all"
          >
            👔 Recruiter Mode
          </Link>
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-slate-300 mb-4">
        <Sparkles className="size-3 text-rose-400" />
        <span>{caseStudy.category}</span>
        <span className="text-slate-500">•</span>
        <span className="text-purple-300">{caseStudy.badge}</span>
      </div>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
        {caseStudy.title}
      </h1>

      <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-6 font-light">
        {caseStudy.tagline}
      </p>

      {/* Meta Bar */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-t border-white/5 pt-4">
        <div className="flex items-center gap-1.5">
          <UserCheck className="size-3.5 text-purple-400" />
          <span>Role: {caseStudy.role}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="size-3.5 text-rose-400" />
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
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-500 hover:to-rose-400 text-white font-semibold text-xs md:text-sm inline-flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all"
          >
            <ExternalLink className="size-4" />
            <span>Launch Live Production App</span>
          </a>
        )}
        <a
          href={caseStudy.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl glass hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-xs md:text-sm inline-flex items-center gap-2 border border-white/10 transition-all"
        >
          <Github className="size-4" />
          <span>View Source Repository</span>
        </a>
      </div>
    </header>
  );
}
