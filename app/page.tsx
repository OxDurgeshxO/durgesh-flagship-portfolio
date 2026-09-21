import dynamic from 'next/dynamic'
import { fetchGitHubProfile, fetchGitHubRepos, GitHubRepo } from '@/lib/github'
import Navbar from '@/components/sections/Navbar'
import { PortfolioShell } from '@/components/PortfolioShell'
import ProofStrip from '@/components/sections/ProofStrip'
import AboutSection from '@/components/sections/AboutSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import EducationSection from '@/components/sections/EducationSection'
import FeaturedProjectsSection from '@/components/sections/FeaturedProjectsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/sections/Footer'

// HeroSection uses R3F Canvas + TypeAnimation - browser-only, must skip SSR
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), {
  ssr: false,
  loading: () => (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[var(--bg-primary)] pt-20 pb-16">
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/40 text-purple-300 text-xs sm:text-sm mb-6">
          <span>AI/ML Engineer &middot; Production AI Systems</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-3 leading-tight tracking-tight text-white">
          <span className="gradient-text">Durgesh Dutt Sinha</span>
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-slate-200 mb-4">
          AI/ML Engineer building useful AI products and intelligent interfaces.
        </p>
        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          I design and ship AI applications, ML systems, and high-performance web experiences.
        </p>
        <div className="flex flex-wrap gap-3.5 justify-center items-center">
          <a
            href="#projects"
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 text-white font-semibold shadow-lg shadow-purple-500/20 text-sm sm:text-base"
          >
            View Selected Work
          </a>
          <a
            href="/resume.pdf"
            download="Durgesh_Dutt_Sinha_Resume.pdf"
            className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm sm:text-base"
          >
            Download Résumé
          </a>
          <a
            href="/resume"
            className="px-5 py-3 rounded-xl glass border border-purple-500/40 text-purple-200 font-semibold inline-flex items-center gap-2 shadow-lg shadow-purple-500/10 text-sm sm:text-base"
          >
            ATS HTML View
          </a>
          <a
            href="#contact"
            className="px-5 py-3 rounded-xl glass border border-slate-700 text-slate-300 font-semibold text-sm sm:text-base"
          >
            Contact
          </a>
        </div>
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
    console.warn('GitHub API unavailable - using fallback data')
  }

  return (
    <PortfolioShell>
      <a href="#about" className="skip-to-content">
        Skip to main content
      </a>
      <main id="main-content" className="relative min-h-screen overflow-x-hidden">
        <Navbar />
        <HeroSection />
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