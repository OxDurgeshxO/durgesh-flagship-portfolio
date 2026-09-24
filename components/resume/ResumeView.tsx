"use client";

import React, { useState } from "react";
import ResumeHeader from "@/components/resume/ResumeHeader";
import ResumeSection from "@/components/resume/ResumeSection";
import ResumeActions, { ResumeTheme } from "@/components/resume/ResumeActions";
import { EDUCATION, CERTIFICATIONS } from "@/lib/data";
import { CASE_STUDIES } from "@/lib/case-studies";

export default function ResumeView() {
  const [theme, setTheme] = useState<ResumeTheme>("pure-white");

  const projects = [
    CASE_STUDIES.roleradar,
    CASE_STUDIES.fittrack,
    CASE_STUDIES["marketmatch-ai"],
  ];

  // ATS-friendly high-contrast theme classes
  const themeStyles: Record<ResumeTheme, { container: string; text: string; subtext: string; border: string }> = {
    "pure-white": {
      container: "bg-white border-slate-300 shadow-xl",
      text: "text-slate-900",
      subtext: "text-slate-700",
      border: "border-slate-300",
    },
    "warm-ivory": {
      container: "bg-[#FAF9F5] border-[#E7E5E4] shadow-xl",
      text: "text-stone-900",
      subtext: "text-stone-700",
      border: "border-stone-300",
    },
    "light-gray": {
      container: "bg-[#F8FAFC] border-slate-300 shadow-xl",
      text: "text-slate-950",
      subtext: "text-slate-700",
      border: "border-slate-300",
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <div className="max-w-4xl mx-auto">
      <ResumeActions currentTheme={theme} onThemeChange={setTheme} />

      {/* Main Resume Paper Sheet - Clean, ATS-compliant, High Contrast */}
      <article
        aria-label="Official Resume of Durgesh Dutt Sinha"
        className={`resume-container resume-page ${currentTheme.container} border rounded-xl p-6 sm:p-12 transition-colors duration-200 text-left`}
      >
        <ResumeHeader />

        {/* Executive Summary */}
        <ResumeSection title="Executive Summary">
          <p className="leading-relaxed text-slate-800 text-xs sm:text-sm">
            Forward-thinking <strong>AIML Engineer & Full-Stack Architect</strong> pursuing an MCA in Artificial Intelligence & Machine Learning at Sri Balaji University, Pune (2025–2027). Selected as an <strong>UNLOX® AI Program Fellow</strong> and <strong>Be10x AI Cohort Member</strong>. Demonstrates proven delivery of production-ready systems including real-time computer vision pose estimation engines (&lt;50ms inference), enterprise ATS resume evaluation platforms with Google XYZ bullet transformers, and unsupervised retail customer intelligence suites.
          </p>
        </ResumeSection>

        {/* Technical Skills */}
        <ResumeSection title="Technical Competencies">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="font-bold text-slate-900">AI & Machine Learning:</span>{" "}
              <span className="text-slate-700">
                Autonomous AI Agents, Prompt Engineering, Google MediaPipe Computer Vision, Scikit-Learn (K-Means, GMM, DBSCAN), PyTorch, CNNs, Whisper STT.
              </span>
            </div>
            <div>
              <span className="font-bold text-slate-900">Full-Stack & Cloud:</span>{" "}
              <span className="text-slate-700">
                Next.js 16/15 (App Router), React 19/18, TypeScript 5.x, Drizzle ORM, PostgreSQL (Neon), Tailwind CSS, WebSockets, FastAPI, Docker.
              </span>
            </div>
            <div>
              <span className="font-bold text-slate-900">Architecture & DevOps:</span>{" "}
              <span className="text-slate-700">
                Cloudflare Pages Edge CDN, AWS Cloud ML Pipelines, GitHub Actions CI/CD, Dual-Mode Storage Resiliency, Web Workers concurrency.
              </span>
            </div>
            <div>
              <span className="font-bold text-slate-900">Practices & Tooling:</span>{" "}
              <span className="text-slate-700">
                System Architecture Design, Clean Code, Test-Driven Development, WCAG 2.1 AA Accessibility, Git / GitHub, Turbopack, Vite.
              </span>
            </div>
          </div>
        </ResumeSection>

        {/* Flagship Projects */}
        <ResumeSection title="Production Engineering Projects">
          <div className="space-y-5">
            {projects.map((proj) => (
              <div key={proj.slug} className="avoid-break">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h3 className="font-bold text-sm text-slate-950">
                    {proj.title} <span className="font-semibold text-xs text-slate-700">— {proj.tagline}</span>
                  </h3>
                  <div className="text-xs font-mono text-slate-600 shrink-0">
                    {proj.timeline}
                  </div>
                </div>

                <p className="text-xs text-slate-800 mb-2 leading-relaxed">
                  {proj.overview}
                </p>

                <ul className="list-disc list-outside ml-4 text-xs text-slate-700 space-y-1">
                  {proj.architecture.dataFlowSteps.slice(0, 3).map((step, idx) => (
                    <li key={idx} className="leading-relaxed">{step}</li>
                  ))}
                </ul>

                <div className="text-[11px] text-slate-600 mt-2 font-mono">
                  <span className="font-semibold text-slate-800">Tech Stack:</span>{" "}
                  {proj.technologies.map((t) => t.name).join(" • ")}
                </div>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Professional Fellowships & Experience */}
        <ResumeSection title="Fellowships & Engineering Experience">
          <div className="space-y-4">
            <div className="avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                <h3 className="font-bold text-sm text-slate-950">
                  AI Program Fellow <span className="font-medium text-xs text-slate-700">— UNLOX®</span>
                </h3>
                <div className="text-xs font-mono text-slate-600">Jun 2026 – Present | Remote</div>
              </div>
              <ul className="list-disc list-outside ml-4 text-xs text-slate-700 space-y-1">
                <li className="leading-relaxed">Engineered end-to-end AI deployment pipelines with automated containerization.</li>
                <li className="leading-relaxed">Constructed and benchmarked autonomous agent workflows for enterprise industry use-cases.</li>
                <li className="leading-relaxed">Executed production-grade machine learning models under direct technical mentorship.</li>
              </ul>
            </div>

            <div className="avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                <h3 className="font-bold text-sm text-slate-950">
                  AI Cohort Member <span className="font-medium text-xs text-slate-700">— Be10x</span>
                </h3>
                <div className="text-xs font-mono text-slate-600">May 2026 – Present | India</div>
              </div>
              <ul className="list-disc list-outside ml-4 text-xs text-slate-700 space-y-1">
                <li className="leading-relaxed">Developed multi-step LLM prompt chaining architectures to automate repetitive tasks.</li>
                <li className="leading-relaxed">Built full-stack AI concept prototypes from initial system design to live client demonstrations.</li>
              </ul>
            </div>
          </div>
        </ResumeSection>

        {/* Education */}
        <ResumeSection title="Education">
          <div className="space-y-3">
            {EDUCATION.map((edu) => (
              <div key={edu.degree} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="font-bold text-sm text-slate-950">{edu.degree}</h3>
                  <div className="text-xs text-slate-800">{edu.institution}</div>
                  <div className="text-xs text-slate-600 font-mono mt-0.5">{edu.grade}</div>
                </div>
                <div className="text-xs font-mono text-slate-600 shrink-0">{edu.period}</div>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Certifications */}
        <ResumeSection title="Credentials & Certifications">
          <ul className="list-disc list-outside ml-4 text-xs text-slate-700 space-y-1">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert.name} className="leading-relaxed">
                <strong className="text-slate-900">{cert.name}</strong> — {cert.issuer}
              </li>
            ))}
          </ul>
        </ResumeSection>
      </article>
    </div>
  );
}
