import React from "react";
import { Metadata } from "next";
import ResumeHeader from "@/components/resume/ResumeHeader";
import ResumeSection from "@/components/resume/ResumeSection";
import ResumeActions from "@/components/resume/ResumeActions";
import { OWNER, EDUCATION, CERTIFICATIONS } from "@/lib/data";
import { CASE_STUDIES } from "@/lib/case-studies";
import "@/styles/resume.css";

export const metadata: Metadata = {
  title: "Resume | Durgesh Dutt Sinha — AIML Engineer & Full-Stack Architect",
  description:
    "Official resume of Durgesh Dutt Sinha. MCA in AIML at Sri Balaji University Pune. UNLOX AI Fellow, Autonomous AI systems, computer vision, and modern full-stack.",
};

export default function ResumePage() {
  const projects = [
    CASE_STUDIES.roleradar,
    CASE_STUDIES["fitness-platform"],
    CASE_STUDIES["marketmatch-ai"],
  ];

  return (
    <main className="min-h-screen bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 selection:bg-purple-500/30">
      <div className="max-w-4xl mx-auto">
        <ResumeActions />

        <div className="resume-container resume-page bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl text-slate-900 dark:text-slate-100">
          <ResumeHeader />

          {/* Executive Summary */}
          <ResumeSection title="Executive Summary">
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              Forward-thinking <strong>AIML Engineer & Full-Stack Architect</strong> pursuing an MCA in Artificial Intelligence & Machine Learning at Sri Balaji University, Pune (2025–2027). Selected as an <strong>UNLOX® AI Program Fellow</strong> and <strong>Be10x AI Cohort Member</strong>. Demonstrates proven delivery of production-ready systems including real-time computer vision pose estimation engines (&lt;50ms inference), enterprise ATS resume evaluation platforms with Google XYZ bullet transformers, and unsupervised retail customer intelligence suites.
            </p>
          </ResumeSection>

          {/* Technical Skills */}
          <ResumeSection title="Technical Competencies">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">AI & Machine Learning:</span>{" "}
                <span className="text-slate-600 dark:text-slate-300">
                  Autonomous AI Agents, Prompt Engineering, Google MediaPipe Computer Vision, Scikit-Learn (K-Means, GMM, DBSCAN), PyTorch, CNNs, Whisper STT.
                </span>
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Full-Stack & Cloud:</span>{" "}
                <span className="text-slate-600 dark:text-slate-300">
                  Next.js 16/15 (App Router), React 19/18, TypeScript 5.x, Drizzle ORM, PostgreSQL (Neon), Tailwind CSS v4, WebSockets, FastAPI, Docker.
                </span>
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Architecture & DevOps:</span>{" "}
                <span className="text-slate-600 dark:text-slate-300">
                  Cloudflare Pages Edge CDN, AWS Cloud ML Pipelines, GitHub Actions CI/CD, Dual-Mode Storage Resiliency, Web Workers concurrency.
                </span>
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Practices & Tooling:</span>{" "}
                <span className="text-slate-600 dark:text-slate-300">
                  System Architecture Design, Clean Code, Test-Driven Development, WCAG 2.1 AA Accessibility, Git / GitHub, Turbopack, Vite.
                </span>
              </div>
            </div>
          </ResumeSection>

          {/* Flagship Projects */}
          <ResumeSection title="Production Engineering Projects">
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.slug} className="avoid-break">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {proj.title} <span className="font-normal text-xs text-purple-600 dark:text-purple-300">— {proj.tagline}</span>
                    </h3>
                    <div className="text-xs font-mono text-slate-500 shrink-0">
                      {proj.timeline}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-1.5">
                    {proj.overview}
                  </p>

                  <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
                    {proj.architecture.dataFlowSteps.slice(0, 3).map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>

                  <div className="text-[11px] font-mono text-slate-500 mt-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Tech Stack:</span>{" "}
                    {proj.technologies.map((t) => t.name).join(" • ")}
                  </div>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Professional Fellowships & Experience */}
          <ResumeSection title="Fellowships & Engineering Experience">
            <div className="space-y-3">
              <div className="avoid-break">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    AI Program Fellow <span className="font-normal text-xs text-rose-500 dark:text-rose-400">— UNLOX®</span>
                  </h3>
                  <div className="text-xs font-mono text-slate-500">Jun 2026 – Present | Remote</div>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
                  <li>Engineered end-to-end AI deployment pipelines with automated containerization.</li>
                  <li>Constructed and benchmarked autonomous agent workflows for enterprise industry use-cases.</li>
                  <li>Executed production-grade machine learning models under direct technical mentorship.</li>
                </ul>
              </div>

              <div className="avoid-break">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    AI Cohort Member <span className="font-normal text-xs text-purple-600 dark:text-purple-400">— Be10x</span>
                  </h3>
                  <div className="text-xs font-mono text-slate-500">May 2026 – Present | India</div>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
                  <li>Developed multi-step LLM prompt chaining architectures to automate repetitive tasks.</li>
                  <li>Built full-stack AI concept prototypes from initial system design to live client demonstrations.</li>
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
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">{edu.degree}</h3>
                    <div className="text-xs text-slate-600 dark:text-slate-300">{edu.institution}</div>
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-mono mt-0.5">{edu.grade}</div>
                  </div>
                  <div className="text-xs font-mono text-slate-500 shrink-0">{edu.period}</div>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Certifications */}
          <ResumeSection title="Credentials & Certifications">
            <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.name}>
                  <strong className="text-slate-800 dark:text-slate-200">{cert.name}</strong> — {cert.issuer}
                </li>
              ))}
            </ul>
          </ResumeSection>
        </div>
      </div>
    </main>
  );
}
