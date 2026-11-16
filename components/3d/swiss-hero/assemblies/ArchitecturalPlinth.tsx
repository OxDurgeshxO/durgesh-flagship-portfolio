'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { AssemblyProps } from '../types'

export default function ArchitecturalPlinth({ explodeProgress, isXRay, studioTheme, anchorRef }: AssemblyProps) {
  const plinthGroupRef = useRef<THREE.Group>(null)

  const slateColor = studioTheme === 'darkroom' ? '#14161b' : '#2b2e35'
  const magnetColor = studioTheme === 'darkroom' ? '#717b88' : '#adb5bd'

  useFrame((_, delta) => {
    if (plinthGroupRef.current) {
      const targetY = -1.45 - explodeProgress * 0.95
      plinthGroupRef.current.position.y = THREE.MathUtils.damp(
        plinthGroupRef.current.position.y,
        targetY,
        6,
        delta
      )
    }
  })

  // 4 floating neodymium magnetic discs
  const discOffsets = [
    [-0.45, -0.45],
    [0.45, -0.45],
    [-0.45, 0.45],
    [0.45, 0.45],
  ]

  return (
    <group ref={anchorRef}>
      <group ref={plinthGroupRef} position={[0, -1.45, 0]}>
        {/* Brutalist Slate Stone Pedestal */}
        <mesh position={[0, -0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.42, 1.5]} />
          <meshStandardMaterial
            color={slateColor}
            roughness={0.88}
            metalness={0.12}
            wireframe={isXRay}
          />
        </mesh>

        {/* Stepped Upper Pedestal Rim */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.1, 1.2]} />
          <meshStandardMaterial
            color={slateColor}
            roughness={0.82}
            metalness={0.18}
            wireframe={isXRay}
          />
        </mesh>

        {/* Floating Neodymium Magnetic Discs */}
        {discOffsets.map(([x, z], i) => (
          <mesh key={i} position={[x, 0.12, z]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.04, 24]} />
            <meshStandardMaterial
              color={magnetColor}
              roughness={0.15}
              metalness={0.96}
              wireframe={isXRay}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}
