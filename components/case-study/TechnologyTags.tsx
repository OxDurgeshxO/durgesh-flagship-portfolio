import React from "react";

interface Props {
  technologies: { name: string; category: string }[];
}

export default function TechnologyTags({ technologies }: Props) {
  return (
    <div className="flex flex-wrap gap-2.5 my-4">
      {technologies.map((tech) => (
        <span
          key={tech.name}
          className="px-3 py-1 rounded-xl text-xs font-mono border border-white/10 bg-white/5 text-slate-200 hover:border-purple-500/40 hover:text-white transition-all flex items-center gap-1.5"
        >
          <span className="size-1.5 rounded-full bg-purple-400" />
          <span className="font-semibold">{tech.name}</span>
          <span className="text-[10px] text-slate-500">({tech.category})</span>
        </span>
      ))}
    </div>
  );
}
