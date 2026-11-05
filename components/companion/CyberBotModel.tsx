"use client"

import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CyberBotSkinId, CYBERBOT_SKINS } from '@/lib/companion/skins'

interface CyberBotProps {
  isHovered: boolean
  isSpinning: boolean
  spinProgress: number
  mousePos: { x: number; y: number }
  mood: 'normal' | 'happy' | 'stunt'
  isSpeaking?: boolean
  isDancing?: boolean
  skin?: CyberBotSkinId
}

export default function CyberBotModel({
  isHovered,
  isSpinning,
  spinProgress,
  mousePos,
  mood,
  isSpeaking = false,
  isDancing = false,
  skin = 'cobalt-prime',
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

  const skinConfig = CYBERBOT_SKINS[skin] || CYBERBOT_SKINS['cobalt-prime']

  // Mobile performance scaling
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const sparkCount = isMobile ? 8 : 24
  const sparkPositions = useMemo(() => {
    const pos = new Float32Array(sparkCount * 3)
    for (let i = 0; i < sparkCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 2.0
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.0
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5
    }
    return pos
  }, [sparkCount])

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
      } else if (isDancing) {
        // Rhythmic beat groove
        groupRef.current.position.y += Math.sin(time * 8) * 0.05
        groupRef.current.rotation.z = Math.sin(time * 6) * 0.14
        groupRef.current.rotation.y = Math.sin(time * 4) * 0.2
        groupRef.current.rotation.x = -0.05 + Math.sin(time * 8) * 0.08
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
      const haloSpeed = isDancing ? 4.5 : isHovered || isSpeaking ? 3.5 : 1.5
      haloOuterRef.current.rotation.y += delta * haloSpeed
      haloOuterRef.current.rotation.x = Math.sin(time * 2) * 0.2
      haloInnerRef.current.rotation.y -= delta * (haloSpeed * 0.75)
      haloInnerRef.current.rotation.z = Math.cos(time * 2) * 0.2
    }

    // Arc Reactor Core Pulse (accelerates and expands when speaking or dancing)
    if (coreRef.current) {
      const pulseSpeed = isDancing ? 16 : isSpeaking ? 14 : 6
      const pulseAmp = isDancing ? 0.32 : isSpeaking ? 0.28 : 0.15
      const pulse = 1 + Math.sin(time * pulseSpeed) * pulseAmp
      coreRef.current.scale.set(pulse, pulse, pulse)
    }

    // Floating Magnetic Hands
    if (leftHandRef.current && rightHandRef.current) {
      if (isDancing) {
        leftHandRef.current.position.y = -0.15 + Math.sin(time * 8) * 0.18
        rightHandRef.current.position.y = -0.15 + Math.cos(time * 8) * 0.18
        leftHandRef.current.rotation.z = -0.3 + Math.sin(time * 8) * 0.2
        rightHandRef.current.rotation.z = 0.4 + Math.cos(time * 8) * 0.25
      } else {
        const wave = Math.sin(time * 4) * 0.08
        leftHandRef.current.position.y = -0.15 + (isHovered ? wave * 2 + 0.1 : wave)
        rightHandRef.current.position.y = -0.15 + (isHovered ? -wave * 2 + 0.1 : -wave)
        if (isHovered) {
          rightHandRef.current.rotation.z = 0.5 + Math.sin(time * 8) * 0.25
        } else {
          rightHandRef.current.rotation.z = 0
        }
      }
    }

    // Jetpack Thruster Flame Pulse
    if (thrusterFlameRef.current) {
      const flameSpeed = isDancing ? 18 : 12
      const flameScale = 0.9 + Math.sin(time * flameSpeed) * 0.25
      thrusterFlameRef.current.scale.set(1, flameScale, 1)
    }

    // Eye blinking / expression
    if (eyeLeftRef.current && eyeRightRef.current) {
      const blink = Math.sin(time * 0.7) > 0.96 ? 0.1 : 1
      const scaleY = mood === 'happy' || isSpeaking || isDancing ? 0.35 : blink
      eyeLeftRef.current.scale.y = scaleY
      eyeRightRef.current.scale.y = scaleY
    }
  })

  const primaryGlow = isHovered || isSpeaking ? skinConfig.reactorEmissive : skinConfig.antennaEmissive
  const accentGlow = isHovered || isSpeaking ? skinConfig.antennaEmissive : skinConfig.reactorEmissive
  const armorColor = skinConfig.bodyColor
  const darkChassisColor = skinConfig.visorColor

  return (
    <group ref={groupRef} scale={[1.15, 1.15, 1.15]}>
      {/* Studio 3-Point Lighting for High-End 3D Definition */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 4]} intensity={2.8} color="#ffffff" />
      <directionalLight position={[-4, 2, -2]} intensity={2.2} color={skinConfig.reactorEmissive} />
      <pointLight position={[0, -2, -1]} intensity={3.0} color={skinConfig.antennaEmissive} />
      <pointLight
        position={[0, 0.4, 1.2]}
        intensity={isHovered || isSpeaking || isDancing ? 4.5 : 2.2}
        color={primaryGlow}
        distance={3}
      />

      {/* Dual Vertical Glowing Neon Antenna Loops */}
      <mesh position={[-0.14, 0.52, 0]}>
        <torusGeometry args={[0.18, 0.018, 16, 48]} />
        <meshStandardMaterial
          color={skinConfig.antennaColor}
          emissive={skinConfig.antennaEmissive}
          emissiveIntensity={isSpeaking || isDancing ? 7.2 : 4.8}
          roughness={0.1}
          metalness={0.85}
        />
      </mesh>
      <mesh position={[0.14, 0.52, 0]}>
        <torusGeometry args={[0.18, 0.018, 16, 48]} />
        <meshStandardMaterial
          color={skinConfig.antennaColor}
          emissive={skinConfig.antennaEmissive}
          emissiveIntensity={isSpeaking || isDancing ? 7.2 : 4.8}
          roughness={0.1}
          metalness={0.85}
        />
      </mesh>

      {/* Outer Holographic Halo */}
      <mesh ref={haloOuterRef} position={[0, 0.85, 0]}>
        <torusGeometry args={[0.42, 0.02, 16, 48]} />
        <meshStandardMaterial
          color={skinConfig.haloColor}
          emissive={skinConfig.haloColor}
          emissiveIntensity={isHovered || isSpeaking || isDancing ? 4.5 : 2.2}
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
          emissiveIntensity={isHovered || isSpeaking || isDancing ? 3.8 : 1.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* HEAD ASSEMBLY */}
      <group position={[0, 0.28, 0]}>
        {/* Helmet Shell */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.44, 32, 32]} />
          <meshStandardMaterial
            color={armorColor}
            roughness={skinConfig.bodyRoughness}
            metalness={skinConfig.bodyMetalness}
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
            color={skinConfig.visorColor}
            roughness={0.05}
            metalness={0.95}
          />
        </mesh>

        {/* Expressive Glowing Eyes */}
        <mesh ref={eyeLeftRef} position={[-0.12, 0.02, 0.48]}>
          <capsuleGeometry args={[0.035, 0.06, 8, 16]} />
          <meshStandardMaterial
            color={skinConfig.visorEmissive}
            emissive={skinConfig.visorEmissive}
            emissiveIntensity={4.8}
          />
        </mesh>
        <mesh ref={eyeRightRef} position={[0.12, 0.02, 0.48]}>
          <capsuleGeometry args={[0.035, 0.06, 8, 16]} />
          <meshStandardMaterial
            color={skinConfig.visorEmissive}
            emissive={skinConfig.visorEmissive}
            emissiveIntensity={4.8}
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
            roughness={skinConfig.bodyRoughness}
            metalness={skinConfig.bodyMetalness}
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
            color={skinConfig.reactorColor}
            emissive={skinConfig.reactorEmissive}
            emissiveIntensity={isHovered || isSpeaking || isDancing ? 6.0 : 3.5}
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
            color={skinConfig.antennaColor}
            emissive={skinConfig.antennaEmissive}
            emissiveIntensity={isHovered || isDancing ? 5.5 : 3.5}
            transparent
            opacity={0.88}
          />
        </mesh>
      </group>

      {/* FLOATING MAGNETIC HANDS */}
      <group ref={leftHandRef} position={[-0.44, -0.15, 0.05]}>
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={armorColor}
            roughness={skinConfig.bodyRoughness}
            metalness={skinConfig.bodyMetalness}
          />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshStandardMaterial color={primaryGlow} emissive={primaryGlow} emissiveIntensity={3.0} />
        </mesh>
      </group>

      <group ref={rightHandRef} position={[0.44, -0.15, 0.05]}>
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={armorColor}
            roughness={skinConfig.bodyRoughness}
            metalness={skinConfig.bodyMetalness}
          />
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
          color={isHovered || isSpeaking || isDancing ? skinConfig.reactorEmissive : skinConfig.antennaEmissive}
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
