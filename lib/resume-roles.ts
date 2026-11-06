export type RoleCategory = 'all' | 'aiml' | 'fullstack' | 'agents';

export interface RoleMeta {
  label: string;
  description: string;
  keywords: string[];
}

export const ROLE_DEFINITIONS: Record<RoleCategory, RoleMeta> = {
  all: {
    label: 'All Competencies',
    description: 'Standard comprehensive view across all technical domains',
    keywords: [],
  },
  aiml: {
    label: 'AI / ML Engineer',
    description: 'Highlight PyTorch, Computer Vision, Transformers & ML pipelines',
    keywords: [
      'PyTorch',
      'Scikit-Learn',
      'Computer Vision',
      'MediaPipe',
      'OpenCV',
      'CNN',
      'Whisper STT',
      'Gemini API',
      'Gemini 2.0 Flash',
      'RAG',
      'Pandas',
      'NumPy',
      'K-Means',
      'DBSCAN',
      'Python',
    ],
  },
  fullstack: {
    label: 'Full-Stack Architect',
    description: 'Highlight Next.js 14, TypeScript, React, APIs & Edge systems',
    keywords: [
      'Next.js',
      'React',
      'FastAPI',
      'TypeScript',
      'JavaScript',
      'WebSockets',
      'Node.js',
      'RESTful APIs',
      'Tailwind CSS',
      'PostgreSQL',
      'Drizzle ORM',
      'Cloudflare Pages',
      'Docker',
    ],
  },
  agents: {
    label: 'Agentic Systems Specialist',
    description: 'Highlight autonomous agent swarms, voice AI & multimodal tools',
    keywords: [
      'J.A.R.V.I.S.',
      'Multimodal AI Voice Assistant',
      'Whisper STT',
      'Gemini API',
      'Gemini 2.0 Flash',
      'Silero VAD',
      'FastAPI',
      'WebSockets',
      'Python',
      'TypeScript',
      'Docker',
    ],
  },
};
