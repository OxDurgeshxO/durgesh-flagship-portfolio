'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export interface ExplodedChoreographyState {
  progress: number // smoothed 0 -> 1
  targetProgress: number
  isManualScrubbing: boolean
  setTargetProgress: (p: number) => void
  onScrubChange: (val: number) => void
}

export function useExplodedChoreography(heroElementRef?: React.RefObject<HTMLElement | null>): ExplodedChoreographyState {
  const [progress, setProgress] = useState(0)
  const [targetProgress, setTargetProgressState] = useState(0)
  const isScrubbingRef = useRef(false)
  const targetRef = useRef(0)
  const currentRef = useRef(0)

  const setTargetProgress = useCallback((p: number) => {
    const clamped = Math.max(0, Math.min(1, p))
    targetRef.current = clamped
    setTargetProgressState(clamped)
  }, [])

  const onScrubChange = useCallback((val: number) => {
    isScrubbingRef.current = true
    setTargetProgress(val)
  }, [setTargetProgress])

  useEffect(() => {
    const handleScroll = () => {
      // If user is actively using the timeline scrubber, let scrubber take precedence
      if (isScrubbingRef.current) return

      const scrollY = window.scrollY || window.pageYOffset
      const heroHeight = heroElementRef?.current?.offsetHeight || window.innerHeight
      // 0 to 1 over first 80% of hero scroll
      const rawProgress = scrollY / (heroHeight * 0.85)
      setTargetProgress(rawProgress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [heroElementRef, setTargetProgress])

  // Smooth lerp loop for 60fps damped inertial motion
  useEffect(() => {
    let animId: number
    const lerpFactor = 0.085

    const tick = () => {
      const diff = targetRef.current - currentRef.current
      if (Math.abs(diff) > 0.0005) {
        currentRef.current += diff * lerpFactor
        setProgress(parseFloat(currentRef.current.toFixed(4)))
      } else if (currentRef.current !== targetRef.current) {
        currentRef.current = targetRef.current
        setProgress(targetRef.current)
      }
      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [])

  return {
    progress,
    targetProgress,
    isManualScrubbing: isScrubbingRef.current,
    setTargetProgress,
    onScrubChange,
  }
}
