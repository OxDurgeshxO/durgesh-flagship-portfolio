'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { AssemblyProps } from '../types'

export default function AcousticShells({ explodeProgress, isXRay, studioTheme, anchorRef }: AssemblyProps) {
  const leftShellRef = useRef<THREE.Group>(null)
  const rightShellRef = useRef<THREE.Group>(null)

  const shellColor = studioTheme === 'darkroom' ? '#1c1e24' : '#ebe5dc'
  const ribColor = studioTheme === 'darkroom' ? '#2e323b' : '#d8cfc4'

  useFrame((_, delta) => {
    const targetOffset = explodeProgress * 1.35
    if (leftShellRef.current) {
      leftShellRef.current.position.x = THREE.MathUtils.damp(
        leftShellRef.current.position.x,
        -0.85 - targetOffset,
        6,
        delta
      )
    }
    if (rightShellRef.current) {
      rightShellRef.current.position.x = THREE.MathUtils.damp(
        rightShellRef.current.position.x,
        0.85 + targetOffset,
        6,
        delta
      )
    }
  })

  return (
    <group ref={anchorRef}>
      {/* Left Porcelain Shield */}
      <group ref={leftShellRef} position={[-0.85, 0, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.9, 1.1, 1.8, 32, 1, false, Math.PI * 0.55, Math.PI * 0.9]} />
          <meshStandardMaterial
            color={shellColor}
            roughness={0.78}
            metalness={0.05}
            wireframe={isXRay}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Chamfered Ribs */}
        {[-0.6, 0, 0.6].map((y, i) => (
          <mesh key={i} position={[-0.08, y, 0]} castShadow>
            <torusGeometry args={[0.98, 0.035, 12, 24, Math.PI * 0.85]} />
            <meshStandardMaterial
              color={ribColor}
              roughness={0.65}
              metalness={0.15}
              wireframe={isXRay}
            />
          </mesh>
        ))}
      </group>

      {/* Right Porcelain Shield */}
      <group ref={rightShellRef} position={[0.85, 0, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.9, 1.1, 1.8, 32, 1, false, -Math.PI * 0.45, Math.PI * 0.9]} />
          <meshStandardMaterial
            color={shellColor}
            roughness={0.78}
            metalness={0.05}
            wireframe={isXRay}
            side={THREE.DoubleSide}
          />
        </mesh>
        {[-0.6, 0, 0.6].map((y, i) => (
          <mesh key={i} position={[0.08, y, 0]} castShadow>
            <torusGeometry args={[0.98, 0.035, 12, 24, Math.PI * 0.85]} />
            <meshStandardMaterial
              color={ribColor}
              roughness={0.65}
              metalness={0.15}
              wireframe={isXRay}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}
