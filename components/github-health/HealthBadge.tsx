import React from 'react';
import { CheckCircle2, Clock, FlaskConical, ShieldCheck, GitPullRequest } from 'lucide-react';

interface StatusBadgeProps {
  status: 'production' | 'active' | 'experimental';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === 'production') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
        <CheckCircle2 className="h-3 w-3" />
        Production-Ready
      </span>
    );
  }
  if (status === 'active') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/20">
        <Clock className="h-3 w-3" />
        Active Development
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/20">
      <FlaskConical className="h-3 w-3" />
      Experimental
    </span>
  );
}

export function CiBadge({ status }: { status: 'passing' | 'running' | 'none' }) {
  if (status === 'passing') {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-950/60 px-2 py-0.5 text-[11px] font-mono text-emerald-300 border border-emerald-500/30">
        <ShieldCheck className="h-3 w-3" />
        CI: Passing
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-2 py-0.5 text-[11px] font-mono text-slate-400 border border-slate-700">
      <GitPullRequest className="h-3 w-3" />
      CI: Running
    </span>
  );
}

export function QualityScoreBadge({ score }: { score: number }) {
  const colorClass =
    score >= 95
      ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
      : score >= 85
      ? 'text-blue-400 border-blue-500/30 bg-blue-500/10'
      : 'text-amber-400 border-amber-500/30 bg-amber-500/10';

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-mono font-bold ${colorClass}`}>
      <span>SCORE</span>
      <span>{score}/100</span>
    </div>
  );
}
