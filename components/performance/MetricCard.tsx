import React from "react";
import { PerformanceMetric } from "@/lib/performance";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface Props {
  metric: PerformanceMetric;
}

export default function PerformanceMetricCard({ metric }: Props) {
  return (
    <div className="glass rounded-xl p-5 border border-white/10 hover:border-purple-500/40 transition-all bg-white/[0.02]">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
          {metric.category}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-300">
          <CheckCircle2 className="size-3 text-emerald-400" />
          <span>Pass ({metric.target})</span>
        </span>
      </div>

      <div className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">
        {metric.value}
      </div>

      <h4 className="text-xs font-bold text-purple-300 mb-1.5">{metric.name}</h4>

      <p className="text-xs text-slate-400 leading-relaxed mb-3">
        {metric.description}
      </p>

      <div className="text-[10px] font-mono text-slate-500 border-t border-white/5 pt-2">
        Source: {metric.source}
      </div>
    </div>
  );
}
