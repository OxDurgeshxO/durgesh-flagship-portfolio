'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { AssemblyProps } from '../types'

export default function ResonatorCore({ explodeProgress, isXRay, studioTheme, anchorRef }: AssemblyProps) {
  const outerSphereRef = useRef<THREE.Mesh>(null)
  const nucleusRef = useRef<THREE.Mesh>(null)
  const coreGroupRef = useRef<THREE.Group>(null)

  const isDark = studioTheme === 'darkroom'
  const glowIntensity = isDark ? 1.8 : 0.85

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    if (coreGroupRef.current) {
      const targetZ = explodeProgress * 0.4
      coreGroupRef.current.position.z = THREE.MathUtils.damp(coreGroupRef.current.position.z, targetZ, 6, delta)
    }

    if (nucleusRef.current) {
      nucleusRef.current.rotation.x = t * 0.6
      nucleusRef.current.rotation.y = t * 0.8
      const pulse = 1 + Math.sin(t * 3) * 0.05
      nucleusRef.current.scale.set(pulse, pulse, pulse)
    }
  })

  return (
    <group ref={anchorRef}>
      <group ref={coreGroupRef}>
        {/* Subsurface Translucent Terracotta-Amber Resin Sphere */}
        <mesh ref={outerSphereRef} castShadow>
          <sphereGeometry args={[0.72, 64, 64]} />
          <meshPhysicalMaterial
            color="#D96B43"
            transmission={0.88}
            opacity={1}
            transparent={true}
            roughness={0.12}
            ior={1.48}
            thickness={1.5}
            specularIntensity={1.0}
            attenuationColor={new THREE.Color('#D96B43')}
            attenuationDistance={0.7}
            wireframe={isXRay}
          />
        </mesh>

        {/* Softly Glowing Geometric Nucleus */}
        <mesh ref={nucleusRef}>
          <octahedronGeometry args={[0.32, 0]} />
          <meshStandardMaterial
            color="#FFA768"
            emissive="#D96B43"
            emissiveIntensity={glowIntensity}
            roughness={0.2}
            metalness={0.4}
            wireframe={isXRay}
          />
        </mesh>

        {/* Subtle Internal Point Light */}
        <pointLight
          color="#FF8A50"
          intensity={isDark ? 2.2 : 1.2}
          distance={3.5}
          decay={2}
        />
      </group>
    </group>
  )
}
