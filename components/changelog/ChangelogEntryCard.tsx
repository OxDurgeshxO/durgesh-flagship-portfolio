import React from 'react';
import { GitCommit, Tag, CheckCircle2, ArrowRight, AlertTriangle, Wrench, Trophy } from 'lucide-react';
import { ChangelogEntry } from '@/lib/changelog';

interface Props {
  entry: ChangelogEntry;
}

export function ChangelogEntryCard({ entry }: Props) {
  const categoryColor = {
    architecture: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    aiml: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    performance: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    security: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    cicd: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
  }[entry.category];

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-md hover:shadow-xl hover:border-primary/40 transition-all duration-300 space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-lg bg-primary/10 px-3 py-1 text-sm font-mono font-bold text-primary border border-primary/20">
            {entry.version}
          </span>
          <span className={`rounded-lg px-2.5 py-1 text-xs font-mono font-semibold uppercase border ${categoryColor}`}>
            {entry.category}
          </span>
          <span className="text-xs text-muted-foreground font-mono">{entry.date}</span>
        </div>

        {entry.commitSha && (
          <div className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors">
            <GitCommit className="h-3.5 w-3.5" />
            <span>{entry.commitSha}</span>
          </div>
        )}
      </div>

      {/* Release Title & Summary */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{entry.releaseName}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{entry.summary}</p>
      </div>

      {/* Problem - Implementation - Result Structured Engineering Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Problem */}
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-rose-400 uppercase tracking-wider font-mono">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
            <span>Problem</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">{entry.problem}</p>
        </div>

        {/* Implementation */}
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-blue-400 uppercase tracking-wider font-mono">
            <Wrench className="h-3.5 w-3.5 shrink-0" />
            <span>Implementation</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">{entry.implementation}</p>
        </div>

        {/* Result */}
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-emerald-400 uppercase tracking-wider font-mono">
            <Trophy className="h-3.5 w-3.5 shrink-0" />
            <span>Quantified Result</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">{entry.result}</p>
        </div>
      </div>

      {/* Key Highlights */}
      <div className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-2">
        <div className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono">
          Shipped Features & Architectural Enhancements:
        </div>
        <ul className="space-y-1.5">
          {entry.highlights.map((h, i) => (
            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 pt-2">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground border border-border/40"
          >
            <Tag className="h-2.5 w-2.5" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
