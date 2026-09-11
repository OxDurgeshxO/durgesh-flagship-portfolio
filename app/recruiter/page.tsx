import React from "react";
import { Metadata } from "next";
import BetaNoticeBanner from "@/components/BetaNoticeBanner";
import RecruiterHero from "@/components/recruiter/RecruiterHero";
import RecruiterSummary from "@/components/recruiter/RecruiterSummary";
import RecruiterProjects from "@/components/recruiter/RecruiterProjects";
import RecruiterSkills from "@/components/recruiter/RecruiterSkills";
import RecruiterContact from "@/components/recruiter/RecruiterContact";

export const metadata: Metadata = {
  title: "Recruiter Fast-Track | Durgesh Dutt Sinha (AIML Engineer & Full-Stack Architect)",
  description:
    "Fast, high-density candidate overview for recruiters and engineering hiring managers. 0 WebGL, verified production architectures, and ATS resume download.",
  openGraph: {
    title: "Recruiter Fast-Track | Durgesh Dutt Sinha",
    description: "Executive summary, technical stack, verified projects, and instant resume download.",
  },
};

export default function RecruiterPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 selection:bg-purple-500/30 selection:text-white">
      <div className="max-w-4xl mx-auto">
        <BetaNoticeBanner
          featureName="Recruiter Fast-Track Overview"
          customDescription="This dedicated recruiter overview is an active Beta capability on the v2 flagship branch. Candidate telemetry and direct scheduling tools will be continuously improvised soon."
          className="mb-6"
        />
        <RecruiterHero />
        <RecruiterSummary />
        <RecruiterProjects />
        <RecruiterSkills />
        <RecruiterContact />
      </div>
    </main>
  );
}
