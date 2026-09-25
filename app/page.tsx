import type { Metadata } from 'next'
import { fetchGitHubProfile, fetchGitHubRepos, GitHubRepo } from '@/lib/github'
import Navbar from '@/components/sections/Navbar'
import HeroClientWrapper from '@/components/sections/HeroClientWrapper'
import { PortfolioShell } from '@/components/PortfolioShell'
import ProofStrip from '@/components/sections/ProofStrip'
import AboutSection from '@/components/sections/AboutSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import EducationSection from '@/components/sections/EducationSection'
import FeaturedProjectsSection from '@/components/sections/FeaturedProjectsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/sections/Footer'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default async function Home() {
  let profile = null
  let repos: GitHubRepo[] = []

  try {
    profile = await fetchGitHubProfile()
    repos = await fetchGitHubRepos()
  } catch {
    console.warn('GitHub API unavailable - using fallback data')
  }

  return (
    <PortfolioShell>
      {/* Skip link now lives in app/layout.tsx so every route gets one. */}
      <main id="main-content" className="relative min-h-screen overflow-x-hidden">
        <Navbar />
        <HeroClientWrapper />
        <ProofStrip />
        <AboutSection profile={profile} />
        <ExperienceSection />
        <EducationSection />
        <FeaturedProjectsSection />
        <ProjectsSection repos={repos} />
        <ContactSection />
        <Footer />
      </main>
    </PortfolioShell>
  )
}