import React from "react";
import Link from "next/link";
import { ExternalLink, Github, ArrowRight, Trophy, Activity, ShoppingBag } from "lucide-react";
import { CASE_STUDIES } from "@/lib/case-studies";

export default function RecruiterProjects() {
  const projects = [
    {
      ...CASE_STUDIES.roleradar,
      icon: Trophy,
    },
    {
      ...CASE_STUDIES["fitness-platform"],
      icon: Activity,
    },
    {
      ...CASE_STUDIES["marketmatch-ai"],
      icon: ShoppingBag,
    },
  ];

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Top 3 Flagship Engineering Showcases
          </h2>
          <p className="text-xs text-slate-400">
            Selected platforms with full architecture specs, tradeoffs, and verified metrics
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {projects.map((proj) => {
          const Icon = proj.icon;
          return (
            <div
              key={proj.slug}
              className="glass rounded-xl p-5 md:p-6 border border-white/10 hover:border-purple-500/40 transition-all bg-white/[0.02]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className="p-2 rounded-lg bg-white/5 border border-white/10"
                    style={{ color: proj.accent }}
                  >
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {proj.title}
                    </h3>
                    <span className="text-xs font-mono text-purple-300">
                      {proj.category} • {proj.badge}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/work/${proj.slug}`}
                    className="px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 border border-purple-500/30 text-xs font-semibold inline-flex items-center gap-1.5 transition-all"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="size-3" />
                  </Link>
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all"
                      title="Launch Live App"
                    >
                      <ExternalLink className="size-3.5" />
                    </a>
                  )}
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all"
                    title="View GitHub Repository"
                  >
                    <Github className="size-3.5" />
                  </a>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {proj.overview}
              </p>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {proj.metrics.map((m) => (
                  <div key={m.label} className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">{m.label}</div>
                    <div className="text-xs font-bold text-white">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {proj.technologies.slice(0, 5).map((t) => (
                  <span
                    key={t.name}
                    className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-slate-400"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
