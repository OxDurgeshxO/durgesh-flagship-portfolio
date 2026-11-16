'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { AssemblyProps } from '../types'

export default function WaveguideLouvers({ explodeProgress, isXRay, studioTheme, anchorRef }: AssemblyProps) {
  const louversGroupRef = useRef<THREE.Group>(null)
  const finsRef = useRef<(THREE.Mesh | null)[]>([])

  const finColor = studioTheme === 'darkroom' ? '#c8d0db' : '#e2e7ec'

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    if (louversGroupRef.current) {
      const targetY = explodeProgress * 0.75
      louversGroupRef.current.position.y = THREE.MathUtils.damp(
        louversGroupRef.current.position.y,
        targetY,
        6,
        delta
      )
    }

    finsRef.current.forEach((fin, i) => {
      if (fin) {
        // Harmonic zero-gravity subtle oscillation
        const harmonic = Math.sin(t * 1.5 + i * 0.45) * 0.04
        const explodeSpread = explodeProgress * (i - 3) * 0.12
        fin.rotation.z = THREE.MathUtils.damp(
          fin.rotation.z,
          harmonic + explodeSpread,
          6,
          delta
        )
      }
    })
  })

  // 7 acoustic fins
  const finIndices = [0, 1, 2, 3, 4, 5, 6]

  return (
    <group ref={anchorRef}>
      <group ref={louversGroupRef} position={[0, 0, -0.2]}>
        {finIndices.map((i) => {
          const yPos = (i - 3) * 0.22
          return (
            <mesh
              key={i}
              ref={(el) => {
                finsRef.current[i] = el
              }}
              position={[0, yPos, 0]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[1.5, 0.045, 0.55]} />
              <meshStandardMaterial
                color={finColor}
                roughness={0.28}
                metalness={0.88}
                wireframe={isXRay}
              />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}
