import React from "react";
import { SKILLS, EDUCATION, CERTIFICATIONS } from "@/lib/data";
import { Award, GraduationCap } from "lucide-react";

export default function RecruiterSkills() {
  const skillCategories = [
    {
      name: "AI & Machine Learning Engineering",
      skills: ["Autonomous AI Agents", "LLM Pipelines & Prompt Engineering", "Deep Learning & CNNs", "Scikit-Learn (K-Means, GMM, DBSCAN)", "MediaPipe Computer Vision", "PyTorch"],
    },
    {
      name: "Full-Stack & Systems Architecture",
      skills: ["Next.js 16 / 15 (App Router)", "React 19 / 18", "TypeScript 5.x", "Drizzle ORM & Prisma", "PostgreSQL (Neon)", "FastAPI & WebSockets", "Tailwind CSS"],
    },
    {
      name: "Cloud, DevOps & Tooling",
      skills: ["AWS Cloud Foundations", "Cloudflare Pages & Edge Anycast", "Docker & DevContainers", "Git / GitHub Actions CI", "REST & WebSocket APIs", "Vite & Turbopack"],
    },
  ];

  return (
    <section className="mb-10">
      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4">
        Technical Skills & Academic Foundation
      </h2>

      {/* Categorized Skills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {skillCategories.map((cat) => (
          <div key={cat.name} className="glass rounded-xl p-5 border border-white/10 bg-white/[0.02]">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 mb-3 border-b border-white/5 pb-2">
              {cat.name}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Education & Certs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5 border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2 mb-3 text-purple-400">
            <GraduationCap className="size-4" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Education
            </h3>
          </div>
          <div className="space-y-3 text-xs">
            {EDUCATION.map((edu) => (
              <div key={edu.degree} className="border-l-2 border-purple-500/40 pl-3">
                <div className="font-semibold text-white">{edu.degree}</div>
                <div className="text-slate-400">{edu.institution} • {edu.period}</div>
                <div className="text-purple-300 text-[11px] mt-0.5">{edu.grade}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-5 border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2 mb-3 text-rose-400">
            <Award className="size-4" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Credentials & Fellowships
            </h3>
          </div>
          <div className="space-y-3 text-xs">
            <div className="border-l-2 border-rose-500/40 pl-3">
              <div className="font-semibold text-white">UNLOX® AI Program Fellow</div>
              <div className="text-slate-400">Autonomous systems & end-to-end industry deployment pipelines</div>
            </div>
            <div className="border-l-2 border-rose-500/40 pl-3">
              <div className="font-semibold text-white">Be10x AI Cohort Member</div>
              <div className="text-slate-400">LLM agents, prompt chaining, and workflow optimization</div>
            </div>
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.name} className="border-l-2 border-yellow-500/40 pl-3">
                <div className="font-semibold text-white">{cert.name}</div>
                <div className="text-slate-400">{cert.issuer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
