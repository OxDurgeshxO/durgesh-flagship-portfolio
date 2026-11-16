import * as THREE from 'three'

export type StudioTheme = 'cream' | 'darkroom'

export interface AssemblyExplodeState {
  progress: number // 0 = assembled, 1 = fully exploded
  isXRay: boolean
  studioTheme: StudioTheme
}

export interface AssemblyProps {
  explodeProgress: number
  isXRay: boolean
  studioTheme: StudioTheme
  anchorRef?: React.Ref<THREE.Group>
}

export interface AnchorPointSpec {
  id: string
  name: string
  spec: string
  subtext: string
  worldPosition: THREE.Vector3
}
