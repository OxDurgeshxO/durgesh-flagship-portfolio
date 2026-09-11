import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Gauge, ShieldCheck, Zap } from "lucide-react";
import { MEASURED_METRICS } from "@/lib/performance";
import PerformanceMetricCard from "@/components/performance/MetricCard";
import PerformanceModeToggle from "@/components/performance/PerformanceModeToggle";
import ModeComparison from "@/components/performance/ModeComparison";
import WebGLStats from "@/components/performance/WebGLStats";

export const metadata: Metadata = {
  title: "Performance Center | Durgesh Dutt Sinha",
  description:
    "Measured WebGL, Core Web Vitals, and frontend engineering metrics. Persistent Immersive, Balanced, and Low-Bandwidth mode controls.",
};

export default function PerformancePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 selection:bg-purple-500/30 selection:text-white">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-4 mb-8 border-b border-white/10 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="size-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to Immersive Home
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/recruiter"
              className="text-xs font-mono px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-all"
            >
              👔 Recruiter Fast Track
            </Link>
            <Link
              href="/resume"
              className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition-all"
            >
              📄 HTML Resume
            </Link>
          </div>
        </div>

        {/* Hero Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-3">
            <Gauge className="size-3.5 text-rose-400" />
            <span>Frontend & WebGL Performance Center</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            Engineering Telemetry & Performance Proof
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-3xl leading-relaxed">
            Every feature on this portfolio is engineered with strict performance budgets: Next.js SSR instant first paint, decoupled background Web Workers, and persistent GPU mode controls.
          </p>
        </div>

        {/* Beta Mode Notice Banner */}
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs sm:text-sm text-rose-300 flex items-start sm:items-center gap-3 mb-8">
          <Zap className="h-5 w-5 text-rose-400 shrink-0 mt-0.5 sm:mt-0" />
          <div className="flex-1">
            <span className="font-semibold text-rose-200 uppercase tracking-wider font-mono text-[11px] mr-2">
              [Beta Mode · Telemetry Sandbox]
            </span>
            <span>
              Real-time WebGL memory telemetry, frame-rate probing, and adaptive low-bandwidth switching algorithms are currently in Beta testing and undergoing continuous enhancement.
            </span>
          </div>
        </div>

        {/* Live Hardware Probing */}
        <WebGLStats />

        {/* Runtime Experience Mode Switcher */}
        <PerformanceModeToggle />

        {/* Core Metrics Grid */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white tracking-tight mb-4 flex items-center gap-2">
            <span>📊</span> Measured Core Web Vitals & Production Budgets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MEASURED_METRICS.map((metric) => (
              <PerformanceMetricCard key={metric.name} metric={metric} />
            ))}
          </div>
        </section>

        {/* Mode Matrix Table */}
        <ModeComparison />
      </div>
    </main>
  );
}
