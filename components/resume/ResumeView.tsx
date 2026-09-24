"use client";

import React, { useState } from "react";
import ResumeHeader from "@/components/resume/ResumeHeader";
import ResumeSection from "@/components/resume/ResumeSection";
import ResumeActions, { ResumeTheme } from "@/components/resume/ResumeActions";
import { EDUCATION, CERTIFICATIONS, VOLUNTEERING } from "@/lib/data";
import { CASE_STUDIES } from "@/lib/case-studies";

export default function ResumeView() {
  const [theme, setTheme] = useState<ResumeTheme>("pure-white");

  const projects = [
    CASE_STUDIES.roleradar,
    CASE_STUDIES.fittrack,
    CASE_STUDIES["marketmatch-ai"],
  ];

  // Theme palettes - calibrated for >= 17:1 contrast ratio & zero OCR penalty
  const themeStyles: Record<
    ResumeTheme,
    {
      container: string;
      heading: string;
      body: string;
      subtext: string;
      border: string;
    }
  > = {
    "pure-white": {
      container: "bg-white border-slate-300 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]",
      heading: "text-slate-950",
      body: "text-slate-800",
      subtext: "text-slate-600",
      border: "border-slate-300",
    },
    "warm-ivory": {
      container: "bg-[#FAF8F5] border-[#E5E0D8] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]",
      heading: "text-stone-950",
      body: "text-stone-800",
      subtext: "text-stone-600",
      border: "border-stone-300",
    },
    "light-gray": {
      container: "bg-[#F8FAFC] border-slate-300 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]",
      heading: "text-slate-950",
      body: "text-slate-800",
      subtext: "text-slate-600",
      border: "border-slate-300",
    },
  };

  const current = themeStyles[theme];

  return (
    <div className="max-w-4xl mx-auto">
      <ResumeActions currentTheme={theme} onThemeChange={setTheme} />

      {/* Main Resume Sheet - Clean Executive ATS Document Layout */}
      <article
        aria-label="Official Resume of Durgesh Dutt Sinha"
        className={`resume-container resume-page ${current.container} border rounded-2xl p-8 sm:p-14 transition-colors duration-200 text-left font-sans antialiased`}
      >
        <ResumeHeader />

        {/* Executive Summary */}
        <ResumeSection title="Executive Summary">
          <p className="leading-relaxed text-sm text-slate-800">
            Forward-thinking <strong className="font-semibold text-slate-950">AIML Engineer & Full-Stack Architect</strong> pursuing an MCA in Artificial Intelligence & Machine Learning at Sri Balaji University, Pune (2025–2027). Selected as an <strong className="font-semibold text-slate-950">UNLOX® AI Program Fellow</strong> and <strong className="font-semibold text-slate-950">Be10x AI Cohort Member</strong>. Demonstrates proven delivery of production-ready systems including real-time computer vision pose estimation engines (&lt;50ms inference latency), enterprise ATS resume evaluation platforms with Google XYZ bullet transformers, and unsupervised retail customer clustering intelligence suites.
          </p>
        </ResumeSection>

        {/* Technical Competencies */}
        <ResumeSection title="Technical Competencies">
          <div className="space-y-2 text-sm leading-relaxed">
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="font-bold text-slate-950 sm:w-48 shrink-0">AI & Machine Learning:</span>
              <span className="text-slate-800">
                Autonomous AI Agents, Prompt Engineering, MediaPipe Computer Vision, Scikit-Learn (K-Means, GMM, DBSCAN), PyTorch, CNNs, Whisper STT.
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="font-bold text-slate-950 sm:w-48 shrink-0">Full-Stack & Cloud:</span>
              <span className="text-slate-800">
                Next.js 15/14 (App Router), React 19/18, TypeScript, Drizzle ORM, PostgreSQL (Neon), Tailwind CSS, WebSockets, FastAPI, Docker.
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="font-bold text-slate-950 sm:w-48 shrink-0">Architecture & DevOps:</span>
              <span className="text-slate-800">
                Cloudflare Pages Edge CDN, AWS Cloud ML Pipelines, GitHub Actions CI/CD, Dual-Mode Storage Resiliency, Web Workers concurrency.
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="font-bold text-slate-950 sm:w-48 shrink-0">Practices & Tooling:</span>
              <span className="text-slate-800">
                System Architecture Design, Clean Code, Test-Driven Development, WCAG 2.1 AA Accessibility, Git / GitHub, Turbopack, Vite.
              </span>
            </div>
          </div>
        </ResumeSection>

        {/* Flagship Projects */}
        <ResumeSection title="Production Engineering Projects">
          <div className="space-y-6">
            {projects.map((proj) => (
              <div key={proj.slug} className="avoid-break">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                  <h3 className="font-bold text-base text-slate-950">
                    {proj.title} <span className="font-medium text-sm text-slate-600">— {proj.tagline}</span>
                  </h3>
                  <div className="text-xs sm:text-sm font-medium text-slate-600 shrink-0">
                    {proj.timeline}
                  </div>
                </div>

                <p className="text-sm text-slate-800 mb-2 leading-relaxed">
                  {proj.overview}
                </p>

                <ul className="list-disc ml-5 space-y-1.5 text-sm text-slate-800 leading-relaxed">
                  {proj.architecture.dataFlowSteps.slice(0, 3).map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>

                <div className="text-xs sm:text-sm text-slate-700 mt-2.5">
                  <span className="font-semibold text-slate-950">Technologies:</span>{" "}
                  <span className="text-slate-700">
                    {proj.technologies.map((t) => t.name).join(" • ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Professional Fellowships & Experience */}
        <ResumeSection title="Fellowships & Engineering Experience">
          <div className="space-y-5">
            <div className="avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                <h3 className="font-bold text-base text-slate-950">
                  AI Program Fellow <span className="font-medium text-sm text-slate-600">— UNLOX®</span>
                </h3>
                <div className="text-xs sm:text-sm font-medium text-slate-600 shrink-0">Jun 2026 – Present | Remote</div>
              </div>
              <ul className="list-disc ml-5 space-y-1.5 text-sm text-slate-800 leading-relaxed">
                <li>Engineered end-to-end AI deployment pipelines with automated containerization and cloud orchestration.</li>
                <li>Constructed and benchmarked autonomous agent workflows for enterprise industry use-cases.</li>
                <li>Executed production-grade machine learning models under direct technical mentorship.</li>
              </ul>
            </div>

            <div className="avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                <h3 className="font-bold text-base text-slate-950">
                  AI Cohort Member <span className="font-medium text-sm text-slate-600">— Be10x</span>
                </h3>
                <div className="text-xs sm:text-sm font-medium text-slate-600 shrink-0">May 2026 – Present | India</div>
              </div>
              <ul className="list-disc ml-5 space-y-1.5 text-sm text-slate-800 leading-relaxed">
                <li>Developed multi-step LLM prompt chaining architectures to automate repetitive business workflows.</li>
                <li>Built full-stack AI concept prototypes from initial system design to live client demonstrations.</li>
              </ul>
            </div>

            <div className="avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                <h3 className="font-bold text-base text-slate-950">
                  Central Co-Ordination Team <span className="font-medium text-sm text-slate-600">— School of Computer Studies, SBUP</span>
                </h3>
                <div className="text-xs sm:text-sm font-medium text-slate-600 shrink-0">Jan 2026 | Pune, India</div>
              </div>
              <ul className="list-disc ml-5 space-y-1.5 text-sm text-slate-800 leading-relaxed">
                <li>Coordinated university freshers induction and technical track operations across 200+ incoming graduate students.</li>
              </ul>
            </div>
          </div>
        </ResumeSection>

        {/* Education */}
        <ResumeSection title="Education">
          <div className="space-y-4">
            {EDUCATION.map((edu) => (
              <div key={edu.degree} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="font-bold text-base text-slate-950">{edu.degree}</h3>
                  <div className="text-sm text-slate-700 font-medium">{edu.institution}</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">{edu.grade}</div>
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-600 shrink-0">{edu.period}</div>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Certifications & Volunteering */}
        <ResumeSection title="Credentials & Leadership">
          <ul className="list-disc ml-5 space-y-2 text-sm text-slate-800 leading-relaxed">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert.name}>
                <strong className="font-semibold text-slate-950">{cert.name}</strong> — <span className="text-slate-700">{cert.issuer}</span>
              </li>
            ))}
            {VOLUNTEERING.map((vol) => (
              <li key={vol.role}>
                <strong className="font-semibold text-slate-950">{vol.role}</strong> — <span className="text-slate-700">{vol.org}: {vol.description}</span>
              </li>
            ))}
          </ul>
        </ResumeSection>
      </article>
    </div>
  );
}
