import React from "react";

interface Props {
  label: string;
  value: string;
  detail: string;
  accentColor?: string;
}

export default function MetricCard({ label, value, detail, accentColor = "#a78bfa" }: Props) {
  return (
    <div className="glass rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all">
      <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
        {label}
      </div>
      <div
        className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2"
        style={{ color: accentColor }}
      >
        {value}
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">{detail}</p>
    </div>
  );
}
