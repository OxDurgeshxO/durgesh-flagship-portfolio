import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Camera, Mic, Cpu, Database, EyeOff, Lock, Server, Terminal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Center & Data Policy | Durgesh Dutt Sinha',
  description:
    'Comprehensive disclosure of local browser-only processing, zero-persistence AI execution, camera isolation, and telemetry transparency.',
  openGraph: {
    title: 'Privacy Center | Durgesh Dutt Sinha Portfolio',
    description:
      'Zero server persistence, client-side MediaPipe kinematics, and strict ephemeral compute guarantees.',
  },
};

export default function PrivacyPage() {
  const policies = [
    {
      icon: Camera,
      title: 'Camera & Vision Access',
      badge: 'Client-Isolated',
      description:
        'Camera access is requested exclusively inside the FitTrack AI Lab module after explicit user opt-in ("Enable Camera"). Video frames are processed entirely in local memory via HTML5 Canvas and MediaPipe Web Workers. Zero frames, recordings, or biometric embeddings are transmitted or persisted to any cloud server.',
    },
    {
      icon: Mic,
      title: 'Audio & Companion Synthesis',
      badge: 'Zero Microphone Access',
      description:
        'This application never requests, accesses, or records audio through your microphone. Audio synthesis in the 3D CyberBot companion is generated dynamically in-browser via the Web Audio API (sine-wave oscillators). Audio is muted by default and can be toggled at any time.',
    },
    {
      icon: Cpu,
      title: 'AI Input Handling & Ephemeral Compute',
      badge: 'Zero State Retention',
      description:
        'Resume excerpts in the RoleRadar analyzer and customer metrics in the MarketMatch sandbox are evaluated either directly in your browser or within stateless Edge serverless functions. Text inputs are discarded from memory immediately after scoring.',
    },
    {
      icon: Database,
      title: 'Data Retention & Databases',
      badge: 'No Persistent Database',
      description:
        'The portfolio website does not connect to any tracking databases or profile storage. User preferences (such as dark mode, experience mode, or audio mute) are stored strictly in your browser’s localStorage and never leave your machine.',
    },
    {
      icon: Server,
      title: 'Third-Party APIs & Cloud Providers',
      badge: 'Minimal Surface',
      description:
        'External communications are restricted to: Cloudflare Pages (hosting and CDN edge delivery), GitHub REST API (fetching public repository star counts with fallback cache), and Resend (dispatching direct contact form submissions).',
    },
    {
      icon: Lock,
      title: 'Contact Form Transmission',
      badge: 'Encrypted In-Flight',
      description:
        'Messages submitted via the contact form are validated against strict length and schema limits, rate-limited by IP, and dispatched directly over TLS-encrypted HTTPS to the email provider. Message contents are not logged or stored in intermediary databases.',
    },
    {
      icon: EyeOff,
      title: 'Zero Tracking & No Ad Networks',
      badge: '100% Tracker-Free',
      description:
        'This site uses no tracking cookies, third-party analytics pixels (such as Google Analytics or Meta Pixel), or fingerprinting scripts. Session events are logged locally to the browser console for debugging.',
    },
    {
      icon: Terminal,
      title: 'Local Processing Guarantees',
      badge: 'Edge & Browser Native',
      description:
        'All interactive ML demonstrations (33-point pose landmark trigonometry, 2D PCA vector projections, DBSCAN clustering) are executed client-side using JavaScript math libraries and Web Workers.',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 selection:bg-purple-500/30 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Main Portfolio</span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>ZERO PERSISTENCE AUDITED</span>
          </div>
        </div>

        {/* Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-lg bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400 border border-purple-500/20">
            <Lock className="h-3.5 w-3.5" />
            Security & Privacy Architecture
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Privacy Center & Zero-Persistence Policy
          </h1>
          <p className="text-base text-slate-400 leading-relaxed">
            Every interactive feature in this portfolio is engineered with strict data minimization principles. We do
            not collect, sell, or retain personal data.
          </p>
        </div>

        {/* Policy Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {policies.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="glass rounded-2xl p-6 border border-white/10 bg-slate-900/60 hover:border-purple-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {p.badge}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-white mb-2">{p.title}</h2>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explicit Hardware Commitment */}
        <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Explicit User Consent Rule</h3>
            <p className="text-xs text-slate-300">
              Camera, microphone, and heavy WebGL processing will <strong>never</strong> activate automatically without
              an intentional user click or preference selection.
            </p>
          </div>
          <Link
            href="/lab"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 text-white text-xs font-semibold hover:opacity-90 transition-all shadow-md shadow-purple-500/20 whitespace-nowrap cursor-pointer"
          >
            Explore AI Lab →
          </Link>
        </div>
      </div>
    </main>
  );
}
