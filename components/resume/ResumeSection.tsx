import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function ResumeSection({ title, children, className = "" }: Props) {
  return (
    <section className={`mb-6 avoid-break ${className}`}>
      <h2 className="text-sm sm:text-base font-bold tracking-wider text-slate-950 uppercase border-b-2 border-slate-900 pb-1 mb-3.5">
        {title}
      </h2>
      <div className="space-y-4 text-sm leading-relaxed text-slate-800">
        {children}
      </div>
    </section>
  );
}
