export type ExperienceMode = 'immersive' | 'balanced' | 'low-bandwidth';

export interface ModeDetail {
  id: ExperienceMode;
  label: string;
  badge: string;
  description: string;
  particleCount: string;
  dpr: string;
  audio: string;
}

export const EXPERIENCE_MODES: ModeDetail[] = [
  {
    id: 'immersive',
    label: 'Immersive 3D',
    badge: 'Flagship Showcase',
    description: 'Full 3D Neural Core with 5,000+ interactive particles, 3D CyberBot companion, and ambient audio.',
    particleCount: '5,001 particles',
    dpr: '2.0 Max',
    audio: 'Active Synthesis',
  },
  {
    id: 'balanced',
    label: 'Balanced',
    badge: 'Optimized Mobile',
    description: 'Hardware-throttled WebGL, clamped DPR, reduced shadow passes, and audio muted by default.',
    particleCount: '1,200 particles',
    dpr: '1.0 Clamped',
    audio: 'Muted by Default',
  },
  {
    id: 'low-bandwidth',
    label: 'Low-Bandwidth',
    badge: '0 WebGL Overhead',
    description: 'Zero WebGL or audio overhead. Content-first rendering with static CSS/SVG neural glow fallback.',
    particleCount: '0 (CSS/SVG)',
    dpr: 'Native Vector',
    audio: 'Completely Disabled',
  },
];

const STORAGE_KEY = 'portfolio-experience-mode';
const LEGACY_STORAGE_KEY = 'portfolio_performance_mode';

export function getSavedExperienceMode(): ExperienceMode {
  if (typeof window === 'undefined') return 'immersive';
  try {
    const saved = (localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY)) as ExperienceMode;
    if (saved === 'immersive' || saved === 'balanced' || saved === 'low-bandwidth') {
      return saved;
    }
    // Reduced motion media query preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'low-bandwidth';
    }
    // Mobile default heuristic
    if (window.innerWidth < 768) {
      return 'balanced';
    }
  } catch {
    // localStorage disabled or restricted
  }
  return 'immersive';
}

export function saveExperienceMode(mode: ExperienceMode): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, mode);
    localStorage.setItem(LEGACY_STORAGE_KEY, mode);
    window.dispatchEvent(new CustomEvent('experience-mode-change', { detail: mode }));
    window.dispatchEvent(new CustomEvent('performance-mode-change', { detail: mode }));
  } catch {
    // ignore
  }
}
