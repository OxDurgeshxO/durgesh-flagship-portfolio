import React from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react";
import { OWNER } from "@/lib/data";

export default function ResumeHeader() {
  return (
    <header className="border-b border-slate-200 dark:border-white/10 pb-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {OWNER.name}
          </h1>
          <p className="text-base font-semibold text-purple-600 dark:text-purple-300 mt-1">
            {OWNER.title}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-col items-start md:items-end gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono">
          <a
            href={`mailto:${OWNER.email}`}
            className="hover:text-purple-500 flex items-center gap-1.5 transition-colors"
          >
            <Mail className="size-3.5" />
            <span>{OWNER.email}</span>
          </a>
          <a
            href={`tel:${OWNER.phone}`}
            className="hover:text-purple-500 flex items-center gap-1.5 transition-colors"
          >
            <Phone className="size-3.5" />
            <span>{OWNER.phone}</span>
          </a>
          <div className="flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            <span>{OWNER.location}</span>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <a
              href={OWNER.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 flex items-center gap-1"
            >
              <Linkedin className="size-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={OWNER.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-500 flex items-center gap-1"
            >
              <Github className="size-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
