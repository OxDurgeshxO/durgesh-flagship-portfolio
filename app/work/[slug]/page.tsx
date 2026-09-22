import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CASE_STUDIES } from "@/lib/case-studies";
import CaseStudyHeader from "@/components/case-study/CaseStudyHeader";
import CaseStudySection from "@/components/case-study/CaseStudySection";
import ArchitectureDiagram from "@/components/case-study/ArchitectureDiagram";
import MetricCard from "@/components/case-study/MetricCard";
import TechnologyTags from "@/components/case-study/TechnologyTags";
import CaseStudyActions from "@/components/case-study/CaseStudyActions";
import { Target, Layers, ShieldCheck, AlertTriangle, TrendingUp, Cpu, RefreshCw, Compass, ArrowLeft, ArrowRight, Gauge } from "lucide-react";
import Link from "next/link";

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const caseStudy = CASE_STUDIES[params.slug];
  if (!caseStudy) {
    return { title: "Case Study Not Found" };
  }
  return {
    title: `${caseStudy.title} — Deep Engineering Case Study | Durgesh Dutt Sinha`,
    alternates: {
      // Duplicate-content guard: /work/fitness-platform is a byte-identical alias of /work/fittrack
      canonical: params.slug === 'fitness-platform' ? '/work/fittrack' : `/work/${params.slug}`,
    },
    description: caseStudy.overview,
    openGraph: {
      title: `${caseStudy.title} — Engineering Case Study`,
      description: caseStudy.overview,
    },
  };
}

