"use client";

import React from "react";
import { Sparkles, Cpu, Layers, Bot } from "lucide-react";
import { RoleCategory, ROLE_DEFINITIONS } from "@/lib/resume-roles";

export type { RoleCategory };
export { ROLE_DEFINITIONS };

interface RoleHighlighterProps {
  activeRole: RoleCategory;
  onRoleChange: (role: RoleCategory) => void;
}

const ROLE_ICONS: Record<RoleCategory, React.ComponentType<{ className?: string }>> = {
  all: Sparkles,
  aiml: Cpu,
  fullstack: Layers,
  agents: Bot,
};

export default function RoleHighlighter({
  activeRole,
  onRoleChange,
}: RoleHighlighterProps) {
  const roles: RoleCategory[] = ["all", "aiml", "fullstack", "agents"];

  return (
    <div className="mb-4 p-3 rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm print:hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>Recruiter Role Lens (ATS Skill Matcher)</span>
          </div>
          <p className="text-xs text-foreground font-medium mt-0.5">
            {ROLE_DEFINITIONS[activeRole].description}
          </p>
        </div>

        {/* Role Toggle Chips */}
        <div className="flex flex-wrap gap-1.5">
          {roles.map((role) => {
            const def = ROLE_DEFINITIONS[role];
            const Icon = ROLE_ICONS[role];
            const isActive = activeRole === role;

            return (
              <button
                key={role}
                type="button"
                onClick={() => onRoleChange(role)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20 ring-1 ring-primary/30"
                    : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                <span>{def.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
