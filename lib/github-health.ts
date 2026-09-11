export interface RepositoryHealth {
  id: string;
  name: string;
  fullName: string;
  description: string;
  category: 'aiml' | 'fullstack' | 'agent' | 'portfolio';
  status: 'production' | 'active' | 'experimental';
  qualityScore: number; // 0 - 100
  stars: number;
  forks: number;
  license: string;
  primaryLanguage: string;
  ciStatus: 'passing' | 'running' | 'none';
  hasTests: boolean;
  hasDocker: boolean;
  hasDocs: boolean;
  lastCommitDate: string;
  repoUrl: string;
  caseStudyUrl?: string;
  metrics: {
    testCoverage?: string;
    lighthouseScore?: number;
    bundleSizeKb?: number;
    architectureType: string;
  };
  highlights: string[];
}

export const REPOSITORY_HEALTH_DATA: RepositoryHealth[] = [
  {
    id: 'fitness-platform',
    name: 'fitness-platform-architecture',
    fullName: 'OxDurgeshxO/fitness-platform-architecture',
    description:
      'Production Clean Architecture reference: Next.js 14, MediaPipe Edge Computer Vision kinematics, Drizzle ORM, and Stripe billing.',
    category: 'aiml',
    status: 'production',
    qualityScore: 98,
    stars: 12,
    forks: 3,
    license: 'MIT',
    primaryLanguage: 'TypeScript',
    ciStatus: 'passing',
    hasTests: true,
    hasDocker: true,
    hasDocs: true,
    lastCommitDate: '2026-09-11',
    repoUrl: 'https://github.com/OxDurgeshxO/fitness-platform-architecture',
    caseStudyUrl: '/work/fitness-platform',
    metrics: {
      testCoverage: '92%',
      bundleSizeKb: 142,
      architectureType: 'Domain-Driven Clean Architecture',
    },
    highlights: [
      'Zero 404s: Fully verified public repository',
      'MediaPipe sub-50ms browser pose estimation',
      'Idempotent webhook pipeline for subscriptions',
    ],
  },
  {
    id: 'marketmatch-ai',
    name: 'marketmatch-ai',
    fullName: 'OxDurgeshxO/marketmatch-ai',
    description:
      'Unsupervised Customer Intelligence Platform: K-Means, GMM, DBSCAN clustering on RFM vectors with interactive PCA projection.',
    category: 'aiml',
    status: 'production',
    qualityScore: 95,
    stars: 8,
    forks: 2,
    license: 'MIT',
    primaryLanguage: 'Python / TypeScript',
    ciStatus: 'passing',
    hasTests: true,
    hasDocker: true,
    hasDocs: true,
    lastCommitDate: '2026-09-10',
    repoUrl: 'https://github.com/OxDurgeshxO/marketmatch-ai',
    caseStudyUrl: '/work/marketmatch-ai',
    metrics: {
      testCoverage: '89%',
      bundleSizeKb: 118,
      architectureType: 'Microservice ML Pipeline + FastAPI',
    },
    highlights: [
      'Multi-algorithm clustering (K-Means silhouette: 0.507)',
      '2D/3D PCA dimensionality reduction coordinates',
      'Automated customer persona profile generator',
    ],
  },
  {
    id: 'roleradar',
    name: 'RoleRadar-AI-Job-Search-Agent-Aggregator',
    fullName: 'OxDurgeshxO/RoleRadar-AI-Job-Search-Agent-Aggregator',
    description:
      'Intelligent Career Platform: NLP ATS resume scoring, Google XYZ bullet rewriter, and distributed job aggregator with Redis caching.',
    category: 'agent',
    status: 'production',
    qualityScore: 96,
    stars: 15,
    forks: 4,
    license: 'MIT',
    primaryLanguage: 'TypeScript / Next.js',
    ciStatus: 'passing',
    hasTests: true,
    hasDocker: true,
    hasDocs: true,
    lastCommitDate: '2026-09-09',
    repoUrl: 'https://github.com/OxDurgeshxO/RoleRadar-AI-Job-Search-Agent-Aggregator',
    caseStudyUrl: '/work/roleradar',
    metrics: {
      testCoverage: '91%',
      bundleSizeKb: 165,
      architectureType: 'Edge Aggregator + Redis Cache',
    },
    highlights: [
      'Deterministic taxonomy scoring across 40+ skills',
      'Google XYZ formula suggestion transformer',
      'Sub-200ms cached query responses',
    ],
  },
  {
    id: 'durgesh-flagship-portfolio',
    name: 'durgesh-flagship-portfolio',
    fullName: 'OxDurgeshxO/durgesh-flagship-portfolio',
    description:
      'Ultra-high performance flagship engineering portfolio with 3-way rendering modes (Full 60FPS WebGL, Reduced Motion, Low-Bandwidth 0 WebGL), ATS resume engine, and interactive AI Lab.',
    category: 'portfolio',
    status: 'production',
    qualityScore: 99,
    stars: 24,
    forks: 5,
    license: 'MIT',
    primaryLanguage: 'TypeScript / Next.js',
    ciStatus: 'passing',
    hasTests: true,
    hasDocker: false,
    hasDocs: true,
    lastCommitDate: '2026-09-11',
    repoUrl: 'https://github.com/OxDurgeshxO/durgesh-flagship-portfolio',
    metrics: {
      testCoverage: '100% (65+ automated assertions)',
      lighthouseScore: 99,
      bundleSizeKb: 92,
      architectureType: 'Next.js 14 App Router + Edge Runtime',
    },
    highlights: [
      'Comprehensive 65+ automated test validation suite',
      'ATS-Optimized HTML resume with print stylesheet',
      '3-Way Performance Engine with Zero Layout Shift',
    ],
  },
  {
    id: 'autonomous-agent-orchestrator',
    name: 'Autonomous-Agent-Orchestrator',
    fullName: 'OxDurgeshxO/Autonomous-Agent-Orchestrator',
    description:
      'Multi-agent workflow orchestration engine using LangChain and LangGraph for coordinated parallel research, tool invocation, and verification.',
    category: 'agent',
    status: 'active',
    qualityScore: 88,
    stars: 6,
    forks: 1,
    license: 'Apache-2.0',
    primaryLanguage: 'Python',
    ciStatus: 'passing',
    hasTests: true,
    hasDocker: true,
    hasDocs: true,
    lastCommitDate: '2026-09-08',
    repoUrl: 'https://github.com/OxDurgeshxO/Autonomous-Agent-Orchestrator',
    metrics: {
      testCoverage: '84%',
      architectureType: 'Directed Acyclic Graph (DAG) State Machine',
    },
    highlights: [
      'Stateful checkpointing & reversible rollbacks',
      'Tool-use telemetry with token budget caps',
      'Integrated sandboxed execution environment',
    ],
  },
  {
    id: 'vision-edge-inference',
    name: 'Vision-Edge-Inference',
    fullName: 'OxDurgeshxO/Vision-Edge-Inference',
    description:
      'Quantized INT8/FP16 real-time object tracking and spatial keypoint pipeline optimized for low-power edge accelerators and WebAssembly.',
    category: 'aiml',
    status: 'active',
    qualityScore: 87,
    stars: 5,
    forks: 1,
    license: 'MIT',
    primaryLanguage: 'C++ / Python',
    ciStatus: 'passing',
    hasTests: true,
    hasDocker: true,
    hasDocs: true,
    lastCommitDate: '2026-09-05',
    repoUrl: 'https://github.com/OxDurgeshxO/Vision-Edge-Inference',
    metrics: {
      testCoverage: '82%',
      architectureType: 'ONNX Runtime + WebAssembly / TensorRT',
    },
    highlights: [
      'Post-training quantization reducing footprint by 74%',
      'SIMD vectorization for sub-25ms CPU inference',
      'Memory footprint under 45MB in browser heap',
    ],
  },
];

export function getHealthSummary() {
  const total = REPOSITORY_HEALTH_DATA.length;
  const productionCount = REPOSITORY_HEALTH_DATA.filter((r) => r.status === 'production').length;
  const averageQuality = Math.round(
    REPOSITORY_HEALTH_DATA.reduce((acc, r) => acc + r.qualityScore, 0) / total
  );
  const totalStars = REPOSITORY_HEALTH_DATA.reduce((acc, r) => acc + r.stars, 0);
  const totalForks = REPOSITORY_HEALTH_DATA.reduce((acc, r) => acc + r.forks, 0);

  return {
    total,
    productionCount,
    averageQuality,
    totalStars,
    totalForks,
    passingCI: REPOSITORY_HEALTH_DATA.filter((r) => r.ciStatus === 'passing').length,
  };
}
