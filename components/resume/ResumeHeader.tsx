import React from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react";
import { OWNER } from "@/lib/data";

export default function ResumeHeader() {
  return (
    <header className="border-b border-slate-300 pb-5 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-950">
            {OWNER.name}
          </h1>
          <p className="text-sm md:text-base font-semibold text-slate-700 mt-1">
            {OWNER.title}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-col items-start md:items-end gap-1.5 text-xs text-slate-700 font-mono">
          <a
            href={`mailto:${OWNER.email}`}
            className="hover:text-slate-950 hover:underline flex items-center gap-1.5 transition-colors"
            aria-label="Email Durgesh Dutt Sinha"
          >
            <Mail className="size-3.5" />
            <span>{OWNER.email}</span>
          </a>
          {/* Only render the phone link when a number is actually configured. */}
          {OWNER.phone ? (
            <a
              href={`tel:${OWNER.phone}`}
              className="hover:text-slate-950 hover:underline flex items-center gap-1.5 transition-colors"
              aria-label="Call Durgesh Dutt Sinha"
            >
              <Phone className="size-3.5" />
              <span>{OWNER.phone}</span>
            </a>
          ) : null}
          <div className="flex items-center gap-1.5 text-slate-600">
            <MapPin className="size-3.5" />
            <span>{OWNER.location}</span>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <a
              href={OWNER.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-950 hover:underline flex items-center gap-1 text-slate-700 font-semibold"
              aria-label="Durgesh Dutt Sinha on LinkedIn"
            >
              <Linkedin className="size-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={OWNER.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-950 hover:underline flex items-center gap-1 text-slate-700 font-semibold"
              aria-label="Durgesh Dutt Sinha on GitHub"
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
