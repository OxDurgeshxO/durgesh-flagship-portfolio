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
          className="px-3 py-1 rounded-xl text-xs font-mono border border-border bg-muted text-ink hover:border-primary/40 hover:text-ink transition-all flex items-center gap-1.5"
        >
          <span className="size-1.5 rounded-full bg-purple-400" />
          <span className="font-semibold">{tech.name}</span>
          <span className="text-[10px] text-muted-foreground">({tech.category})</span>
        </span>
      ))}
    </div>
  );
}
