"use client";

import React, { useState } from "react";
import { Layers, Terminal, ChevronDown, ChevronUp, Cpu, Database, Server, Globe } from "lucide-react";
import { ArchitectureNode } from "@/lib/case-studies";

interface Props {
  title: string;
  nodes: ArchitectureNode[];
  dataFlowSteps: string[];
  diagramAscii?: string;
  accentColor?: string;
}

export default function ArchitectureDiagram({
  title,
  nodes,
  dataFlowSteps,
  diagramAscii,
  accentColor = "#a78bfa",
}: Props) {
  const [showAscii, setShowAscii] = useState(false);

  const getNodeIcon = (type: ArchitectureNode["type"]) => {
    switch (type) {
      case "client":
        return Globe;
      case "storage":
        return Database;
      case "engine":
        return Cpu;
      case "service":
        return Server;
      default:
        return Layers;
    }
  };

  return (
    <div className="glass rounded-2xl p-6 md:p-8 border border-border my-8">
      <div className="flex items-center justify-between gap-4 mb-6 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl border border-border bg-muted"
            style={{ color: accentColor }}
          >
            <Layers className="size-5" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-ink tracking-tight">
              {title} Architecture & Data Flow
            </h3>
            <p className="text-xs text-muted-foreground">
              Interactive structural nodes & deterministic processing sequence
            </p>
          </div>
        </div>

        {diagramAscii && (
          <button
            onClick={() => setShowAscii(!showAscii)}
            className="text-xs font-mono px-3 py-1.5 rounded-lg border border-border bg-muted hover:bg-accent text-body flex items-center gap-1.5 transition-all cursor-pointer"
            aria-expanded={showAscii}
            aria-label="Toggle raw ASCII architecture schematic"
          >
            <Terminal className="size-3.5 text-secondary" />
            <span>{showAscii ? "Hide ASCII" : "Raw ASCII"}</span>
            {showAscii ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
          </button>
        )}
      </div>

      {/* Raw ASCII schematic if toggled */}
      {showAscii && diagramAscii && (
        <div
          className="mb-6 p-4 rounded-xl bg-black/60 border border-primary/30 font-mono text-xs text-primary overflow-x-auto whitespace-pre leading-relaxed focus:outline-none focus:ring-1 focus:ring-purple-400"
          tabIndex={0}
          role="region"
          aria-label="Raw ASCII architecture schematic"
        >
          {diagramAscii.trim()}
        </div>
      )}

      {/* Visual System Nodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {nodes.map((node, i) => {
          const Icon = getNodeIcon(node.type);
          return (
            <div
              key={node.name}
              className="p-4 rounded-xl bg-white/[0.03] border border-border/60 hover:border-border-strong transition-all group"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span
                  className="p-1.5 rounded-lg bg-muted"
                  style={{ color: accentColor }}
                >
                  <Icon className="size-4" />
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground uppercase tracking-wider">
                  {node.type}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-ink mb-1 group-hover:text-primary transition-colors">
                {i + 1}. {node.name}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {node.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Step-by-Step Data Flow */}
      <div className="rounded-xl bg-black/30 p-5 border border-border/60">
        <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
          <span>⚡</span> Deterministic Execution Pipeline (End-to-End Flow)
        </h4>
        <ol className="space-y-3">
          {dataFlowSteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-body">
              <span
                className="size-5 rounded-full flex items-center justify-center shrink-0 font-mono text-[10px] font-bold mt-0.5 border"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                {idx + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
