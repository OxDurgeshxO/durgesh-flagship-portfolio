"use client"

import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'

interface CoreMeshProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>
  prefersReducedMotion: boolean
}

function NeuralCore({ mouse, prefersReducedMotion }: CoreMeshProps) {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const innerSphereRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const particleCount = isMobile ? 50 : 160
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const sc = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = 1.6 + Math.random() * 2.2
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      sc[i] = Math.random() * 0.8 + 0.3
    }
    return [pos, sc]
  }, [particleCount])

  useFrame((state, delta) => {
    if (prefersReducedMotion) return

    const t = state.clock.getElapsedTime()

    if (groupRef.current) {
      const targetRotX = mouse.current.y * 0.35
      const targetRotY = mouse.current.x * 0.45
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 3, delta)
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 3, delta)
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.08
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25
      coreRef.current.rotation.x += delta * 0.15
      const pulse = 1 + Math.sin(t * 2.4) * 0.04
      coreRef.current.scale.set(pulse, pulse, pulse)
    }

    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.y -= delta * 0.4
      const innerPulse = 0.95 + Math.cos(t * 2.4) * 0.06
      innerSphereRef.current.scale.set(innerPulse, innerPulse, innerPulse)
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.4
      ring1Ref.current.rotation.y = t * 0.6
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.5
      ring2Ref.current.rotation.z = t * 0.35
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.08
      particlesRef.current.rotation.z = Math.sin(t * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh ref={innerSphereRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#9333ea"
          emissiveIntensity={1.35}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial
          color="#fb7185"
          emissive="#f43f5e"
          emissiveIntensity={0.85}
          wireframe
          transparent
          opacity={0.75}
        />
      </mesh>

      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.7, 0.015, 16, 100]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.75} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.95, 0.012, 16, 100]} />
        <meshBasicMaterial color="#fb7185" transparent opacity={0.7} />
      </mesh>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#f472b6"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      <pointLight color="#f43f5e" intensity={2.8} distance={6} decay={2} />
      <pointLight color="#a855f7" intensity={2.6} distance={6} decay={2} />
    </group>
  )
}

function AmbientCosmicField({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const count = isMobile ? 300 : 900

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (prefersReducedMotion) return
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.02
      pointsRef.current.rotation.x -= delta * 0.01
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#c084fc"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function AICoreScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const [dpr, setDpr] = useState(1.5)
  const [isVisible, setIsVisible] = useState(true)
  const [isIntersecting, setIsIntersecting] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouse.current = {
        x: (clientX / innerWidth) * 2 - 1,
        y: -(clientY / innerHeight) * 2 + 1,
      }
    }

    // Visibility Listener: Pause WebGL when browser tab is inactive
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible')
    }

    // Reduced Motion Detection
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    mediaQuery.addEventListener('change', handleMotionChange)

    // Viewport Intersection Observer: Pause loop when scrolled off-screen
    const currentContainer = containerRef.current
    let observer: IntersectionObserver | null = null
    if (currentContainer && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting)
        },
        { threshold: 0.05 }
      )
      observer.observe(currentContainer)
    }

    return () => {
      window.removeEventListener('pointermove', handleMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      mediaQuery.removeEventListener('change', handleMotionChange)
      if (observer && currentContainer) {
        observer.unobserve(currentContainer)
        observer.disconnect()
      }
    }
  }, [])

  const shouldRenderLoop = isVisible && isIntersecting && !prefersReducedMotion

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 48 }}
        dpr={dpr}
        frameloop={shouldRenderLoop ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(1.5)}
        />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-5, -5, -2]} intensity={0.5} color="#a855f7" />

        <AmbientCosmicField prefersReducedMotion={prefersReducedMotion} />
        <NeuralCore mouse={mouse} prefersReducedMotion={prefersReducedMotion} />
      </Canvas>
    </div>
  )
}