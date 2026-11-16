'use client'

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { StudioTheme } from './types'
import KineticSculpture from './KineticSculpture'

function CameraController({ explodeProgress }: { explodeProgress: number }) {
  useFrame((state, delta) => {
    const targetZ = 7.0 + explodeProgress * 3.2
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      targetZ,
      4.0,
      delta
    )
  })
  return null
}

interface SwissStudioCanvasProps {
  explodeProgress?: number
  isXRay?: boolean
  studioTheme?: StudioTheme
  turntableAngle?: number
  anchorRefs?: {
    shells?: React.Ref<THREE.Group>
    gimbal?: React.Ref<THREE.Group>
    core?: React.Ref<THREE.Group>
    louvers?: React.Ref<THREE.Group>
    aperture?: React.Ref<THREE.Group>
    plinth?: React.Ref<THREE.Group>
  }
}

export default function SwissStudioCanvas({
  explodeProgress = 0,
  isXRay = false,
  studioTheme = 'cream',
  turntableAngle = 0,
  anchorRefs,
}: SwissStudioCanvasProps) {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  const isDark = studioTheme === 'darkroom'
  const bgColor = isDark ? '#0D0E11' : '#F4F0E8'
  const fogDensity = isDark ? 0.055 : 0.045

  return (
    <div className="relative w-full h-full inset-0 pointer-events-auto">
      <Canvas
        shadows={{ type: THREE.PCFSoftShadowMap }}
        camera={{ position: [0, 0, 7.5], fov: 38 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isDark ? 1.25 : 1.05,
        }}
        dpr={[1, 2]}
      >
        {/* Studio Cyclorama & Fog */}
        <color attach="background" args={[bgColor]} />
        <fogExp2 attach="fog" args={[bgColor, fogDensity]} />

        {/* Studio Lighting Rig */}
        <ambientLight intensity={isDark ? 0.35 : 0.75} />

        {/* Soft Key Light */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={isDark ? 1.4 : 1.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={25}
          shadow-camera-left={-4}
          shadow-camera-right={4}
          shadow-camera-top={4}
          shadow-camera-bottom={-4}
          shadow-bias={-0.00015}
        />

        {/* Diffused Studio Fill Light */}
        <directionalLight
          position={[-6, 4, 3]}
          intensity={isDark ? 0.5 : 0.8}
          color={isDark ? '#4A6FA5' : '#FFFFFF'}
        />

        {/* Rim Light (Boosted in darkroom mode) */}
        <directionalLight
          position={[0, -4, -6]}
          intensity={isDark ? 2.4 : 0.6}
          color={isDark ? '#D96B43' : '#FDFBF7'}
        />

        {/* Grounded Shadow-Receiving Floor */}
        <mesh position={[0, -2.4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <shadowMaterial opacity={isDark ? 0.55 : 0.16} />
        </mesh>

        {/* Camera Pullback Controller */}
        <CameraController explodeProgress={explodeProgress} />

        {/* Central Kinetic Sculpture */}
        <KineticSculpture
          explodeProgress={explodeProgress}
          isXRay={isXRay}
          studioTheme={studioTheme}
          mouse={mouse}
          turntableAngle={turntableAngle || explodeProgress * Math.PI * 2}
          anchorRefs={anchorRefs}
        />
      </Canvas>
    </div>
  )
}
