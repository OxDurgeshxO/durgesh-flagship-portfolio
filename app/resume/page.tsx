import React from "react";
import { Metadata } from "next";
import ResumeView from "@/components/resume/ResumeView";
import "@/styles/resume.css";

export const metadata: Metadata = {
  title: "Resume | Durgesh Dutt Sinha — AIML Engineer & Full-Stack Architect",
  alternates: {
    canonical: "/resume",
  },
  description:
    "Official resume of Durgesh Dutt Sinha. MCA in AIML at Sri Balaji University Pune. UNLOX AI Fellow, Autonomous AI systems, computer vision, and modern full-stack.",
};

export default function ResumePage() {
  return (
    <main id="main-content" className="min-h-screen bg-popover py-8 px-4 sm:px-6 lg:px-8 selection:bg-purple-500/30">
      <ResumeView />
    </main>
  );
}
