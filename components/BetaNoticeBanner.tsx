import React from 'react';
import { Sparkles, FlaskConical, AlertCircle } from 'lucide-react';

interface BetaNoticeBannerProps {
  featureName?: string;
  customDescription?: string;
  className?: string;
}

export default function BetaNoticeBanner({
  featureName,
  customDescription,
  className = '',
}: BetaNoticeBannerProps) {
  return (
    <div
      className={`rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-rose-500/10 p-4 text-xs sm:text-sm text-amber-200/90 shadow-lg shadow-amber-500/5 backdrop-blur-xl flex items-start sm:items-center gap-3.5 ${className}`}
      role="note"
      aria-label="Beta Feature Notice"
    >
      <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 shadow-sm shadow-amber-500/20">
        <Sparkles className="size-4 animate-pulse" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-mono font-bold text-[10px] sm:text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>BETA FEATURE • TO BE IMPROVISED SOON</span>
          </span>
          {featureName && (
            <span className="text-[11px] font-mono text-purple-300 font-semibold hidden sm:inline">
              [{featureName}]
            </span>
          )}
        </div>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          {customDescription ||
            'This feature is currently in active Beta testing on the v2 architecture branch. Workflows, live telemetry, and mathematical heuristics are actively being refined and will be continuously improvised soon.'}
        </p>
      </div>
    </div>
  );
}
