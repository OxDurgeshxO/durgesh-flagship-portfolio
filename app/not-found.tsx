import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { Home, FileText, Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary,#0c0c14)] text-slate-100 flex flex-col selection:bg-purple-500/30">
      <Navbar />
      <main id="main-content" className="flex-1 flex items-center justify-center px-6 relative">
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-purple-500/10 rounded-full blur-[140px]" />
        </div>

        <div className="max-w-xl w-full text-center py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30 mb-6">
            <Sparkles className="size-3.5 text-rose-400" />
            <span>Error 404 &middot; Missing Route</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tight">
            <span className="gradient-text">404</span>
          </h1>

          <h2 className="text-xl md:text-2xl font-bold text-slate-200 mb-3">
            Page Not Located
          </h2>

          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
            The requested address does not exist on this portfolio or has migrated to a consolidated flagship case study.
          </p>

          <div className="flex flex-wrap gap-3.5 justify-center items-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 text-white font-semibold hover:opacity-90 transition-all inline-flex items-center gap-2 shadow-lg shadow-purple-500/20 text-sm"
            >
              <Home className="size-4" />
              <span>Return to Homepage</span>
            </Link>

            <Link
              href="/resume"
              className="px-6 py-3 rounded-xl glass border border-purple-500/30 text-purple-200 font-semibold hover:bg-purple-500/10 transition-all inline-flex items-center gap-2 text-sm"
            >
              <FileText className="size-4 text-purple-400" />
              <span>View Official Resume</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
