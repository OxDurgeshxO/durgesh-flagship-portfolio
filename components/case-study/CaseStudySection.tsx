import React from "react";

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function CaseStudySection({ title, subtitle, children, icon }: Props) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        {icon && <div className="text-purple-400">{icon}</div>}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {title}
          </h2>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="text-slate-300 text-sm md:text-base leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
}
