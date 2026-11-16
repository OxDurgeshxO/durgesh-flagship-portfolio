'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import type { StudioTheme } from './types'

// Dynamic load of Three.js canvas
const SwissStudioCanvas = dynamic(() => import('./SwissStudioCanvas'), {
  ssr: false,
})

interface SwissStudioContextValue {
  studioTheme: StudioTheme
  setStudioTheme: (theme: StudioTheme) => void
  isXRay: boolean
  setIsXRay: (xray: boolean | ((prev: boolean) => boolean)) => void
  explodeProgress: number
  setExplodeProgress: (p: number) => void
}

const SwissStudioContext = createContext<SwissStudioContextValue>({
  studioTheme: 'cream',
  setStudioTheme: () => {},
  isXRay: false,
  setIsXRay: () => {},
  explodeProgress: 0,
  setExplodeProgress: () => {},
})

export const useSwissStudio = () => useContext(SwissStudioContext)

export function SwissStudioProvider({ children }: { children: React.ReactNode }) {
  const [studioTheme, setStudioTheme] = useState<StudioTheme>('cream')
  const [isXRay, setIsXRay] = useState(false)
  const [explodeProgress, setExplodeProgress] = useState(0)

  return (
    <SwissStudioContext.Provider
      value={{
        studioTheme,
        setStudioTheme,
        isXRay,
        setIsXRay,
        explodeProgress,
        setExplodeProgress,
      }}
    >
      {children}
    </SwissStudioContext.Provider>
  )
}

export function SwissUniversalBackground() {
  const pathname = usePathname()
  const { studioTheme, isXRay, explodeProgress } = useSwissStudio()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const isHome = pathname === '/'
  // Secondary pages maintain an ambient zero-gravity float
  const activeExplode = isHome ? explodeProgress : 0.05
  const isDark = studioTheme === 'darkroom'

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 3D WebGL Studio Cyclorama */}
      <SwissStudioCanvas
        explodeProgress={activeExplode}
        isXRay={isXRay}
        studioTheme={studioTheme}
      />

      {/* Atmospheric Contrast Scrim for secondary pages */}
      {!isHome && (
        <div
          className={`absolute inset-0 backdrop-blur-[2px] transition-colors duration-500 ${
            isDark ? 'bg-[#0D0E11]/75' : 'bg-[#F4F0E8]/70'
          }`}
        />
      )}
    </div>
  )
}

export default SwissUniversalBackground
