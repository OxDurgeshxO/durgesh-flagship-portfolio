export interface ChangelogEntry {
  version: string;
  releaseName: string;
  date: string;
  category: 'architecture' | 'aiml' | 'performance' | 'security' | 'cicd';
  summary: string;
  problem: string;
  implementation: string;
  result: string;
  tags: string[];
  commitSha?: string;
  highlights: string[];
}

export const CHANGELOG_DATA: ChangelogEntry[] = [
  {
    version: 'v2.2.0',
    releaseName: 'AI Engineering Lab & Repository Health Telemetry',
    date: '2026-09-11',
    category: 'aiml',
    summary:
      'Launched live interactive AI Lab (RoleRadar ATS scorer, FitTrack CV pose kinematics, MarketMatch RFM clustering) and repository code health telemetry.',
    problem:
      'Portfolios often rely on static project cards or video gifs, which fail to prove that machine learning models and computer vision pipelines actually run performantly in edge environments.',
    implementation:
      'Implemented client-side trigonometric joint kinematics with HTML5 canvas pose overlays, deterministic ATS NLP keyword scoring with Google XYZ formula suggestions, and unsupervised RFM clustering with 2D PCA projections.',
    result:
      'Real-time interactive demos executing with sub-50ms latency, zero server persistence, and comprehensive repository code quality scoring across 6 key ecosystem projects.',
    tags: ['Applied AI', 'Computer Vision', 'Next.js Edge', 'Interactive Sandbox'],
    commitSha: 'b2fb1be',
    highlights: [
      'Interactive FitTrack pose estimation with live joint-angle trigonometry and rep counting state machine',
      'RoleRadar ATS resume analysis engine with missing keyword identification and bullet rewrite engine',
      'MarketMatch RFM customer segmentation with K-Means/GMM clustering and PCA scatter visualization',
      'GitHub health dashboard auditing code quality, CI pipelines, and open-source licenses',
    ],
  },
  {
    version: 'v2.1.0',
    releaseName: 'Recruiter Fast-Track & ATS-Optimized Resume',
    date: '2026-09-11',
    category: 'architecture',
    summary:
      'Engineered dedicated high-density recruiter portal, printable ATS resume, and deep technical case studies.',
    problem:
      'Recruiters spend an average of 6-8 seconds reviewing candidate profiles; 3D WebGL animations and heavy canvases slow down information retrieval and lead to mobile bounce rates.',
    implementation:
      'Engineered a dedicated 0 WebGL /recruiter fast-track route, semantic HTML5 /resume with dedicated @media print stylesheets, and comprehensive architectural case studies (/work/*) with problem-solution-impact narratives.',
    result:
      'Near-instant page loads (<300ms), 1-click printable PDF resume, and zero 404 links across all external and internal references.',
    tags: ['Recruiter UX', 'ATS Resume', 'Case Studies', 'Clean Architecture'],
    commitSha: 'b2fb1be',
    highlights: [
      'Recruiter Fast-Track portal with executive summary, skills matrix, and verified project links',
      'ATS-compliant HTML resume with zero-margin print stylesheet and PDF export button',
      'Deep architectural case studies for RoleRadar, Fitness Platform, and MarketMatch AI',
      'Converted fitness-platform-architecture repository to public to eliminate 404 friction',
    ],
  },
  {
    version: 'v2.0.0',
    releaseName: '3-Way Performance Engine & Continuous Quality Verification',
    date: '2026-09-10',
    category: 'performance',
    summary:
      'Introduced dynamic 3-way rendering mode toggle (Full 60FPS WebGL, Reduced Motion, Low-Bandwidth 0 WebGL) and automated 65+ test CI suite.',
    problem:
      'Heavy Three.js and Canvas 3D backgrounds cause frame drops, high GPU temperature, and battery drain on mobile devices and low-tier hardware.',
    implementation:
      'Designed a unified performance state engine storing preferences in localStorage and HTML data attributes. Connected canvas mounting to low-bandwidth state, gracefully replacing GPU workloads with crisp CSS radial gradients. Integrated GitHub Actions CI workflow with 65+ automated assertions.',
    result:
      'Zero layout shift when switching modes, 100% test pass rate in CI, and reduced power consumption for low-bandwidth users.',
    tags: ['Performance', 'WebGL', 'Accessibility', 'GitHub Actions'],
    commitSha: 'a1ec094',
    highlights: [
      '3-Way mode switcher: Full 60FPS WebGL, Reduced Motion, and Low-Bandwidth (0 WebGL)',
      'Zero layout shift architecture preventing UI jumping during canvas mount/unmount',
      'Performance Telemetry center (/performance) tracking WebGL FPS, memory, and Core Web Vitals',
      '65+ automated test assertions covering routes, responsive layouts, and API security',
    ],
  },
  {
    version: 'v1.5.0',
    releaseName: 'Interactive Command Palette & Keyboard Navigation',
    date: '2026-08-25',
    category: 'architecture',
    summary:
      'Added keyboard-driven Command Palette (Cmd+K / Ctrl+K), global shortcut listeners, and tactile terminal cues.',
    problem:
      'Engineers and technical hiring managers prefer keyboard navigation over hunting through traditional nested dropdown menus.',
    implementation:
      'Implemented accessible modal overlay responding to Cmd+K, with fuzzy search indexing across projects, skills, case studies, and social profiles.',
    result:
      'Sub-50ms instant jump to any section or case study with full keyboard accessibility.',
    tags: ['Accessibility', 'Command Palette', 'Keyboard Nav', 'UX'],
    commitSha: '69f3d1b',
    highlights: [
      'Global Cmd+K / Ctrl+K shortcut with focus trap and arrow key navigation',
      'Instant search filtering across all portfolio projects, demos, and contact methods',
      'Auditory feedback cues and smooth transition animations',
    ],
  },
  {
    version: 'v1.0.0',
    releaseName: 'Initial Flagship Portfolio Launch',
    date: '2026-08-01',
    category: 'architecture',
    summary:
      'Initial release of Durgesh Dutt Sinha portfolio built on Next.js 14 App Router and Tailwind CSS.',
    problem:
      'Need for a unified digital headquarters demonstrating expertise in both Applied AI/ML engineering and production full-stack systems.',
    implementation:
      'Engineered modular component architecture featuring interactive project showcases, skills grid, experience timeline, and contact interface.',
    result:
      'Modern, highly polished engineering portfolio deployed on Edge infrastructure.',
    tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Launch'],
    commitSha: 'c88df4a',
    highlights: [
      'Next.js 14 App Router architecture with static generation',
      'Curated dark mode theme with glassmorphism and subtle micro-animations',
      'Responsive mobile-first layout optimized for all device viewports',
    ],
  },
];