export default function CaseStudyPage({ params }: Props) {
  const caseStudy = CASE_STUDIES[params.slug];
  if (!caseStudy) notFound();

  const canonicalSlugs = ['roleradar', 'fittrack', 'marketmatch-ai', 'jarvis-realtime-assistant', 'cnn-streamlit'];
  const currentKey = params.slug === 'fitness-platform' ? 'fittrack' : params.slug;
  const currentIdx = canonicalSlugs.indexOf(currentKey) >= 0 ? canonicalSlugs.indexOf(currentKey) : 0;
  const prevSlug = canonicalSlugs[(currentIdx - 1 + canonicalSlugs.length) % canonicalSlugs.length];
  const nextSlug = canonicalSlugs[(currentIdx + 1) % canonicalSlugs.length];
  const prevProject = CASE_STUDIES[prevSlug];
  const nextProject = CASE_STUDIES[nextSlug];

  return (
    <main id="main-content" className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative selection:bg-purple-500/30 selection:text-white">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-15"
          style={{ background: caseStudy.accent }}
        />
      </div>

      {/* TechArticle Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: `${caseStudy.title} - Deep Technical Case Study`,
            description: caseStudy.overview,
            author: {
              "@type": "Person",
              name: "Durgesh Dutt Sinha",
              url: "https://durgesh-portfolio.pages.dev",
            },
            articleSection: caseStudy.category,
            keywords: caseStudy.technologies.map((t) => t.name).join(", "),
            url: `https://durgesh-portfolio.pages.dev/work/${params.slug}`,
          }).replace(/</g, "\\u003c"),
        }}
      />

      <article className="max-w-4xl mx-auto">
        <CaseStudyHeader caseStudy={caseStudy} />

        {/* Highlight Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-12">
          {caseStudy.metrics.map((m) => (
            <MetricCard
              key={m.label}
              label={m.label}
              value={m.value}
              detail={m.detail}
              accentColor={caseStudy.accent}
            />
          ))}
        </div>

        {/* 1. Problem & Target Users */}
        <CaseStudySection
          title="Problem Statement & Target Users"
          subtitle="The real-world business and technical bottleneck addressed"
          icon={<Target className="size-5" />}
        >
          <p>{caseStudy.problem}</p>
          <div className="mt-4 p-5 rounded-xl bg-white/[0.03] border border-white/5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Target User Personas:
            </h4>
            <ul className="space-y-2">
              {caseStudy.targetUsers.map((u, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300">
                  <span className="text-purple-400 mt-0.5 font-bold">✓</span>
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>
        </CaseStudySection>

        {/* 2. Core Technologies */}
        <CaseStudySection
          title="Technology Stack & Architecture Philosophy"
          subtitle="Curated tools selected for performance, reliability, and developer experience"
          icon={<Cpu className="size-5" />}
        >
          <p>{caseStudy.architecture.summary}</p>
          <TechnologyTags technologies={caseStudy.technologies} />
        </CaseStudySection>

        {/* 3. Interactive Architecture & Data Flow */}
        <ArchitectureDiagram
          title={caseStudy.title}
          nodes={caseStudy.architecture.nodes}
          dataFlowSteps={caseStudy.architecture.dataFlowSteps}
          diagramAscii={caseStudy.architecture.diagramAscii}
          accentColor={caseStudy.accent}
        />

        {/* 4. Technical Tradeoffs & Critical Decisions */}
        <CaseStudySection
          title="Technical Tradeoffs & Architecture Decisions"
          subtitle="Why specific design decisions were chosen over common alternatives"
          icon={<Layers className="size-5" />}
        >
          <div className="space-y-4">
            {caseStudy.tradeoffs.map((t, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all"
              >
                <div className="text-xs font-mono uppercase text-purple-300 tracking-wider mb-1">
                  Tradeoff #{idx + 1}: {t.decision}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3 text-xs">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                    <span className="font-bold">Chosen:</span> {t.chosen}
                  </div>
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300">
                    <span className="font-bold">Alternative:</span> {t.alternative}
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <span className="font-semibold text-slate-200">Engineering Rationale:</span> {t.rationale}
                </p>
              </div>
            ))}
          </div>
        </CaseStudySection>

        {/* 5. Failure Handling & Reliability */}
        <CaseStudySection
          title="Failure Handling & Edge-Case Resilience"
          subtitle="Protecting uptime, data integrity, and degraded operational states"
          icon={<AlertTriangle className="size-5" />}
        >
          <ul className="space-y-3">
            {caseStudy.failureHandling.map((f, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs md:text-sm">
                <span className="size-5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  !
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </CaseStudySection>

        {/* 6. Security, Privacy & Compliance */}
        <CaseStudySection
          title="Security, Privacy & Data Retention"
          subtitle="Ethical data handling and client isolation principles"
          icon={<ShieldCheck className="size-5" />}
        >
          <ul className="space-y-3">
            {caseStudy.securityPrivacy.map((s, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs md:text-sm">
                <span className="size-5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  🔒
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </CaseStudySection>

        {/* 7. Measurable Impact & Verified Results */}
        <CaseStudySection
          title="Results & Measurable Outcomes"
          subtitle="Verified performance metrics and business deliverables"
          icon={<TrendingUp className="size-5" />}
        >
          <ul className="space-y-3">
            {caseStudy.resultsAndImpact.map((r, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs md:text-sm">
                <span className="size-5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  ★
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </CaseStudySection>

        {/* 8. Known Limitations & Roadmap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10">
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <RefreshCw className="size-3.5 text-amber-400" /> Known Limitations
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {caseStudy.limitations.map((l, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Compass className="size-3.5 text-purple-400" /> Future Roadmap
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {caseStudy.futureRoadmap.map((rm, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>{rm}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Telemetry & Benchmark Environment Callout */}
        <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 mb-8 flex items-start gap-3">
          <Gauge className="size-4 text-purple-400 mt-0.5 shrink-0" />
          <div className="text-xs text-slate-300 leading-relaxed">
            <span className="font-semibold text-white">Measurement Environment &amp; Telemetry:</span> Evaluated on Cloudflare global edge network, modern Web Workers, and NVIDIA V100 GPU inference runner with sub-100ms response targets.
          </div>
        </div>

        <CaseStudyActions caseStudy={caseStudy} />

        {/* Next & Previous Project Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
          <Link
            href={`/work/${prevSlug}`}
            className="p-4 rounded-xl glass border border-white/5 hover:border-purple-500/30 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex items-center gap-3 group"
          >
            <ArrowLeft className="size-4 text-purple-400 group-hover:-translate-x-0.5 transition-transform shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase text-slate-400">Previous Case Study</div>
              <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors truncate">{prevProject.title}</div>
            </div>
          </Link>

          <Link
            href={`/work/${nextSlug}`}
            className="p-4 rounded-xl glass border border-white/5 hover:border-purple-500/30 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex items-center justify-between gap-3 group text-right"
          >
            <div className="min-w-0 ml-auto">
              <div className="text-[10px] font-mono uppercase text-slate-400">Next Case Study</div>
              <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors truncate">{nextProject.title}</div>
            </div>
            <ArrowRight className="size-4 text-purple-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>
        </div>
      </article>
    </main>
  );
}
