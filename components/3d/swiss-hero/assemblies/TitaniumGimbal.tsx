'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { AssemblyProps } from '../types'

export default function TitaniumGimbal({ explodeProgress, isXRay, studioTheme, anchorRef }: AssemblyProps) {
  const gimbalRef = useRef<THREE.Group>(null)

  const titaniumColor = studioTheme === 'darkroom' ? '#181a1f' : '#22252a'
  const fastenerColor = studioTheme === 'darkroom' ? '#8a93a0' : '#4d5563'

  useFrame((_, delta) => {
    if (gimbalRef.current) {
      const targetY = explodeProgress * 0.95
      const targetRotX = explodeProgress * 0.45
      gimbalRef.current.position.y = THREE.MathUtils.damp(gimbalRef.current.position.y, targetY, 6, delta)
      gimbalRef.current.rotation.x = THREE.MathUtils.damp(gimbalRef.current.rotation.x, targetRotX, 6, delta)
    }
  })

  // 8 CNC radial fasteners
  const fastenerAngles = [0, 45, 90, 135, 180, 225, 270, 315]

  return (
    <group ref={anchorRef}>
      <group ref={gimbalRef}>
        {/* Primary Torus Ring */}
        <mesh castShadow receiveShadow>
          <torusGeometry args={[1.65, 0.08, 16, 64]} />
          <meshStandardMaterial
            color={titaniumColor}
            roughness={0.32}
            metalness={0.92}
            wireframe={isXRay}
          />
        </mesh>

        {/* Inner Recessed Channel Ring */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1.56, 0.02, 12, 64]} />
          <meshStandardMaterial
            color="#111317"
            roughness={0.5}
            metalness={0.8}
            wireframe={isXRay}
          />
        </mesh>

        {/* CNC Micro Fasteners */}
        {fastenerAngles.map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          const x = Math.cos(rad) * 1.65
          const y = Math.sin(rad) * 1.65
          return (
            <mesh key={i} position={[x, y, 0]} castShadow>
              <cylinderGeometry args={[0.025, 0.025, 0.18, 12]} />
              <meshStandardMaterial
                color={fastenerColor}
                roughness={0.2}
                metalness={0.98}
                wireframe={isXRay}
              />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}
