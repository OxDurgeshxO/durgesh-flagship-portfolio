import React from "react";
import { MODE_COMPARISONS } from "@/lib/performance";

export default function ModeComparison() {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-white tracking-tight mb-4">
        Engineering Mode Matrix & Resource Allocation
      </h2>
      <div className="overflow-x-auto rounded-xl border border-white/10 glass">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-slate-300 font-mono">
              <th className="p-3.5">Subsystem Feature</th>
              <th className="p-3.5 text-purple-300">Immersive Mode</th>
              <th className="p-3.5 text-rose-300">Balanced Mode</th>
              <th className="p-3.5 text-emerald-300">Low-Bandwidth Mode</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-400">
            {MODE_COMPARISONS.map((row) => (
              <tr key={row.feature} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-3.5 font-semibold text-white">{row.feature}</td>
                <td className="p-3.5">{row.immersive}</td>
                <td className="p-3.5">{row.balanced}</td>
                <td className="p-3.5 font-mono text-emerald-300">{row.lowBandwidth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
