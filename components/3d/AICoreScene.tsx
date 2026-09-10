"use client"

import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'

interface CoreMeshProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>
}

function NeuralCore({ mouse }: CoreMeshProps) {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const innerSphereRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Priority 1: Mobile Performance Scaling (auto-adjust particle count)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const particleCount = isMobile ? 60 : 180
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
    const t = state.clock.getElapsedTime()

    // Smooth mouse lerp
    if (groupRef.current) {
      const targetRotX = mouse.current.y * 0.4
      const targetRotY = mouse.current.x * 0.5
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 3, delta)
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 3, delta)
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.08
    }

    // Outer wireframe core rotation & breathing
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25
      coreRef.current.rotation.x += delta * 0.15
      const pulse = 1 + Math.sin(t * 2.4) * 0.04
      coreRef.current.scale.set(pulse, pulse, pulse)
    }

    // Inner glowing sphere
    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.y -= delta * 0.4
      const innerPulse = 0.95 + Math.cos(t * 2.4) * 0.06
      innerSphereRef.current.scale.set(innerPulse, innerPulse, innerPulse)
    }

    // Counter-rotating quantum energy rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.4
      ring1Ref.current.rotation.y = t * 0.6
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.5
      ring2Ref.current.rotation.z = t * 0.35
    }

    // Swirling particle field
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.08
      particlesRef.current.rotation.z = Math.sin(t * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Solid Glowing Energy Sphere */}
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

      {/* Outer Geodesic Icosahedron Wireframe */}
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

      {/* Orbital Quantum Ring 1 (Sunset Violet) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.7, 0.015, 16, 100]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.75} />
      </mesh>

      {/* Orbital Quantum Ring 2 (Rose Quartz) */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.95, 0.012, 16, 100]} />
        <meshBasicMaterial color="#fb7185" transparent opacity={0.7} />
      </mesh>

      {/* Floating Neural Energy Particles */}
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

      {/* Point Lights inside the core for rich specular depth */}
      <pointLight color="#f43f5e" intensity={2.8} distance={6} decay={2} />
      <pointLight color="#a855f7" intensity={2.6} distance={6} decay={2} />
    </group>
  )
}

function AmbientCosmicField() {
  const pointsRef = useRef<THREE.Points>(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const count = isMobile ? 400 : 1200

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
  const mouse = useRef({ x: 0, y: 0 })
  const [dpr, setDpr] = useState(1.5)

  React.useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouse.current = {
        x: (clientX / innerWidth) * 2 - 1,
        y: -(clientY / innerHeight) * 2 + 1,
      }
    }
    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 48 }}
        dpr={dpr}
        gl={{ antialias: true, alpha: true }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(1.5)}
        />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-5, -5, -2]} intensity={0.5} color="#a855f7" />

        <AmbientCosmicField />
        <NeuralCore mouse={mouse} />
      </Canvas>
    </div>
  )
}
