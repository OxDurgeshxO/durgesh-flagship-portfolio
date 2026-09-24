import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function ResumeSection({ title, children, className = "" }: Props) {
  return (
    <section className={`mb-6 avoid-break ${className}`}>
      <h2 className="text-xs font-mono font-bold tracking-wider text-slate-900 uppercase border-b-2 border-slate-300 pb-1 mb-3">
        {title}
      </h2>
      <div className="space-y-4 text-xs md:text-sm text-slate-800">
        {children}
      </div>
    </section>
  );
}
