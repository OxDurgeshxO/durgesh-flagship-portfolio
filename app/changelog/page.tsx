import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, GitBranch, Sparkles, CheckCircle2, History } from 'lucide-react';
import BetaNoticeBanner from '@/components/BetaNoticeBanner';
import { ChangelogTimeline } from '@/components/changelog/ChangelogTimeline';

export const metadata: Metadata = {
  title: 'Engineering Changelog | Durgesh Dutt Sinha (Portfolio Architecture)',
  description:
    'Complete public engineering changelog detailing architectural decisions, performance refactors, AI Lab implementations, and quantified technical outcomes.',
  openGraph: {
    title: 'Engineering Changelog | Durgesh Dutt Sinha',
    description:
      'Detailed version history documenting problem-implementation-result breakdowns across all major platform iterations.',
  },
};

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 selection:bg-purple-500/30 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Main Portfolio</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
            <GitBranch className="h-3 w-3" />
            <span>BRANCH: V2 (ACTIVE)</span>
          </div>
        </div>

        {/* Header Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
            <History className="h-3.5 w-3.5" />
            Continuous Architecture Log
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Public Engineering Changelog
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A transparent, chronological record of every architectural evolution, performance optimization, and
            algorithm implementation—structured by Problem, Implementation, and Quantified Result.
          </p>
        </div>

        {/* Quick Highlights Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-border/80 bg-card p-3 text-center">
            <div className="text-2xl font-black text-foreground">5 Releases</div>
            <div className="text-[11px] text-muted-foreground font-mono">Semantic Versioning</div>
          </div>
          <div className="rounded-xl border border-border/80 bg-card p-3 text-center">
            <div className="text-2xl font-black text-emerald-400">100% Verified</div>
            <div className="text-[11px] text-muted-foreground font-mono">Automated CI Suites</div>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-xl border border-border/80 bg-card p-3 text-center">
            <div className="text-2xl font-black text-blue-400">0 CLS</div>
            <div className="text-[11px] text-muted-foreground font-mono">Zero Layout Shift</div>
          </div>
        </div>

        {/* Beta Mode Notice Banner */}
        <BetaNoticeBanner
          featureName="Public Engineering Changelog"
          customDescription="This public engineering changelog is an active Beta capability on the v2 architecture branch. Benchmark datasets, release records, and architecture telemetry logs are continuously updated and will be improvised soon."
        />

        {/* Timeline */}
        <ChangelogTimeline />
      </div>
    </main>
  );
}
