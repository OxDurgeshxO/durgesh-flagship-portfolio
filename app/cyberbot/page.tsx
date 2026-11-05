import React from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const CyberBotStudioShell = dynamic(
  () => import('@/components/companion/CyberBotStudioShell'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#07050e] flex items-center justify-center text-slate-400 font-mono text-sm">
        Initializing 3D CyberBot Studio...
      </div>
    ),
  }
)

export const metadata: Metadata = {
  title: 'CyberBot AI | 3D Interactive Companion (Three.js & R3F)',
  alternates: {
    canonical: '/cyberbot',
  },
  description:
    'Meet CyberBot AI: an interactive 3D procedural companion rendered with Three.js and React Three Fiber featuring real-time look-at kinematics, acrobatic stunts, and portfolio voice guidance.',
  openGraph: {
    title: 'CyberBot AI - 3D Companion Studio | Durgesh Dutt Sinha',
    description:
      'Interactive procedural 3D companion with 3-point studio lighting, dual neon antenna loops, and real-time WebGL kinematics.',
  },
}

export default function CyberBotPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#07050e]">
      <h1 className="sr-only">CyberBot 3D Studio</h1>
      <CyberBotStudioShell />
    </main>
  )
}
