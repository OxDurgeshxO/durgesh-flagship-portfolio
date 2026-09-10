"use client"

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface CardTilt3DProps {
  children: React.ReactNode
  className?: string
  accentColor?: string
  tiltMax?: number
}

export default function CardTilt3D({
  children,
  className = '',
  accentColor = '#a855f7',
  tiltMax = 9,
}: CardTilt3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Raw mouse coordinates normalized from -0.5 to 0.5
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for buttery-smooth tilt response
  const springConfig = { damping: 20, stiffness: 180, mass: 0.6 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // Rotate mapping (mouse Y drives rotateX; mouse X drives rotateY)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [tiltMax, -tiltMax])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-tiltMax, tiltMax])

  // Specular sheen highlight position (percentage 0% to 100%)
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1100 }}
      className={`relative rounded-2xl transition-shadow duration-500 ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full relative"
      >
        {children}

        {/* Dynamic Holographic Specular Glare Sheen */}
        <motion.div
          aria-hidden
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle 320px at ${gx} ${gy}, ${accentColor}25, transparent 70%)`
            ),
            opacity: isHovered ? 1 : 0,
          }}
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-20 mix-blend-screen"
        />
      </motion.div>
    </div>
  )
}
