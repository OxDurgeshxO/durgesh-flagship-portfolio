import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Gauge, Zap } from "lucide-react";
import { PERFORMANCE_METRICS, PERFORMANCE_REVIEW_DATE } from "@/lib/performance";
import PerformanceMetricCard from "@/components/performance/MetricCard";
import PerformanceModeToggle from "@/components/performance/PerformanceModeToggle";
import ModeComparison from "@/components/performance/ModeComparison";
import WebGLStats from "@/components/performance/WebGLStats";

export const metadata: Metadata = {
  title: "Performance Center | Durgesh Dutt Sinha",
  description:
    "Core Web Vitals budgets and the measured production build footprint, plus persistent Immersive, Balanced, and Low-Bandwidth experience mode controls.",
  alternates: {
    canonical: "/performance",
  },
};

export default function PerformancePage() {
  return (
    <main id="main-content" className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 selection:bg-purple-500/30 selection:text-white">
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
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
              <Gauge className="size-3.5 text-rose-400" />
              <span>Frontend & WebGL Performance Center</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              Reviewed: {PERFORMANCE_REVIEW_DATE}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            Performance Budgets &amp; Build Footprint
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-3xl leading-relaxed">
            Every feature on this portfolio is engineered against strict performance budgets. Figures on this page are labelled with whether they were actually observed: the build footprint comes from the production build output, while the Core Web Vitals entries are declared budgets that no committed tool has yet verified.
          </p>
        </div>

        {/* Live Hardware Probing */}
        <WebGLStats />

        {/* Runtime Experience Mode Switcher */}
        <PerformanceModeToggle />

        {/* Core Metrics Grid */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white tracking-tight mb-4 flex items-center gap-2">
            <span>📊</span> Core Web Vitals Budgets &amp; Measured Build Footprint
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PERFORMANCE_METRICS.map((metric) => (
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
