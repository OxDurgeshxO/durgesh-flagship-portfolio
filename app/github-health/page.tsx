import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Github, Activity, ShieldCheck } from 'lucide-react';
import { HealthDashboardClient } from '@/components/github-health/HealthDashboardClient';

export const metadata: Metadata = {
  title: 'GitHub Project Health & Code Quality Dashboard | Durgesh Dutt Sinha',
  description:
    'Live technical dashboard auditing repositories across the Durgesh portfolio ecosystem. Quality scores, CI pipeline status, test coverage, and architecture breakdowns.',
  openGraph: {
    title: 'GitHub Repository Health & Code Quality Dashboard | Durgesh Dutt Sinha',
    description:
      'Verified repository audit: clean architectures, CI/CD workflows, open-source licenses, and reproducible builds.',
  },
};

export default function GitHubHealthPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 selection:bg-purple-500/30 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Main Portfolio</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>100% CI PASSING</span>
          </div>
        </div>

        {/* Header Section */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <Activity className="h-3.5 w-3.5" />
            Continuous Verification & Code Quality
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            GitHub Repository Health Telemetry
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Every showcased project is verified against rigorous engineering criteria: automated CI test suites,
            domain-driven clean architecture boundaries, static typing, and open-source licenses.
          </p>
        </div>

        {/* Beta Mode Notice Banner */}
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-xs sm:text-sm text-blue-300 flex items-start sm:items-center gap-3">
          <Activity className="h-5 w-5 text-blue-400 shrink-0 mt-0.5 sm:mt-0" />
          <div className="flex-1">
            <span className="font-semibold text-blue-200 uppercase tracking-wider font-mono text-[11px] mr-2">
              [Beta Telemetry · Active Refinement]
            </span>
            <span>
              Repository health metrics and quality scoring algorithms are currently in Beta mode. Dynamic GitHub API synchronization and automated CI badges are actively being enhanced.
            </span>
          </div>
        </div>

        {/* Dashboard Client */}
        <HealthDashboardClient />
      </div>
    </main>
  );
}
