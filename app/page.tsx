import dynamic from 'next/dynamic'
import { fetchGitHubProfile, fetchGitHubRepos } from '@/lib/github'
import Navbar from '@/components/sections/Navbar'
// HeroSection uses R3F Canvas + TypeAnimation — browser-only, must skip SSR
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), { ssr: false })
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import EducationSection from '@/components/sections/EducationSection'
import CertificationsSection from '@/components/sections/CertificationsSection'
import VolunteeringSection from '@/components/sections/VolunteeringSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/sections/Footer'

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
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection profile={profile} />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection repos={repos} />
      <EducationSection />
      <CertificationsSection />
      <VolunteeringSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
