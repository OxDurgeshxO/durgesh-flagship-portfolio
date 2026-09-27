import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Activity, Calendar } from 'lucide-react';
import { HealthDashboardClient } from '@/components/github-health/HealthDashboardClient';
import { GITHUB_HEALTH_SNAPSHOT_DATE } from '@/lib/github-health';

export const metadata: Metadata = {
  title: 'GitHub Project Health & Technical Snapshot | Durgesh Dutt Sinha',
  description:
    'Point-in-time snapshot of public repositories across the Durgesh portfolio ecosystem, recorded ' + GITHUB_HEALTH_SNAPSHOT_DATE + '.',
  alternates: {
    canonical: '/github-health',
  },
  openGraph: {
    title: 'GitHub Repository Health & Technical Snapshot | Durgesh Dutt Sinha',
    description:
      'Recorded repository snapshot from ' + GITHUB_HEALTH_SNAPSHOT_DATE + ': architectures, languages, licences and last commit dates. Each project links to its public repository so the details can be confirmed at the source.',
  },
};

export default function GitHubHealthPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 selection:bg-purple-500/30 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Main Portfolio</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-signal-border)] bg-[var(--accent-signal-bg)] px-3 py-1 text-xs font-mono text-[var(--accent-signal)]">
            <Calendar className="h-3.5 w-3.5" />
            <span>AUDIT SNAPSHOT (as of {GITHUB_HEALTH_SNAPSHOT_DATE})</span>
          </div>
        </div>

        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent-lab-bg)] px-3 py-1 text-xs font-semibold text-[var(--accent-lab)] border border-emerald-500/20">
            <Activity className="h-3.5 w-3.5" />
            Point-in-time Repository Snapshot
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            GitHub Repository Technical Snapshot
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A recorded snapshot of the public repositories behind these projects as of{' '}
            {GITHUB_HEALTH_SNAPSHOT_DATE}: languages, licences, stars and last commit dates. This page is
            not a live feed. Each entry links to its repository so every detail can be confirmed at the
            source.
          </p>
        </div>

        <HealthDashboardClient />
      </div>
    </main>
  );
}
