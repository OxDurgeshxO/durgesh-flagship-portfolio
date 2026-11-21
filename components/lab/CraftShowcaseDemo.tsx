'use client';

import React, { useState } from 'react';
import { Sparkles, Sliders, Layers, Eye, Cpu, Radio } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlassCard';
import { ThinkingOrb } from '@/components/ThinkingOrb';

export function CraftShowcaseDemo() {
  const [orbStatus, setOrbStatus] = useState<'thinking' | 'listening' | 'speaking' | 'idle'>('thinking');
  const [glowColor, setGlowColor] = useState<string>('rgba(6, 182, 212, 0.25)');

  const glowPresets = [
    { name: 'Cyan Telemetry', color: 'rgba(6, 182, 212, 0.25)', class: 'bg-cyan-500' },
    { name: 'Purple AI Core', color: 'rgba(168, 85, 247, 0.25)', class: 'bg-purple-500' },
    { name: 'Emerald Nominal', color: 'rgba(34, 197, 94, 0.25)', class: 'bg-emerald-500' },
    { name: 'Amber Warning', color: 'rgba(245, 158, 11, 0.25)', class: 'bg-amber-500' },
  ];

  return (
    <div className="rounded-2xl border border-border/80 bg-card/60 p-6 md:p-8 space-y-8 backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <Sparkles className="h-4 w-4" />
            <span>Archive/v2 Design Craft System</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-cyan-400">
              <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
              BETA • SHADERS & MOTION
            </span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mt-1">Liquid Glass & Harmonic Thinking Orb Showcase</h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Interactive real-time 3D spring tilt physics, specular refraction shaders, and autonomous AI state telemetry breathing orbs preserved from `archive/v2`.
          </p>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-mono text-purple-300">
            <Layers className="size-3.5" />
            <span>Framer Motion Physics</span>
          </span>
        </div>
      </div>

      {/* Interactive Controls Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/40 p-4 rounded-xl border border-border/60">
        {/* Thinking Orb State Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Radio className="size-3.5 text-primary" />
              <span>Thinking Orb State:</span>
            </span>
            <span className="text-[11px] font-mono uppercase text-muted-foreground">Status: {orbStatus}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['thinking', 'listening', 'speaking', 'idle'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setOrbStatus(st)}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer capitalize ${
                  orbStatus === st
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'bg-background hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Glow Color Selector */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Sliders className="size-3.5 text-cyan-400" />
            <span>Liquid Refraction Glow Tint:</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {glowPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setGlowColor(preset.color)}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  glowColor === preset.color
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'bg-background hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60'
                }`}
              >
                <span className={`size-2 rounded-full ${preset.class}`} />
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Playground Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Card 1: Interactive Tilt & Refraction */}
        <LiquidGlassCard glowColor={glowColor} className="flex flex-col justify-between h-full">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400 border border-cyan-500/20">
                <Eye className="size-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">3D Specular Liquid Glass Card</h3>
                <p className="text-xs text-muted-foreground font-mono">Move mouse over card to verify dynamic 3D tilt</p>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Features continuous mouse-tracking spring physics with normalized center coordinates ($[-0.5, 0.5]$), driving Framer Motion springs configured with <code className="text-cyan-300">stiffness: 150, damping: 20</code>.
            </p>

            <div className="rounded-lg bg-black/40 p-3 border border-white/10 font-mono text-[11px] text-zinc-400 space-y-1">
              <div>• Surface: <span className="text-zinc-200">rgba(255, 255, 255, 0.03)</span></div>
              <div>• Backdrop Filter: <span className="text-zinc-200">blur(24px)</span></div>
              <div>• Dynamic Specular Spot: <span className="text-cyan-400">Radial Gradient 600px</span></div>
              <div>• Max Rotation: <span className="text-cyan-400">±12° Tilt</span></div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>Hardware Accelerated</span>
            <span className="text-cyan-400 font-bold">preserve-3d</span>
          </div>
        </LiquidGlassCard>

        {/* Card 2: Interactive Thinking Orb */}
        <LiquidGlassCard glowColor={glowColor} className="flex flex-col justify-between h-full">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400 border border-purple-500/20">
                <Cpu className="size-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Harmonic Reactive Thinking Orb</h3>
                <p className="text-xs text-muted-foreground font-mono">Active State: {orbStatus.toUpperCase()}</p>
              </div>
            </div>

            {/* Orb Centered Render */}
            <div className="py-8 flex items-center justify-center">
              <ThinkingOrb status={orbStatus} size={130} showBetaBadge={true} />
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed text-center">
              Particle harmonic pulsing visualizer with 3-second ambient aura breathing and 8-second continuous angular rotation.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>Current Aura: <span className="capitalize font-bold text-purple-300">{orbStatus}</span></span>
            <span className="text-purple-400 font-bold">Infinite Loop</span>
          </div>
        </LiquidGlassCard>
      </div>
    </div>
  );
}
