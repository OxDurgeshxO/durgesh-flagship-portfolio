import dynamic from 'next/dynamic'
import { fetchGitHubProfile, fetchGitHubRepos } from '@/lib/github'
import Navbar from '@/components/sections/Navbar'
import { PortfolioShell } from '@/components/PortfolioShell'
import AboutSection from '@/components/sections/AboutSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import EducationSection from '@/components/sections/EducationSection'
import FeaturedProjectsSection from '@/components/sections/FeaturedProjectsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/sections/Footer'

// HeroSection uses R3F Canvas + TypeAnimation — browser-only, must skip SSR
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), { ssr: false })

export default async function Home() {
  let profile = null
  let repos: any[] = []

  try {
    profile = await fetchGitHubProfile()
    repos = await fetchGitHubRepos()
  } catch {
    console.warn('GitHub API unavailable — using fallback data')
  }

  return (
    <PortfolioShell>
      <main className="relative min-h-screen overflow-x-hidden">
        <Navbar />
        <HeroSection />
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
