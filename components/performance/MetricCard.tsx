import React from "react";
import { PerformanceMetric } from "@/lib/performance";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface Props {
  metric: PerformanceMetric;
}

export default function PerformanceMetricCard({ metric }: Props) {
  return (
    <div className="glass rounded-xl p-5 border border-border hover:border-primary/40 transition-all bg-muted/60">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-mono uppercase text-muted-foreground tracking-wider">
          {metric.category}
        </span>
        {metric.evidence === 'measured' ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--accent-lab)]">
            <CheckCircle2 className="size-3 text-[var(--accent-lab)]" />
            <span>Measured</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--accent-warm)]">
            <AlertCircle className="size-3 text-[var(--accent-warm)]" />
            <span>Budget {metric.target}</span>
          </span>
        )}
      </div>

      <div className="text-2xl md:text-3xl font-black text-ink tracking-tight mb-1">
        {metric.value}
      </div>

      <h4 className="text-xs font-bold text-primary mb-1.5">{metric.name}</h4>

      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
        {metric.description}
      </p>

      <div className="text-[10px] font-mono text-muted-foreground border-t border-border/60 pt-2">
        Source: {metric.source}
      </div>
    </div>
  );
}
