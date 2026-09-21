export type PerformanceMode = 'immersive' | 'balanced' | 'low-bandwidth';

/**
 * Date the performance figures below were last reviewed.
 *
 * Deliberately named "review" and not "audit": no Lighthouse, CrUX or trace artifact is
 * committed to this repository, so the only values that can honestly be called measured are
 * the ones read out of the `next build` route summary.
 */
export const PERFORMANCE_REVIEW_DATE = '2026-09-22';

export interface PerformanceMetric {
  name: string;
  value: string;
  /** Only meaningful when `evidence` is 'measured'. Omitted for budgets. */
  score?: number; // 0 - 100
  target: string;
  category: 'core-web-vitals' | 'rendering' | 'payload';
  status: 'good' | 'needs-improvement' | 'poor';
  description: string;
  source: string;
  /**
   * 'measured' — the value is read from an artifact produced in this repository. Today that
   *              means the `next build` route summary and nothing else.
   * 'budget'   — an engineering target with no committed measurement behind it. These are
   *              rendered with a distinct badge so a reader is never told an unobserved
   *              number was observed.
   */
  evidence: 'measured' | 'budget';
}

export interface ModeFeatureComparison {
  feature: string;
  immersive: string;
  balanced: string;
  lowBandwidth: string;
}

const BUILD_OUTPUT_SOURCE = 'Measured: Next.js production build route summary (2026-09-22)';
const NO_ARTIFACT = 'Not measured — engineering budget. No Lighthouse/CrUX artifact is committed.';

/**
 * Performance figures, each tagged with whether it was actually observed.
 *
 * Previously every entry here carried a fabricated `source` ("Lighthouse Desktop Audit
 * (Cloudflare Edge)", "Chrome User Experience Report (CrUX)", "In-Engine FPS Telemetry") while
 * the values were plain literals. Two of those sources were not merely unproven but impossible:
 * CLS cannot come from CrUX on a low-traffic origin, and INP is a field-only metric that no
 * DevTools synthetic profile can produce. Those sources are gone, and the unverifiable values
 * are now declared as budgets.
 */
export const PERFORMANCE_METRICS: PerformanceMetric[] = [
  {
    name: 'First Load JS (shared by all routes)',
    value: '87.6 kB',
    score: 100,
    target: '< 120 kB',
    category: 'payload',
    status: 'good',
    description: 'Critical shared chunks loaded upfront; Three.js and heavy canvas libraries are dynamically code-split out of the shared bundle.',
    source: BUILD_OUTPUT_SOURCE,
    evidence: 'measured',
  },
  {
    name: 'First Load JS (home route)',
    value: '177 kB',
    score: 100,
    target: '< 200 kB',
    category: 'payload',
    status: 'good',
    description: 'Home route total including the deferred 3D scene bundle. Within the 200 kB production budget.',
    source: BUILD_OUTPUT_SOURCE,
    evidence: 'measured',
  },
  {
    name: 'Prerendered static pages',
    value: '20 pages',
    score: 100,
    target: 'Full static export',
    category: 'payload',
    status: 'good',
    description: 'Every route is generated at build time and served as static HTML; no server render happens per request.',
    source: BUILD_OUTPUT_SOURCE,
    evidence: 'measured',
  },
  {
    name: 'First Contentful Paint (FCP)',
    value: '< 1.8s',
    target: '< 1.8s',
    category: 'core-web-vitals',
    status: 'good',
    description: 'Budget for first paint of the static shell from an edge cache. Not yet confirmed by a committed Lighthouse run.',
    source: NO_ARTIFACT,
    evidence: 'budget',
  },
  {
    name: 'Largest Contentful Paint (LCP)',
    value: '< 2.5s',
    target: '< 2.5s',
    category: 'core-web-vitals',
    status: 'good',
    description: 'Budget for the hero text and static 3D fallback. Not yet confirmed by a committed Lighthouse run.',
    source: NO_ARTIFACT,
    evidence: 'budget',
  },
  {
    name: 'Cumulative Layout Shift (CLS)',
    value: '< 0.1',
    target: '< 0.1',
    category: 'core-web-vitals',
    status: 'good',
    description: 'Budget. Fixed-height canvas aspect ratios are intended to prevent reflow during hydration, but the shift score has not been measured.',
    source: NO_ARTIFACT,
    evidence: 'budget',
  },
  {
    name: 'Interaction to Next Paint (INP)',
    value: '< 200ms',
    target: '< 200ms',
    category: 'core-web-vitals',
    status: 'good',
    description: 'Budget. INP is a field metric, so it requires real-user monitoring rather than a synthetic profile; no such measurement exists here.',
    source: NO_ARTIFACT,
    evidence: 'budget',
  },
  {
    name: 'Lighthouse Accessibility',
    value: '>= 90',
    target: '>= 90',
    category: 'core-web-vitals',
    status: 'good',
    description: 'Budget. Note the repo axe suite covers 3 routes and disables the color-contrast rule, so no current test substantiates this score.',
    source: NO_ARTIFACT,
    evidence: 'budget',
  },
  {
    name: 'Lighthouse Best Practices',
    value: '>= 90',
    target: '>= 90',
    category: 'core-web-vitals',
    status: 'good',
    description: 'Budget. Security headers are declared in public/_headers, but no run scores them.',
    source: NO_ARTIFACT,
    evidence: 'budget',
  },
  {
    name: 'WebGL Framerate (Desktop)',
    value: '60 FPS',
    target: '60 FPS',
    category: 'rendering',
    status: 'good',
    description: 'Budget. The R3F loop uses a delta-clamped requestAnimationFrame; no in-engine FPS telemetry is collected or reported.',
    source: NO_ARTIFACT,
    evidence: 'budget',
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
