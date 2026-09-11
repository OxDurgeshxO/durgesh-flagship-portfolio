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
    <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 my-8">
      <div className="flex items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl border border-white/10 bg-white/5"
            style={{ color: accentColor }}
          >
            <Layers className="size-5" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
              {title} Architecture & Data Flow
            </h3>
            <p className="text-xs text-slate-400">
              Interactive structural nodes & deterministic processing sequence
            </p>
          </div>
        </div>

        {diagramAscii && (
          <button
            onClick={() => setShowAscii(!showAscii)}
            className="text-xs font-mono px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
            aria-expanded={showAscii}
            aria-label="Toggle raw ASCII architecture schematic"
          >
            <Terminal className="size-3.5 text-rose-400" />
            <span>{showAscii ? "Hide ASCII" : "Raw ASCII"}</span>
            {showAscii ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
          </button>
        )}
      </div>

      {/* Raw ASCII schematic if toggled */}
      {showAscii && diagramAscii && (
        <div className="mb-6 p-4 rounded-xl bg-black/60 border border-purple-500/20 font-mono text-xs text-purple-300 overflow-x-auto whitespace-pre leading-relaxed">
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
              className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all group"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span
                  className="p-1.5 rounded-lg bg-white/5"
                  style={{ color: accentColor }}
                >
                  <Icon className="size-4" />
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-400 uppercase tracking-wider">
                  {node.type}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                {i + 1}. {node.name}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {node.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Step-by-Step Data Flow */}
      <div className="rounded-xl bg-black/30 p-5 border border-white/5">
        <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
          <span>⚡</span> Deterministic Execution Pipeline (End-to-End Flow)
        </h4>
        <ol className="space-y-3">
          {dataFlowSteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-300">
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
