import React from 'react';
import { CheckCircle2, Clock, FlaskConical, ShieldCheck, GitPullRequest, Calendar } from 'lucide-react';

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
  if (status === 'running') {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-2 py-0.5 text-[11px] font-mono text-slate-400 border border-slate-700">
        <GitPullRequest className="h-3 w-3" />
        CI: Running
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-2 py-0.5 text-[11px] font-mono text-slate-400 border border-slate-800">
      Verified Repo
    </span>
  );
}

export function AuditDateBadge({ date }: { date: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/20 px-2.5 py-1 text-xs font-mono text-muted-foreground">
      <Calendar className="h-3 w-3" />
      <span>as of {date}</span>
    </div>
  );
}
