'use client'

import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { AssemblyProps } from '../types'

export default function OpticalAperture({ explodeProgress, isXRay, anchorRef }: AssemblyProps) {
  const barrelGroupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (barrelGroupRef.current) {
      const targetZ = 0.65 + explodeProgress * 1.15
      barrelGroupRef.current.position.z = THREE.MathUtils.damp(
        barrelGroupRef.current.position.z,
        targetZ,
        6,
        delta
      )
    }
  })

  return (
    <group ref={anchorRef}>
      <group ref={barrelGroupRef} position={[0, 0, 0.65]}>
        {/* Stepped Champagne Brass Barrel */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.48, 0.54, 0.28, 48]} />
          <meshStandardMaterial
            color="#D4AF37"
            roughness={0.24}
            metalness={0.92}
            wireframe={isXRay}
          />
        </mesh>

        {/* Knurled Grip Ring */}
        <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.52, 0.04, 16, 48]} />
          <meshStandardMaterial
            color="#BFA130"
            roughness={0.45}
            metalness={0.88}
            wireframe={isXRay}
          />
        </mesh>

        {/* Front Stepped Collar */}
        <mesh position={[0, 0, 0.16]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.42, 0.48, 0.1, 48]} />
          <meshStandardMaterial
            color="#C6A22C"
            roughness={0.28}
            metalness={0.95}
            wireframe={isXRay}
          />
        </mesh>

        {/* Coated Domed Glass Lens */}
        <mesh position={[0, 0, 0.19]} castShadow>
          <sphereGeometry args={[0.38, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.35]} />
          <meshPhysicalMaterial
            color="#00FFFF"
            transmission={0.94}
            opacity={1}
            transparent={true}
            roughness={0.06}
            ior={1.52}
            reflectivity={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            wireframe={isXRay}
          />
        </mesh>
      </group>
    </group>
  )
}
