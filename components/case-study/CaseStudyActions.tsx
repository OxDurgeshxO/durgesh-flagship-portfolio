import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, FileText, Sparkles } from "lucide-react";
import { CaseStudy } from "@/lib/case-studies";

interface Props {
  caseStudy: CaseStudy;
}

export default function CaseStudyActions({ caseStudy }: Props) {
  return (
    <div className="glass rounded-2xl p-8 border border-white/10 my-12 text-center relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(90deg, transparent, ${caseStudy.accent}, transparent)` }}
      />
      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
        Explore More or Review Credentials
      </h3>
      <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto mb-6">
        Ready to see how {caseStudy.title} fits into real-world production engineering?
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {caseStudy.demoUrl && (
          <a
            href={caseStudy.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-500 hover:to-rose-400 text-white font-semibold text-xs md:text-sm inline-flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all"
          >
            <ExternalLink className="size-4" />
            <span>Launch Live App</span>
          </a>
        )}
        <a
          href={caseStudy.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl glass hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-xs md:text-sm inline-flex items-center gap-2 border border-white/10 transition-all"
        >
          <Github className="size-4" />
          <span>View Source Code</span>
        </a>
        <Link
          href="/resume"
          className="px-5 py-2.5 rounded-xl glass hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-xs md:text-sm inline-flex items-center gap-2 border border-white/10 transition-all"
        >
          <FileText className="size-4" />
          <span>View Full Resume</span>
        </Link>
        <Link
          href="/#projects"
          className="px-5 py-2.5 rounded-xl glass hover:bg-white/10 text-slate-400 hover:text-white font-mono text-xs inline-flex items-center gap-2 border border-white/10 transition-all"
        >
          <ArrowLeft className="size-3.5" />
          <span>All Projects</span>
        </Link>
      </div>
    </div>
  );
}
