"use client"
import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { TypeAnimation } from 'react-type-animation'
import { OWNER } from '@/lib/data'

function StarField(props: any) {
  const ref = useRef<any>()
  const sphere = useMemo(() => {
    const arr = new Float32Array(5001 * 3)
    for (let i = 0; i < arr.length; i += 3) {
      const r = Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i]   = r * Math.sin(phi) * Math.cos(theta)
      arr[i+1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i+2] = r * Math.cos(phi)
    }
    return arr
  }, [])
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 30
      ref.current.rotation.y -= delta / 20
    }
  })
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#6c63ff" size={0.004} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  )
}

export default function HeroSection() {
  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <StarField />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f] z-10" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] z-10" />
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-cyan-400/10 rounded-full blur-[100px] z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/40 text-purple-300 text-sm mb-6 glass">
          👋 Welcome to my portfolio
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
          <span className="gradient-text">{OWNER.name}</span>
        </h1>
        <div className="text-xl md:text-2xl text-slate-300 mb-8 h-10">
          <TypeAnimation
            sequence={[
              'AIML Engineer 🤖', 2000,
              'Full-Stack Developer 💻', 2000,
              'AI Automation Builder ⚡', 2000,
              'Prompt Engineer 🧠', 2000,
              'Autonomous Systems Dev 🚀', 2000,
            ]}
            repeat={Infinity}
            wrapper="span"
          />
        </div>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">{OWNER.bio}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#projects"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition-all glow-purple">
            View Projects
          </a>
          <a href="#contact"
            className="px-8 py-3 rounded-xl glass border border-purple-500/40 text-purple-300 font-semibold hover:bg-purple-500/10 transition-all">
            Contact Me
          </a>
          <a href={OWNER.github} target="_blank" rel="noopener noreferrer"
            className="px-8 py-3 rounded-xl glass border border-slate-500/40 text-slate-300 font-semibold hover:border-purple-400/50 transition-all">
            GitHub ↗
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
          <span className="text-xs">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-purple-500 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  )
}
