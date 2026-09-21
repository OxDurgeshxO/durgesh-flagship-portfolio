import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Activity, Calendar } from 'lucide-react';
import { HealthDashboardClient } from '@/components/github-health/HealthDashboardClient';
import { GITHUB_HEALTH_SNAPSHOT_DATE } from '@/lib/github-health';

export const metadata: Metadata = {
  title: 'GitHub Project Health & Technical Snapshot | Durgesh Dutt Sinha',
  description:
    'Verified architectural audit snapshot of public repositories across the Durgesh portfolio ecosystem as of ' + GITHUB_HEALTH_SNAPSHOT_DATE + '.',
  openGraph: {
    title: 'GitHub Repository Health & Technical Snapshot | Durgesh Dutt Sinha',
    description:
      'Verified repository audit: clean architectures, automated test suites, open-source repositories, and reproducible builds as of ' + GITHUB_HEALTH_SNAPSHOT_DATE + '.',
  },
};

export default function GitHubHealthPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 selection:bg-purple-500/30 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Main Portfolio</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-mono text-blue-400">
            <Calendar className="h-3.5 w-3.5" />
            <span>AUDIT SNAPSHOT (as of {GITHUB_HEALTH_SNAPSHOT_DATE})</span>
          </div>
        </div>

        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <Activity className="h-3.5 w-3.5" />
            Verified Architecture & Code Quality Audit
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            GitHub Repository Technical Snapshot
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Every showcased project is grounded in verified public source code: automated test suites,
            clean architectural boundaries, static typing, and reproducible builds.
          </p>
        </div>

        <HealthDashboardClient />
      </div>
    </main>
  );
}
