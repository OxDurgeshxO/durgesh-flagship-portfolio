import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowLeft, Terminal, Cpu, FlaskConical } from 'lucide-react';
import BetaNoticeBanner from '@/components/BetaNoticeBanner';
import { AiLabShell } from '@/components/lab/AiLabShell';

export const metadata: Metadata = {
  title: 'Interactive AI Lab | Durgesh Dutt Sinha (Edge ML & Computer Vision)',
  description:
    'Live interactive sandbox for RoleRadar NLP scoring, FitTrack computer vision joint kinematics, and MarketMatch RFM customer segmentation. Sub-50ms latency, zero server persistence.',
  openGraph: {
    title: 'Interactive AI & Edge ML Sandbox | Durgesh Dutt Sinha',
    description:
      'Run live machine learning models in your browser: ATS NLP scoring, real-time pose estimation, and PCA cluster projections.',
  },
};

export default function AiLabPage() {
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

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
            <Terminal className="h-3 w-3" />
            <span>LIVE EDGE RUNTIME</span>
          </div>
        </div>

        {/* Header Section */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-lg bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400 border border-purple-500/20">
            <Cpu className="h-3.5 w-3.5" />
            Applied Machine Learning & Computer Vision
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Interactive AI Engineering Lab
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Execute real-time client-side heuristics and edge inference workloads directly in your browser. Every model
            and mathematical routine runs with sub-50ms latency and zero server-side state retention.
          </p>
        </div>

        {/* Beta Mode Notice Banner */}
        <BetaNoticeBanner
          featureName="Interactive AI Engineering Lab"
          customDescription="This AI Lab sandbox is currently an active Beta feature. Real-time MediaPipe joint kinematics, ATS lexical transformers, and PCA cluster projections are undergoing continuous enhancement and will be fully improvised soon."
        />

        {/* AI Lab Shell */}
        <AiLabShell />
      </div>
    </main>
  );
}
