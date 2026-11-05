export type CyberBotSkinId =
  | 'cobalt-prime'
  | 'cyber-neon'
  | 'stealth-obsidian'
  | 'matrix-hologram'

export interface CyberBotSkin {
  id: CyberBotSkinId
  name: string
  tagline: string
  bodyColor: string
  bodyRoughness: number
  bodyMetalness: number
  visorColor: string
  visorEmissive: string
  reactorColor: string
  reactorEmissive: string
  antennaColor: string
  antennaEmissive: string
  haloColor: string
  accentBorder: string
  badgeBg: string
  badgeText: string
}

export const CYBERBOT_SKINS: Record<CyberBotSkinId, CyberBotSkin> = {
  'cobalt-prime': {
    id: 'cobalt-prime',
    name: 'Cobalt Prime',
    tagline: 'Flagship deep metallic navy with solar gold reactor',
    bodyColor: '#1e293b',
    bodyRoughness: 0.15,
    bodyMetalness: 0.88,
    visorColor: '#0b0914',
    visorEmissive: '#38bdf8',
    reactorColor: '#f59e0b',
    reactorEmissive: '#f59e0b',
    antennaColor: '#c084fc',
    antennaEmissive: '#c084fc',
    haloColor: '#38bdf8',
    accentBorder: 'border-[#f59e0b]/70',
    badgeBg: 'bg-[#120f1d]/90',
    badgeText: 'text-[#f59e0b]',
  },
  'cyber-neon': {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    tagline: 'Cyberpunk obsidian with emerald arc reactor and neon rose antenna',
    bodyColor: '#090814',
    bodyRoughness: 0.12,
    bodyMetalness: 0.94,
    visorColor: '#040308',
    visorEmissive: '#f43f5e',
    reactorColor: '#10b981',
    reactorEmissive: '#10b981',
    antennaColor: '#f43f5e',
    antennaEmissive: '#f43f5e',
    haloColor: '#f43f5e',
    accentBorder: 'border-rose-500/70',
    badgeBg: 'bg-[#090814]/90',
    badgeText: 'text-rose-400',
  },
  'stealth-obsidian': {
    id: 'stealth-obsidian',
    name: 'Stealth Obsidian',
    tagline: 'Matte carbon tactical armor with crimson overdrive reactor',
    bodyColor: '#141417',
    bodyRoughness: 0.42,
    bodyMetalness: 0.72,
    visorColor: '#070709',
    visorEmissive: '#ef4444',
    reactorColor: '#ef4444',
    reactorEmissive: '#ef4444',
    antennaColor: '#f97316',
    antennaEmissive: '#f97316',
    haloColor: '#ef4444',
    accentBorder: 'border-red-500/70',
    badgeBg: 'bg-[#141417]/90',
    badgeText: 'text-red-400',
  },
  'matrix-hologram': {
    id: 'matrix-hologram',
    name: 'Matrix Wireframe',
    tagline: 'Bio-luminescent matrix grid with lime photon loops',
    bodyColor: '#022c22',
    bodyRoughness: 0.08,
    bodyMetalness: 0.96,
    visorColor: '#011c15',
    visorEmissive: '#22c55e',
    reactorColor: '#22c55e',
    reactorEmissive: '#4ade80',
    antennaColor: '#86efac',
    antennaEmissive: '#86efac',
    haloColor: '#22c55e',
    accentBorder: 'border-emerald-500/70',
    badgeBg: 'bg-[#022c22]/90',
    badgeText: 'text-emerald-400',
  },
}

export const ALL_SKIN_IDS: CyberBotSkinId[] = [
  'cobalt-prime',
  'cyber-neon',
  'stealth-obsidian',
  'matrix-hologram',
]

export function getNextSkinId(current: CyberBotSkinId): CyberBotSkinId {
  const idx = ALL_SKIN_IDS.indexOf(current)
  return ALL_SKIN_IDS[(idx + 1) % ALL_SKIN_IDS.length]
}

