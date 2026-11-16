'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { StudioTheme } from './types'
import AcousticShells from './assemblies/AcousticShells'
import TitaniumGimbal from './assemblies/TitaniumGimbal'
import ResonatorCore from './assemblies/ResonatorCore'
import WaveguideLouvers from './assemblies/WaveguideLouvers'
import OpticalAperture from './assemblies/OpticalAperture'
import ArchitecturalPlinth from './assemblies/ArchitecturalPlinth'

interface KineticSculptureProps {
  explodeProgress: number
  isXRay: boolean
  studioTheme: StudioTheme
  mouse: React.MutableRefObject<{ x: number; y: number }>
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

export default function KineticSculpture({
  explodeProgress,
  isXRay,
  studioTheme,
  mouse,
  turntableAngle = 0,
  anchorRefs,
}: KineticSculptureProps) {
  const rootGroupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    if (rootGroupRef.current) {
      // Phase 1: Subtle spring tilt following cursor
      const targetRotX = -mouse.current.y * 0.22 + Math.sin(t * 0.8) * 0.03
      const targetRotY = mouse.current.x * 0.32 + turntableAngle

      rootGroupRef.current.rotation.x = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.x,
        targetRotX,
        4.5,
        delta
      )
      rootGroupRef.current.rotation.y = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.y,
        targetRotY,
        4.5,
        delta
      )

      // Zero-gravity subtle levitation float
      const levitate = Math.sin(t * 1.2) * 0.06
      rootGroupRef.current.position.y = THREE.MathUtils.damp(
        rootGroupRef.current.position.y,
        levitate,
        3.5,
        delta
      )
    }
  })

  return (
    <group ref={rootGroupRef} position={[0, 0.35, 0]} scale={[1.1, 1.1, 1.1]}>
      {/* 1. Outer Acoustic Shells */}
      <AcousticShells
        explodeProgress={explodeProgress}
        isXRay={isXRay}
        studioTheme={studioTheme}
        anchorRef={anchorRefs?.shells}
      />

      {/* 2. Anodized Titanium Gimbal Ring */}
      <TitaniumGimbal
        explodeProgress={explodeProgress}
        isXRay={isXRay}
        studioTheme={studioTheme}
        anchorRef={anchorRefs?.gimbal}
      />

      {/* 3. Subsurface Resonator Core */}
      <ResonatorCore
        explodeProgress={explodeProgress}
        isXRay={isXRay}
        studioTheme={studioTheme}
        anchorRef={anchorRefs?.core}
      />

      {/* 4. Kinetic Waveguide Louvers */}
      <WaveguideLouvers
        explodeProgress={explodeProgress}
        isXRay={isXRay}
        studioTheme={studioTheme}
        anchorRef={anchorRefs?.louvers}
      />

      {/* 5. Optical Aperture Lens & Brass Collar */}
      <OpticalAperture
        explodeProgress={explodeProgress}
        isXRay={isXRay}
        studioTheme={studioTheme}
        anchorRef={anchorRefs?.aperture}
      />

      {/* 6. Architectural Plinth & Magnetic Coupler */}
      <ArchitecturalPlinth
        explodeProgress={explodeProgress}
        isXRay={isXRay}
        studioTheme={studioTheme}
        anchorRef={anchorRefs?.plinth}
      />
    </group>
  )
}
