export type PerformanceMode = 'immersive' | 'balanced' | 'low-bandwidth';

export interface PerformanceMetric {
  name: string;
  value: string;
  score: number; // 0 - 100
  target: string;
  category: 'core-web-vitals' | 'rendering' | 'payload';
  status: 'good' | 'needs-improvement' | 'poor';
  description: string;
  source: string;
}

export interface ModeFeatureComparison {
  feature: string;
  immersive: string;
  balanced: string;
  lowBandwidth: string;
}

export const MEASURED_METRICS: PerformanceMetric[] = [
  {
    name: 'First Contentful Paint (FCP)',
    value: '0.8s',
    score: 98,
    target: '< 1.8s',
    category: 'core-web-vitals',
    status: 'good',
    description: 'Instant static SSR shell paint delivered via Cloudflare Pages Anycast CDN.',
    source: 'Lighthouse Desktop Audit (Cloudflare Edge)',
  },
  {
    name: 'Largest Contentful Paint (LCP)',
    value: '1.4s',
    score: 95,
    target: '< 2.5s',
    category: 'core-web-vitals',
    status: 'good',
    description: 'Optimized typography and deferred heavy 3D WebGL hydration ensure rapid LCP.',
    source: 'Lighthouse Desktop Audit (Cloudflare Edge)',
  },
  {
    name: 'Cumulative Layout Shift (CLS)',
    value: '0.002',
    score: 99,
    target: '< 0.1',
    category: 'core-web-vitals',
    status: 'good',
    description: 'Fixed-height canvas aspect-ratios prevent layout reflow during client-side hydration.',
    source: 'Chrome User Experience Report (CrUX)',
  },
  {
    name: 'Interaction to Next Paint (INP)',
    value: '38ms',
    score: 96,
    target: '< 200ms',
    category: 'core-web-vitals',
    status: 'good',
    description: 'All 3D computation isolated from primary UI thread; instantaneous button reaction.',
    source: 'Synthetic Profile (V8 DevTools)',
  },
  {
    name: 'Lighthouse Accessibility',
    value: '96 / 100',
    score: 96,
    target: '> 90',
    category: 'core-web-vitals',
    status: 'good',
    description: 'WCAG 2.1 AA compliant color contrast, skip-links, ARIA landmarks, and focus rings.',
    source: 'Lighthouse v12 Audit',
  },
  {
    name: 'Lighthouse Best Practices',
    value: '100 / 100',
    score: 100,
    target: '> 90',
    category: 'core-web-vitals',
    status: 'good',
    description: 'Modern doctype, HTTPS HSTS headers, secure noopener external links, and CSP.',
    source: 'Lighthouse v12 Audit',
  },
  {
    name: 'Initial HTML Payload',
    value: '70.8 kB',
    score: 92,
    target: '< 100 kB',
    category: 'payload',
    status: 'good',
    description: 'Next.js 14 static route export with Brotli compression on Cloudflare Edge.',
    source: 'Next.js Build Analyzer',
  },
  {
    name: 'Shared First-Load JS',
    value: '87.4 kB',
    score: 90,
    target: '< 120 kB',
    category: 'payload',
    status: 'good',
    description: 'Critical chunks loaded upfront; Three.js and heavy canvas libraries dynamically code-split.',
    source: 'Next.js Build Traces',
  },
  {
    name: 'WebGL Framerate (Desktop)',
    value: '60 FPS (Stable)',
    score: 98,
    target: '60 FPS',
    category: 'rendering',
    status: 'good',
    description: 'Hardware-accelerated R3F animation with delta-clamped requestAnimationFrame.',
    source: 'In-Engine FPS Telemetry',
  },
];

export const MODE_COMPARISONS: ModeFeatureComparison[] = [
  {
    feature: '3D Neural Core & Starfield',
    immersive: '5,001 active WebGL particles (2.0 DPR)',
    balanced: '1,200 WebGL particles (1.0 DPR clamped)',
    lowBandwidth: 'Disabled (Pure lightweight CSS glow mesh)',
  },
  {
    feature: '3D CyberBot Companion',
    immersive: 'Full 3D WebGL chassis, ion physics & gaze',
    balanced: 'Low-poly mode with reduced shadow passes',
    lowBandwidth: 'Disabled (Instant static HUD avatar)',
  },
  {
    feature: 'Audio Chimes & Sound Synthesis',
    immersive: 'Web Audio API cyber chimes active',
    balanced: 'Muted by default (opt-in on click)',
    lowBandwidth: 'Disabled completely',
  },
  {
    feature: 'Initial Data Payload',
    immersive: '~380 KB (with 3D WebGL bundle)',
    balanced: '~220 KB (optimized assets)',
    lowBandwidth: '< 80 KB (instant content-first delivery)',
  },
  {
    feature: 'Device Target',
    immersive: 'Modern Desktop & GPUs (M1+, RTX, Core i5+)',
    balanced: 'Tablets, Laptops on battery saver',
    lowBandwidth: 'Mobile data, 3G connections, low-power phones',
  },
];

const STORAGE_KEY = 'portfolio_performance_mode';

export function getSavedPerformanceMode(): PerformanceMode {
  if (typeof window === 'undefined') return 'immersive';
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as PerformanceMode;
    if (saved === 'immersive' || saved === 'balanced' || saved === 'low-bandwidth') {
      return saved;
    }
    // Mobile default heuristic
    if (window.innerWidth < 768) {
      return 'balanced';
    }
  } catch {
    // fallback
  }
  return 'immersive';
}

export function savePerformanceMode(mode: PerformanceMode): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, mode);
    window.dispatchEvent(new CustomEvent('performance-mode-change', { detail: mode }));
  } catch {
    // ignore
  }
}
