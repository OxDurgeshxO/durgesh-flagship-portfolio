import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function ResumeSection({ title, children, className = "" }: Props) {
  return (
    <section className={`mb-6 avoid-break ${className}`}>
      <h2 className="text-xs font-mono font-bold tracking-widest text-purple-600 dark:text-purple-300 uppercase border-b border-slate-300 dark:border-white/10 pb-1 mb-3">
        {title}
      </h2>
      <div className="space-y-4 text-xs md:text-sm text-slate-800 dark:text-slate-200">
        {children}
      </div>
    </section>
  );
}
