"use client"

import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CyberBotProps {
  isHovered: boolean
  isSpinning: boolean
  spinProgress: number
  mousePos: { x: number; y: number }
  mood: 'normal' | 'happy' | 'stunt'
}

export default function CyberBotModel({
  isHovered,
  isSpinning,
  spinProgress,
  mousePos,
  mood,
}: CyberBotProps) {
  const groupRef = useRef<THREE.Group>(null)
  const haloOuterRef = useRef<THREE.Mesh>(null)
  const haloInnerRef = useRef<THREE.Mesh>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const eyeLeftRef = useRef<THREE.Mesh>(null)
  const eyeRightRef = useRef<THREE.Mesh>(null)
  const leftHandRef = useRef<THREE.Group>(null)
  const rightHandRef = useRef<THREE.Group>(null)
  const thrusterFlameRef = useRef<THREE.Mesh>(null)

  // Floating ambient cyber spark particles
  const sparkCount = 24
  const sparkPositions = useMemo(() => {
    const pos = new Float32Array(sparkCount * 3)
    for (let i = 0; i < sparkCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 2.0
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.0
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5
    }
    return pos
  }, [])

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()

    if (groupRef.current) {
      // Smooth hovering bob
      const hoverAmp = isHovered ? 0.05 : 0.1
      groupRef.current.position.y = Math.sin(time * 2.5) * hoverAmp

      // 360° Stunt Spin
      if (isSpinning) {
        groupRef.current.rotation.y = spinProgress * Math.PI * 2
        groupRef.current.rotation.z = Math.sin(spinProgress * Math.PI) * 0.5
        groupRef.current.rotation.x = Math.sin(spinProgress * Math.PI) * 0.3
      } else {
        // Natural lean & look towards cursor
        const targetRotY = (mousePos.x - 0.5) * 1.0
        const targetRotX = -(mousePos.y - 0.5) * 0.7
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1)
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1)
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, (mousePos.x - 0.5) * -0.4, 0.1)
      }
    }

    // Dual Counter-Rotating Holographic Halos
    if (haloOuterRef.current && haloInnerRef.current) {
      haloOuterRef.current.rotation.y += delta * (isHovered ? 3.5 : 1.5)
      haloOuterRef.current.rotation.x = Math.sin(time * 2) * 0.2
      haloInnerRef.current.rotation.y -= delta * (isHovered ? 2.5 : 1.0)
      haloInnerRef.current.rotation.z = Math.cos(time * 2) * 0.2
    }

    // Arc Reactor Core Pulse
    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 6) * 0.15
      coreRef.current.scale.set(pulse, pulse, pulse)
    }

    // Floating Magnetic Hands
    if (leftHandRef.current && rightHandRef.current) {
      const wave = Math.sin(time * 4) * 0.08
      leftHandRef.current.position.y = -0.15 + (isHovered ? wave * 2 + 0.1 : wave)
      rightHandRef.current.position.y = -0.15 + (isHovered ? -wave * 2 + 0.1 : -wave)
      if (isHovered) {
        rightHandRef.current.rotation.z = 0.5 + Math.sin(time * 8) * 0.25 // wave hand!
      } else {
        rightHandRef.current.rotation.z = 0
      }
    }

    // Jetpack Thruster Flame Pulse
    if (thrusterFlameRef.current) {
      const flameScale = 0.9 + Math.sin(time * 12) * 0.25
      thrusterFlameRef.current.scale.set(1, flameScale, 1)
    }

    // Eye blinking / expression
    if (eyeLeftRef.current && eyeRightRef.current) {
      const blink = Math.sin(time * 0.7) > 0.96 ? 0.1 : 1
      const scaleY = mood === 'happy' ? 0.35 : blink
      eyeLeftRef.current.scale.y = scaleY
      eyeRightRef.current.scale.y = scaleY
    }
  })

  const primaryGlow = isHovered ? '#00ffff' : '#38bdf8'
  const accentGlow = isHovered ? '#a855f7' : '#c084fc'
  const armorColor = '#f1f5f9' // Crisp Pearlescent Platinum White
  const darkChassisColor = '#0f172a' // Midnight Obsidian Slate

  return (
    <group ref={groupRef} dispose={null} scale={[1.15, 1.15, 1.15]}>
      {/* Studio 3-Point Lighting for High-End 3D Definition */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 4]} intensity={2.8} color="#ffffff" />
      <directionalLight position={[-4, 2, -2]} intensity={2.2} color="#00ffff" />
      <pointLight position={[0, -2, -1]} intensity={3.0} color="#a855f7" />
      <pointLight position={[0, 0.4, 1.2]} intensity={isHovered ? 3.5 : 2.0} color={primaryGlow} distance={3} />

      {/* Outer Holographic Halo */}
      <mesh ref={haloOuterRef} position={[0, 0.85, 0]}>
        <torusGeometry args={[0.42, 0.02, 16, 48]} />
        <meshStandardMaterial
          color={primaryGlow}
          emissive={primaryGlow}
          emissiveIntensity={isHovered ? 4.0 : 2.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Inner Holographic Halo */}
      <mesh ref={haloInnerRef} position={[0, 0.85, 0]}>
        <torusGeometry args={[0.34, 0.015, 16, 36]} />
        <meshStandardMaterial
          color={accentGlow}
          emissive={accentGlow}
          emissiveIntensity={isHovered ? 3.5 : 1.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* HEAD ASSEMBLY */}
      <group position={[0, 0.28, 0]}>
        {/* Helmet / Glossy White Shell */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.44, 32, 32]} />
          <meshStandardMaterial
            color={armorColor}
            roughness={0.15}
            metalness={0.4}
            envMapIntensity={2.0}
          />
        </mesh>

        {/* Head Crest / Trim Accent */}
        <mesh position={[0, 0.36, 0.08]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.12, 0.16, 0.48]} />
          <meshStandardMaterial
            color={darkChassisColor}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Visor Bezel Frame */}
        <mesh position={[0, 0, 0.2]}>
          <boxGeometry args={[0.62, 0.32, 0.28]} />
          <meshStandardMaterial
            color={darkChassisColor}
            roughness={0.25}
            metalness={0.85}
          />
        </mesh>

        {/* Visor Curved Glass Screen */}
        <mesh position={[0, 0, 0.35]}>
          <sphereGeometry args={[0.32, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
          <meshStandardMaterial
            color="#020617"
            roughness={0.05}
            metalness={0.95}
          />
        </mesh>

        {/* Expressive Glowing Eyes */}
        <mesh ref={eyeLeftRef} position={[-0.12, 0.02, 0.48]}>
          <capsuleGeometry args={[0.035, 0.06, 8, 16]} />
          <meshStandardMaterial
            color={primaryGlow}
            emissive={primaryGlow}
            emissiveIntensity={4.5}
          />
        </mesh>
        <mesh ref={eyeRightRef} position={[0.12, 0.02, 0.48]}>
          <capsuleGeometry args={[0.035, 0.06, 8, 16]} />
          <meshStandardMaterial
            color={primaryGlow}
            emissive={primaryGlow}
            emissiveIntensity={4.5}
          />
        </mesh>

        {/* Cyber Ear Antenna Nodes */}
        <mesh position={[-0.46, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.09, 0.08, 16]} />
          <meshStandardMaterial color={darkChassisColor} metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[-0.51, 0, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color={primaryGlow} emissive={primaryGlow} emissiveIntensity={3.0} />
        </mesh>

        <mesh position={[0.46, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.09, 0.08, 16]} />
          <meshStandardMaterial color={darkChassisColor} metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.51, 0, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color={primaryGlow} emissive={primaryGlow} emissiveIntensity={3.0} />
        </mesh>
      </group>

      {/* TORSO / CHASSIS */}
      <group position={[0, -0.22, 0]}>
        {/* Chest Armor Plate */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.26, 0.18, 0.36, 24]} />
          <meshStandardMaterial
            color={armorColor}
            roughness={0.2}
            metalness={0.35}
          />
        </mesh>

        {/* Reactor Core Bezel */}
        <mesh position={[0, 0.02, 0.16]}>
          <torusGeometry args={[0.1, 0.025, 16, 32]} />
          <meshStandardMaterial color={darkChassisColor} metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Pulsing Arc Reactor Heart */}
        <mesh ref={coreRef} position={[0, 0.02, 0.16]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color={primaryGlow}
            emissive={primaryGlow}
            emissiveIntensity={isHovered ? 5.0 : 3.0}
            roughness={0.1}
          />
        </mesh>

        {/* Jetpack Module on Back */}
        <mesh position={[0, 0.04, -0.2]}>
          <boxGeometry args={[0.3, 0.28, 0.15]} />
          <meshStandardMaterial color={darkChassisColor} metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Lower Thruster Nozzle */}
        <mesh position={[0, -0.24, 0]}>
          <coneGeometry args={[0.14, 0.18, 20]} />
          <meshStandardMaterial color={darkChassisColor} metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Ion Jet Flame */}
        <mesh ref={thrusterFlameRef} position={[0, -0.38, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.09, 0.22, 16]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={isHovered ? 5.5 : 3.5}
            transparent
            opacity={0.88}
          />
        </mesh>
      </group>

      {/* FLOATING MAGNETIC HANDS */}
      <group ref={leftHandRef} position={[-0.44, -0.15, 0.05]}>
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={armorColor} roughness={0.15} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshStandardMaterial color={primaryGlow} emissive={primaryGlow} emissiveIntensity={3.0} />
        </mesh>
      </group>

      <group ref={rightHandRef} position={[0.44, -0.15, 0.05]}>
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={armorColor} roughness={0.15} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshStandardMaterial color={primaryGlow} emissive={primaryGlow} emissiveIntensity={3.0} />
        </mesh>
      </group>

      {/* Ambient Sparks */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={sparkCount}
            array={sparkPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color={isHovered ? '#00ffff' : '#38bdf8'}
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
