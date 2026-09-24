import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { Home, FileText, Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary,#0c0c14)] text-ink flex flex-col selection:bg-purple-500/30">
      <Navbar />
      <main id="main-content" className="flex-1 flex items-center justify-center px-6 relative">
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-primary/10 rounded-full blur-[140px]" />
        </div>

        <div className="max-w-xl w-full text-center py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-secondary/10 text-secondary border border-rose-500/30 mb-6">
            <Sparkles className="size-3.5 text-secondary" />
            <span>Error 404 &middot; Missing Route</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tight">
            <span className="gradient-text">404</span>
          </h1>

          <h2 className="text-xl md:text-2xl font-bold text-ink mb-3">
            Page Not Located
          </h2>

          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
            The requested address does not exist on this portfolio or has migrated to a consolidated flagship case study.
          </p>

          <div className="flex flex-wrap gap-3.5 justify-center items-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white font-semibold hover:opacity-90 transition-all inline-flex items-center gap-2 shadow-lg shadow-black/20 text-sm"
            >
              <Home className="size-4" />
              <span>Return to Homepage</span>
            </Link>

            <Link
              href="/resume"
              className="px-6 py-3 rounded-xl glass border border-primary/40 text-primary font-semibold hover:bg-primary/10 transition-all inline-flex items-center gap-2 text-sm"
            >
              <FileText className="size-4 text-primary" />
              <span>View Official Resume</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
