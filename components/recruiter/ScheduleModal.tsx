"use client";

import React, { useEffect } from "react";
import { Calendar, Clock, Video, Mail, CheckCircle2, X, ExternalLink } from "lucide-react";
import { OWNER } from "@/lib/data";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScheduleModal({ isOpen, onClose }: ScheduleModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const meetingTypes = [
    {
      title: "15-Min Quick Intro & Alignment",
      duration: "15 min",
      desc: "Fast screening call to discuss role alignment, location, and compensation expectations.",
      subject: "15-Min Intro Call with Durgesh Sinha",
    },
    {
      title: "30-Min Technical Architecture Chat",
      duration: "30 min",
      desc: "Deep dive into RoleRadar, MediaPipe pose pipelines, or autonomous agent frameworks.",
      subject: "Technical Architecture Screen: Durgesh Sinha",
    },
    {
      title: "45-Min System Design & Live Code",
      duration: "45 min",
      desc: "Full technical review across TypeScript, Next.js, PyTorch, and distributed edge pipelines.",
      subject: "Technical System Interview: Durgesh Sinha",
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Schedule Interview with Durgesh"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#0b0f17] border border-cyan-500/40 rounded-2xl p-6 shadow-2xl text-slate-100 flex flex-col gap-4 font-sans"
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white">Schedule Technical Screening</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close scheduler"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Select an interview format to initiate direct scheduling with {OWNER.name}. Open for immediate 2026 AI/ML and Full-Stack Engineering roles.
        </p>

        <div className="space-y-2.5">
          {meetingTypes.map((m, idx) => {
            const mailtoUrl = `mailto:${OWNER.email}?subject=${encodeURIComponent(m.subject)}&body=${encodeURIComponent(
              `Hi Durgesh,\n\nI reviewed your portfolio and would like to schedule a ${m.title} regarding our engineering team.\n\nProposed times (IST/UTC):\n1. \n2. \n\nLooking forward to speaking,\n`
            )}`;

            return (
              <a
                key={idx}
                href={mailtoUrl}
                className="group flex flex-col p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all text-left"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                    <Video className="size-3.5 text-cyan-400" />
                    {m.title}
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    {m.duration}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {m.desc}
                </p>
              </a>
            );
          })}
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Time Zone: IST (UTC+5:30) • Flexible</span>
          <a
            href={OWNER.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline flex items-center gap-1"
          >
            LinkedIn Direct ↗
          </a>
        </div>
      </div>
    </div>
  );
}
