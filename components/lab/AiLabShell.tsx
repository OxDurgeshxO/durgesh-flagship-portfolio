'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, FileText, Activity, Users, ArrowUpRight, ShieldCheck, Zap, Lock } from 'lucide-react';
import ResumeAnalyzerDemo from './ResumeAnalyzerDemo';
import { FitTrackDemo } from './FitTrackDemo';
import MarketMatchDemo from './MarketMatchDemo';
import PrivacyNotice from './PrivacyNotice';

type TabKey = 'resume' | 'fittrack' | 'marketmatch';

export function AiLabShell() {
  const [activeTab, setActiveTab] = useState<TabKey>('resume');

  const tabs = [
    {
      id: 'resume' as TabKey,
      name: 'RoleRadar AI',
      subtitle: 'ATS Scoring & XYZ Formula',
      icon: FileText,
      badge: 'NLP / Regex Scoring',
      caseStudy: '/work/roleradar',
    },
    {
      id: 'fittrack' as TabKey,
      name: 'FitTrack Kinematics',
      subtitle: 'Pose Angle & Rep Counter',
      icon: Activity,
      badge: 'Edge Computer Vision',
      caseStudy: '/work/fitness-platform',
    },
    {
      id: 'marketmatch' as TabKey,
      name: 'MarketMatch AI',
      subtitle: 'RFM Clustering & 2D PCA',
      icon: Users,
      badge: 'Unsupervised ML',
      caseStudy: '/work/marketmatch-ai',
    },
  ];

  const activeTabMeta = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="space-y-8">
      {/* Top Banner & Telemetry highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border/80 bg-card/60 p-4 flex items-center gap-3">
          <div className="rounded-lg bg-emerald-500/10 p-2.5 text-emerald-400">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase font-mono">Inference Latency</div>
            <div className="text-lg font-bold text-foreground">Sub-50ms Edge Target</div>
          </div>
        </div>

        <div className="rounded-xl border border-border/80 bg-card/60 p-4 flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/10 p-2.5 text-blue-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase font-mono">Zero Persistence</div>
            <div className="text-lg font-bold text-foreground">Ephemeral In-Memory Only</div>
          </div>
        </div>

        <div className="rounded-xl border border-border/80 bg-card/60 p-4 flex items-center gap-3">
          <div className="rounded-lg bg-purple-500/10 p-2.5 text-purple-400">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase font-mono">Privacy First</div>
            <div className="text-lg font-bold text-foreground">Client-Side Edge Sandbox</div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 ring-1 ring-primary/40'
                    : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                <div>
                  <div className="font-semibold leading-none">{tab.name}</div>
                  <div className={`text-[10px] mt-1 ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    {tab.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <Link
          href={activeTabMeta.caseStudy}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors self-start sm:self-auto"
        >
          <span>Deep Case Study</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Active Demo Canvas */}
      <div className="transition-opacity duration-200">
        {activeTab === 'resume' && <ResumeAnalyzerDemo />}
        {activeTab === 'fittrack' && <FitTrackDemo />}
        {activeTab === 'marketmatch' && <MarketMatchDemo />}
      </div>

      {/* Privacy Notice Component */}
      <PrivacyNotice />
    </div>
  );
}
