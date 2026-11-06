"use client";

import React, { useState } from "react";
import {
  Layers,
  Terminal,
  ChevronDown,
  ChevronUp,
  Cpu,
  Database,
  Server,
  Globe,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
} from "lucide-react";
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
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const handleZoomIn = () => setZoomLevel((z) => Math.min(1.5, Number((z + 0.15).toFixed(2))));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.75, Number((z - 0.15).toFixed(2))));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div
      className={`glass rounded-2xl p-6 md:p-8 border border-border my-8 transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-4 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-xl shadow-2xl p-6 md:p-10 border-primary/40"
          : "relative"
      }`}
    >
      {/* Header with Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl border border-border bg-muted"
            style={{ color: accentColor }}
          >
            <Layers className="size-5" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-ink tracking-tight flex items-center gap-2">
              <span>{title} Architecture & Data Flow</span>
              {isFullscreen && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                  Expanded View
                </span>
              )}
            </h3>
            <p className="text-xs text-muted-foreground">
              Interactive structural nodes & deterministic processing sequence
            </p>
          </div>
        </div>

        {/* Viewport Action Controls */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {/* Zoom Controls */}
          <div className="flex items-center bg-muted/80 border border-border/80 rounded-lg p-0.5 text-xs font-mono">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.75}
              aria-label="Zoom Out Architecture Diagram"
              className="p-1.5 hover:bg-background/80 rounded text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
            >
              <ZoomOut className="size-3.5" />
            </button>
            <span className="px-2 text-[11px] font-bold text-foreground min-w-[42px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 1.5}
              aria-label="Zoom In Architecture Diagram"
              className="p-1.5 hover:bg-background/80 rounded text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
            >
              <ZoomIn className="size-3.5" />
            </button>
            {zoomLevel !== 1 && (
              <button
                onClick={handleResetZoom}
                aria-label="Reset Zoom"
                className="p-1.5 hover:bg-background/80 rounded text-muted-foreground hover:text-foreground border-l border-border/60 transition-colors"
              >
                <RotateCcw className="size-3.5" />
              </button>
            )}
          </div>

          {/* Fullscreen Expand Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            aria-label={isFullscreen ? "Exit Fullscreen" : "Expand Fullscreen Architecture"}
            className="p-2 rounded-lg border border-border bg-muted/80 hover:bg-accent text-body transition-colors"
          >
            {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </button>

          {/* ASCII View Toggle */}
          {diagramAscii && (
            <button
              onClick={() => setShowAscii(!showAscii)}
              className="text-xs font-mono px-3 py-1.5 rounded-lg border border-border bg-muted hover:bg-accent text-body flex items-center gap-1.5 transition-all cursor-pointer"
              aria-expanded={showAscii}
              aria-label="Toggle raw ASCII architecture schematic"
            >
              <Terminal className="size-3.5 text-secondary" />
              <span className="hidden sm:inline">{showAscii ? "Hide ASCII" : "Raw ASCII"}</span>
              {showAscii ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
            </button>
          )}
        </div>
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

      {/* Zoomable Viewport Container */}
      <div
        className="transition-transform duration-200 origin-top-left"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
      >
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
    </div>
  );
}
