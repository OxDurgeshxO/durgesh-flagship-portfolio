import { ExperienceMode } from './experience-mode';

export type { ExperienceMode };

export interface ArchitectureNode {
  name: string;
  type: 'client' | 'service' | 'engine' | 'storage' | 'external';
  description: string;
}

export interface TechnicalTradeoff {
  decision: string;
  chosen: string;
  alternative: string;
  rationale: string;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  detail: string;
}

export interface CaseStudyTechnology {
  name: string;
  category: string;
}

export interface CaseStudyArchitecture {
  summary: string;
  nodes: ArchitectureNode[];
  dataFlowSteps: string[];
  diagramAscii?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  badge: string;
  role: string;
  timeline: string;
  githubUrl: string;
  demoUrl?: string;
  accent: string;
  overview: string;
  problem: string;
  targetUsers: string[];
  metrics: CaseStudyMetric[];
  technologies: CaseStudyTechnology[];
  architecture: CaseStudyArchitecture;
  tradeoffs: TechnicalTradeoff[];
  failureHandling: string[];
  securityPrivacy: string[];
  resultsAndImpact: string[];
  limitations: string[];
  futureRoadmap: string[];
}

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

export interface RepositoryHealth {
  id: string;
  name: string;
  fullName: string;
  description: string;
  category: 'core' | 'aiml' | 'fullstack' | 'tooling';
  status: 'production' | 'active-dev' | 'experimental' | 'maintenance';
  qualityScore: number;
  stars: number;
  forks: number;
  license: string;
  primaryLanguage: string;
  ciStatus: 'passing' | 'warning' | 'pending';
  hasTests: boolean;
  hasDocker: boolean;
  hasDocs: boolean;
  lastCommitDate: string;
  repoUrl: string;
  caseStudyUrl?: string;
  metrics: {
    testCoverage?: string;
    bundleSizeKb?: number;
    architectureType: string;
  };
  highlights: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  _gotcha?: string;
}
