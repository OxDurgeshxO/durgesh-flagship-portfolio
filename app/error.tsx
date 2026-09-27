'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Unhandled interface fault occurred', error?.digest || 'no-digest')
  }, [error])

  return (
    <div className="min-h-screen bg-[var(--bg-primary,#0c0c14)] text-ink flex flex-col selection:bg-purple-500/30">
      <Navbar />
      <main id="main-content" className="flex-1 flex items-center justify-center px-6 relative">
        <div className="max-w-lg w-full text-center py-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-secondary/10 text-secondary border border-rose-500/30 mb-6">
            <AlertTriangle className="size-4 text-secondary" />
            <span>Operational Circuit Breaker</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-ink mb-3">
            An Unexpected Error Occurred
          </h1>

          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
            The application safely trapped an unhandled execution fault to safeguard your session. You can retry rendering or return home.
          </p>

          <div className="flex flex-wrap gap-3.5 justify-center items-center">
            <button
              onClick={() => reset()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white font-semibold hover:opacity-95 transition-all inline-flex items-center gap-2 shadow-lg shadow-black/20 text-sm cursor-pointer"
            >
              <RefreshCw className="size-4" />
              <span>Try Again</span>
            </button>

            <Link
              href="/"
              className="px-6 py-3 rounded-xl glass border border-white/15 text-ink font-semibold hover:border-purple-400 transition-all inline-flex items-center gap-2 text-sm"
            >
              <Home className="size-4" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
