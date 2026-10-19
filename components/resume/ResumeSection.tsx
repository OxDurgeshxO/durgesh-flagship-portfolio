import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function ResumeSection({ title, children, className = "" }: Props) {
  return (
    <section className={`mb-2.5 sm:mb-3 avoid-break ${className}`}>
      <h2 className="text-xs sm:text-[12px] font-bold tracking-wider text-slate-950 uppercase border-b border-slate-900 pb-0.5 mb-1.5 flex items-center justify-between">
        <span>{title}</span>
      </h2>
      <div className="space-y-1.5 text-xs sm:text-[12.5px] leading-normal text-slate-800">
        {children}
      </div>
    </section>
  );
}
