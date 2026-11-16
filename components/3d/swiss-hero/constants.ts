export const HERO_CONSTANTS = {
  LEFT_TITLE: 'DURGESH',
  RIGHT_TITLE: 'PORTFOLIO',
  TAGLINE: 'SWISS EDITORIAL // KINETIC PBR SCULPTURE',
  BUILD: 'BUILD // 2026.11.SWISS-R3F',
  COORDINATES: 'LAT 28.6139° N / LON 77.2090° E',
  STATUS_ACTIVE: '[STATUS: NOMINAL]',
  STATUS_EXPLODED: '[STATE: ZERO-G EXPLODED CAD]',
  STATUS_HOLD: '[STATE: STUDIO HOLD // CURSOR TRACK]',
} as const

export interface AssemblySpecItem {
  id: string
  index: string
  name: string
  material: string
  detail: string
  specCode: string
}

export const ASSEMBLY_SPECS: AssemblySpecItem[] = [
  {
    id: 'shells',
    index: '01',
    name: 'ACOUSTIC SHELLS',
    material: 'Matte Porcelain Composite',
    detail: '4-axis micro-grain acoustic dampening shields with chamfered ribs',
    specCode: 'SH-PBR-94',
  },
  {
    id: 'gimbal',
    index: '02',
    name: 'TITANIUM GIMBAL',
    material: 'CNC Anodized Obsidian Ring',
    detail: 'Dual-axis gimbal ring with recessed channels and micro-fasteners',
    specCode: 'GB-CNC-02',
  },
  {
    id: 'core',
    index: '03',
    name: 'RESONATOR CORE',
    material: 'Terracotta Resin & Amber Core',
    detail: 'Subsurface scattering (IOR 1.48) with internal glowing nucleus',
    specCode: 'RC-AMB-88',
  },
  {
    id: 'louvers',
    index: '04',
    name: 'WAVEGUIDE LOUVERS',
    material: '7-Fin Brushed Aluminum',
    detail: 'Zero-gravity acoustic frequency louvers with harmonic flex',
    specCode: 'WL-ALU-07',
  },
  {
    id: 'aperture',
    index: '05',
    name: 'OPTICAL APERTURE',
    material: 'Stepped Champagne-Brass Barrel',
    detail: 'Knurled focus collar housing an anti-reflective coated lens',
    specCode: 'OA-BRS-50',
  },
  {
    id: 'plinth',
    index: '06',
    name: 'ARCHITECTURAL PLINTH',
    material: 'Brutalist Slate Stone',
    detail: 'Magnetic levitation plinth with neodymium suspension discs',
    specCode: 'PL-SLT-01',
  },
]
