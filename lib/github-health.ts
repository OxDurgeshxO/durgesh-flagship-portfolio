export interface RepositoryHealth {
  id: string;
  name: string;
  fullName: string;
  description: string;
  category: 'aiml' | 'fullstack' | 'agent' | 'portfolio';
  status: 'production' | 'active' | 'experimental';
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
  asOfDate: string;
  metrics: {
    bundleSizeKb?: number;
    architectureType: string;
  };
  highlights: string[];
}

export const GITHUB_HEALTH_SNAPSHOT_DATE = '2026-09-21';

export const REPOSITORY_HEALTH_DATA: RepositoryHealth[] = [
  {
    id: 'fitness-platform',
    name: 'fitness-platform-architecture',
    fullName: 'OxDurgeshxO/fitness-platform-architecture',
    description:
      'AI-powered Gym & Fitness ecosystem reference: Next.js 14, MediaPipe Edge Computer Vision kinematics, and modular architecture.',
    category: 'aiml',
    status: 'active',
    stars: 0,
    forks: 0,
    license: 'Unlicensed',
    primaryLanguage: 'TypeScript',
    ciStatus: 'none',
    hasTests: true,
    hasDocker: true,
    hasDocs: true,
    lastCommitDate: '2026-09-09',
    repoUrl: 'https://github.com/OxDurgeshxO/fitness-platform-architecture',
    caseStudyUrl: '/work/fittrack',
    asOfDate: GITHUB_HEALTH_SNAPSHOT_DATE,
    metrics: {
      architectureType: 'Domain-Driven Clean Architecture',
    },
    highlights: [
      'Verified public repository on GitHub',
      'Client-side MediaPipe browser pose estimation kinematics',
      'Modular exercise biomechanical state machine',
    ],
  },
  {
    id: 'marketmatch-ai',
    name: 'MarketMatch-AI',
    fullName: 'OxDurgeshxO/MarketMatch-AI',
    description:
      'Unsupervised Customer Intelligence Pipeline: K-Means and DBSCAN clustering on RFM vectors with interactive Nearest Neighbors recommendations.',
    category: 'aiml',
    status: 'production',
    stars: 0,
    forks: 0,
    license: 'Unlicensed',
    // GitHub reports this repository's dominant language as HTML, not Python.
    // The API value is authoritative on a page labelled as a verified snapshot.
    primaryLanguage: 'HTML',
    ciStatus: 'none',
    hasTests: true,
    hasDocker: false,
    hasDocs: true,
    lastCommitDate: '2026-09-10',
    repoUrl: 'https://github.com/OxDurgeshxO/MarketMatch-AI',
    caseStudyUrl: '/work/marketmatch-ai',
    asOfDate: GITHUB_HEALTH_SNAPSHOT_DATE,
    metrics: {
      architectureType: 'Unsupervised ML Pipeline + Streamlit',
    },
    highlights: [
      'Multi-algorithm clustering (K-Means & DBSCAN)',
      'Dimensionality reduction and cohort visualization',
      'Live deployed on Streamlit Community Cloud',
    ],
  },
  {
    id: 'roleradar',
    name: 'RoleRadar',
    fullName: 'OxDurgeshxO/RoleRadar',
    description:
      'AI-Powered Career Intelligence Platform: Resume ATS scoring heuristics, Google XYZ bullet recommendations, and role taxonomy parsing.',
    category: 'agent',
    status: 'production',
    stars: 0,
    forks: 0,
    license: 'Unlicensed',
    primaryLanguage: 'TypeScript',
    ciStatus: 'none',
    hasTests: true,
    hasDocker: false,
    hasDocs: true,
    lastCommitDate: '2026-09-10',
    repoUrl: 'https://github.com/OxDurgeshxO/RoleRadar',
    caseStudyUrl: '/work/roleradar',
    asOfDate: GITHUB_HEALTH_SNAPSHOT_DATE,
    metrics: {
      architectureType: 'Next.js 16 + Drizzle ORM + Tailwind CSS v4',
    },
    highlights: [
      'Deterministic keyword taxonomy scoring across 40+ engineering skills',
      'Google XYZ formula structuring transformer',
      'Live production deployment on Vercel',
    ],
  },
  {
    id: 'durgesh-flagship-portfolio',
    name: 'durgesh-flagship-portfolio',
    fullName: 'OxDurgeshxO/durgesh-flagship-portfolio',
    description:
      'Flagship engineering portfolio with 3-way performance modes (WebGL 3D, Reduced Motion, Low-Bandwidth Static), ATS resume engine, and interactive AI Lab.',
    category: 'portfolio',
    status: 'production',
    stars: 0,
    forks: 0,
    license: 'MIT',
    primaryLanguage: 'TypeScript',
    ciStatus: 'passing',
    hasTests: true,
    hasDocker: false,
    hasDocs: true,
    lastCommitDate: '2026-09-21',
    repoUrl: 'https://github.com/OxDurgeshxO/durgesh-flagship-portfolio',
    asOfDate: GITHUB_HEALTH_SNAPSHOT_DATE,
    metrics: {
      // Measured from the production build output (`next build`, 2026-09-22):
      // home route First Load JS = 177 kB; shared by all routes = 87.6 kB.
      bundleSizeKb: 177,
      architectureType: 'Next.js 14 App Router (Static Export) + Cloudflare Pages Functions',
    },
    highlights: [
      'Automated test validation suite in CI',
      'Accessible ATS-optimized HTML resume with print stylesheet',
      'Three performance modes with zero layout shift',
    ],
  },
  {
    id: 'jarvis-realtime-assistant',
    name: 'jarvis-realtime-assistant',
    fullName: 'OxDurgeshxO/jarvis-realtime-assistant',
    description:
      'Full-stack realtime AI voice assistant & Iron Man HUD with Gemini 2.0 Flash, Edge-TTS, and Whisper STT.',
    category: 'agent',
    status: 'production',
    stars: 0,
    forks: 0,
    license: 'Unlicensed',
    primaryLanguage: 'TypeScript',
    ciStatus: 'none',
    hasTests: true,
    hasDocker: false,
    hasDocs: true,
    lastCommitDate: '2026-09-10',
    repoUrl: 'https://github.com/OxDurgeshxO/jarvis-realtime-assistant',
    caseStudyUrl: '/work/jarvis-realtime-assistant',
    asOfDate: GITHUB_HEALTH_SNAPSHOT_DATE,
    metrics: {
      architectureType: 'FastAPI WebSockets + React HUD Interface',
    },
    highlights: [
      'Sub-350ms streaming bidirectional voice loop',
      'Web Audio API interactive dynamic HUD visualizer',
      'Live deployed on GitHub Pages with public repository',
    ],
  },
  {
    id: 'bank-churn-prediction-studio',
    name: 'bank-churn-prediction-studio',
    fullName: 'OxDurgeshxO/bank-churn-prediction-studio',
    description:
      'AI-Powered Customer Churn Prediction Dashboard built with Streamlit, Scikit-Learn, and SMOTE for class-imbalanced financial analytics.',
    category: 'aiml',
    status: 'production',
    stars: 0,
    forks: 0,
    license: 'Unlicensed',
    primaryLanguage: 'Python',
    ciStatus: 'none',
    hasTests: true,
    hasDocker: false,
    hasDocs: true,
    lastCommitDate: '2026-09-10',
    repoUrl: 'https://github.com/OxDurgeshxO/bank-churn-prediction-studio',
    asOfDate: GITHUB_HEALTH_SNAPSHOT_DATE,
    metrics: {
      architectureType: 'Scikit-Learn Classifier + Streamlit Cloud',
    },
    highlights: [
      'SMOTE balancing for financial fraud/churn distributions',
      'Real-time risk scoring and feature importance charts',
      'Live deployed on Streamlit Community Cloud',
    ],
  },
  {
    id: 'cnn-streamlit',
    name: 'CNN-STREAMLIT',
    fullName: 'OxDurgeshxO/CNN-STREAMLIT',
    description:
      'Convolutional Neural Network apparel classifier trained on Fashion-MNIST with real-time interactive Streamlit web inference.',
    category: 'aiml',
    status: 'production',
    stars: 0,
    forks: 0,
    // Corrected from 'Unlicensed': GitHub reports MIT for this repository.
    license: 'MIT',
    // Corrected from 'Python': GitHub reports the dominant language as JavaScript.
    primaryLanguage: 'JavaScript',
    ciStatus: 'none',
    hasTests: true,
    hasDocker: false,
    hasDocs: true,
    lastCommitDate: '2026-09-10',
    repoUrl: 'https://github.com/OxDurgeshxO/CNN-STREAMLIT',
    caseStudyUrl: '/work/cnn-streamlit',
    asOfDate: GITHUB_HEALTH_SNAPSHOT_DATE,
    metrics: {
      architectureType: 'PyTorch CNN + Streamlit Web App',
    },
    highlights: [
      '89.3% test accuracy on 10,000 unseen test images',
      'Interactive confidence probability distribution charts',
      'Verified open-source repository with reproduction steps',
    ],
  },
];

export function getHealthSummary() {
  const total = REPOSITORY_HEALTH_DATA.length;
  const productionCount = REPOSITORY_HEALTH_DATA.filter((r) => r.status === 'production').length;
  const verifiedTestsCount = REPOSITORY_HEALTH_DATA.filter((r) => r.hasTests).length;
  const totalStars = REPOSITORY_HEALTH_DATA.reduce((acc, r) => acc + r.stars, 0);
  const totalForks = REPOSITORY_HEALTH_DATA.reduce((acc, r) => acc + r.forks, 0);

  return {
    total,
    productionCount,
    verifiedTestsCount,
    totalStars,
    totalForks,
    snapshotDate: GITHUB_HEALTH_SNAPSHOT_DATE,
  };
}
