import React from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react";
import { OWNER } from "@/lib/data";

export default function ResumeHeader() {
  return (
    <header className="border-b-2 border-slate-900 pb-5 mb-6 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
            {OWNER.name}
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-800 mt-1">
            {OWNER.title}
          </p>
        </div>
        <div className="text-xs sm:text-sm text-slate-600 font-medium sm:text-right">
          <span>{OWNER.location}</span>
        </div>
      </div>

      {/* Clean ATS-friendly Executive Contact Strip */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-700 mt-3 pt-3 border-t border-slate-200">
        <a
          href={`mailto:${OWNER.email}`}
          className="hover:text-blue-600 hover:underline flex items-center gap-1.5 font-medium transition-colors"
          aria-label="Email Durgesh Dutt Sinha"
        >
          <Mail className="size-3.5 text-slate-600" aria-hidden="true" />
          <span>{OWNER.email}</span>
        </a>

        {OWNER.phone ? (
          <>
            <span className="text-slate-300 hidden sm:inline" aria-hidden="true">•</span>
            <a
              href={`tel:${OWNER.phone}`}
              className="hover:text-blue-600 hover:underline flex items-center gap-1.5 font-medium transition-colors"
              aria-label="Call Durgesh Dutt Sinha"
            >
              <Phone className="size-3.5 text-slate-600" aria-hidden="true" />
              <span>{OWNER.phone}</span>
            </a>
          </>
        ) : null}

        <span className="text-slate-300 hidden sm:inline" aria-hidden="true">•</span>
        <a
          href={OWNER.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 hover:underline flex items-center gap-1.5 font-medium transition-colors"
          aria-label="Durgesh Dutt Sinha on LinkedIn"
        >
          <Linkedin className="size-3.5 text-slate-600" aria-hidden="true" />
          <span>linkedin.com/in/durgesh-dutt-s-4ba74924b</span>
        </a>

        <span className="text-slate-300 hidden sm:inline" aria-hidden="true">•</span>
        <a
          href={OWNER.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 hover:underline flex items-center gap-1.5 font-medium transition-colors"
          aria-label="Durgesh Dutt Sinha on GitHub"
        >
          <Github className="size-3.5 text-slate-600" aria-hidden="true" />
          <span>github.com/OxDurgeshxO</span>
        </a>

        <span className="text-slate-300 hidden sm:inline" aria-hidden="true">•</span>
        <a
          href="https://durgesh-portfolio.pages.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 hover:underline flex items-center gap-1.5 font-medium transition-colors"
          aria-label="Durgesh Dutt Sinha Portfolio"
        >
          <Globe className="size-3.5 text-slate-600" aria-hidden="true" />
          <span>durgesh-portfolio.pages.dev</span>
        </a>
      </div>
    </header>
  );
}
