import React from "react";
import { MODE_COMPARISONS } from "@/lib/performance";

export default function ModeComparison() {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-ink tracking-tight mb-4">
        Engineering Mode Matrix & Resource Allocation
      </h2>
      <div
        className="overflow-x-auto rounded-xl border border-border glass focus:outline-none focus:ring-1 focus:ring-purple-400"
        tabIndex={0}
        role="region"
        aria-label="Engineering Mode Matrix and Resource Allocation"
      >
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-border bg-white/[0.03] text-body font-mono">
              <th className="p-3.5">Subsystem Feature</th>
              <th className="p-3.5 text-primary">Immersive Mode</th>
              <th className="p-3.5 text-secondary">Balanced Mode</th>
              <th className="p-3.5 text-[var(--accent-lab)]">Low-Bandwidth Mode</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-muted-foreground">
            {MODE_COMPARISONS.map((row) => (
              <tr key={row.feature} className="hover:bg-muted/60 transition-colors">
                <td className="p-3.5 font-semibold text-ink">{row.feature}</td>
                <td className="p-3.5">{row.immersive}</td>
                <td className="p-3.5">{row.balanced}</td>
                <td className="p-3.5 font-mono text-[var(--accent-lab)]">{row.lowBandwidth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
