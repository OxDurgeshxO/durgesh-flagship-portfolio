import dynamic from 'next/dynamic'
import { fetchGitHubProfile, fetchGitHubRepos, GitHubRepo } from '@/lib/github'
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
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), {
  ssr: false,
  loading: () => (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/40 text-purple-300 text-sm mb-6">
          👋 Welcome to my portfolio
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight text-white">
          <span className="gradient-text">Durgesh Dutt Sinha</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-8 font-mono">
          AIML Engineer &amp; Full-Stack Developer
        </p>
      </div>
    </section>
  ),
})

export default async function Home() {
  let profile = null
  let repos: GitHubRepo[] = []

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
