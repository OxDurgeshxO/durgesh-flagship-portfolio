const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'OxDurgeshxO'

export interface GitHubProfile {
  login: string
  name: string
  bio: string | null
  avatar_url: string
  public_repos: number
  followers: number
  following: number
  html_url: string
  location: string | null
  blog: string | null
}

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  html_url: string
  topics: string[]
  updated_at: string
  fork?: boolean
  size?: number
  homepage?: string | null
  rating?: number
  category?: string
  highlights?: string[]
  live_url?: string | null
}

export const TOP_5_CURATED_METADATA: Record<string, {
  priority: number
  category: string
  description: string
  highlights: string[]
  live_url: string | null
  language?: string
}> = {
  'RoleRadar': {
    priority: 1,
    category: 'Full Stack AI & Career Tech',
    description: 'AI-driven job fit & career analytics platform evaluating candidates across 16 core dimensions with multi-model scoring.',
    highlights: ['Next.js 16', 'TypeScript', 'Drizzle ORM', 'Tailwind CSS v4'],
    live_url: 'https://rolefit-2.vercel.app',
    language: 'TypeScript',
  },
  'ai-fitness-platform': {
    priority: 2,
    category: 'Computer Vision & Health Tech',
    description: 'Real-time exercise posture tracking and automated repetition counter using MediaPipe pose landmarks and sub-50ms feedback loops.',
    highlights: ['MediaPipe', 'OpenCV', 'Python', 'Real-time Audio'],
    live_url: null,
    language: 'Python',
  },
  'MarketMatch-AI': {
    priority: 3,
    category: 'Data Science & Predictive ML',
    description: 'Customer segmentation and behavioral clustering platform combining K-Means and DBSCAN algorithms for retail intelligence.',
    highlights: ['Scikit-Learn', 'DBSCAN', 'Clustering', 'Python'],
    live_url: null,
    language: 'Python',
  },
  'jarvis-voice-assistant': {
    priority: 4,
    category: 'Conversational AI & Audio Systems',
    description: 'Voice-controlled desktop automation assistant combining speech recognition, natural language command routing, and text-to-speech feedback.',
    highlights: ['SpeechRecognition', 'pyttsx3', 'Python', 'Automation'],
    live_url: null,
    language: 'Python',
  },
  'CNN-Streamlit-Classifier': {
    priority: 5,
    category: 'Deep Learning & Web Interface',
    description: 'Interactive deep learning image classification system powered by custom Convolutional Neural Networks and Streamlit interface.',
    highlights: ['TensorFlow', 'Streamlit', 'CNN', 'Deep Learning'],
    live_url: null,
    language: 'Python',
  },
}

export const FALLBACK_TOP_5_REPOS: GitHubRepo[] = [
  {
    id: 101,
    name: 'ai-fitness-platform',
    description: TOP_5_CURATED_METADATA['ai-fitness-platform'].description,
    stargazers_count: 0,
    forks_count: 0,
    language: 'Python',
    html_url: `https://github.com/${USERNAME}/ai-fitness-platform`,
    topics: ['mediapipe', 'computer-vision', 'python', 'fitness-tracker'],
    updated_at: '2026-10-15',
    category: 'Computer Vision & Health Tech',
    highlights: ['MediaPipe', 'OpenCV', 'Python', 'Real-time Audio'],
    live_url: null,
  },
  {
    id: 102,
    name: 'MarketMatch-AI',
    description: TOP_5_CURATED_METADATA['MarketMatch-AI'].description,
    stargazers_count: 0,
    forks_count: 0,
    language: 'HTML',
    html_url: `https://github.com/${USERNAME}/MarketMatch-AI`,
    topics: ['machine-learning', 'clustering', 'kmeans', 'dbscan'],
    updated_at: '2026-10-12',
    category: 'Data Science & Predictive ML',
    highlights: ['Scikit-Learn', 'DBSCAN', 'Clustering', 'Python'],
    live_url: null,
  },
  {
    id: 103,
    name: 'jarvis-voice-assistant',
    description: TOP_5_CURATED_METADATA['jarvis-voice-assistant'].description,
    stargazers_count: 0,
    forks_count: 0,
    language: 'Python',
    html_url: `https://github.com/${USERNAME}/jarvis-voice-assistant`,
    topics: ['voice-assistant', 'nlp', 'automation', 'python'],
    updated_at: '2026-10-01',
    category: 'Conversational AI & Audio Systems',
    highlights: ['SpeechRecognition', 'pyttsx3', 'Python', 'Automation'],
    live_url: null,
  },
  {
    id: 104,
    name: 'CNN-Streamlit-Classifier',
    description: TOP_5_CURATED_METADATA['CNN-Streamlit-Classifier'].description,
    stargazers_count: 0,
    forks_count: 0,
    language: 'Python',
    html_url: `https://github.com/${USERNAME}/CNN-Streamlit-Classifier`,
    topics: ['deep-learning', 'cnn', 'streamlit', 'image-classification'],
    updated_at: '2026-09-20',
    category: 'Deep Learning & Web Interface',
    highlights: ['TensorFlow', 'Streamlit', 'CNN', 'Deep Learning'],
    live_url: null,
  },
  {
    id: 105,
    name: 'RoleRadar',
    description: TOP_5_CURATED_METADATA['RoleRadar'].description,
    stargazers_count: 0,
    forks_count: 0,
    language: 'TypeScript',
    html_url: `https://github.com/${USERNAME}/RoleRadar`,
    topics: ['nextjs', 'typescript', 'ai', 'career-tech', 'drizzle'],
    updated_at: '2026-09-10',
    category: 'Full Stack AI & Career Tech',
    highlights: ['Next.js 16', 'Drizzle ORM', 'Tailwind CSS v4'],
    live_url: 'https://rolefit-2.vercel.app',
  },
]

export function processRawRepos(data: any[]): GitHubRepo[] {
  // Filter out forks, dotfiles, meta-repos and the portfolio itself
  const EXCLUDED_REPOS = ['durgesh-flagship-portfolio', 'durgesh-portfolio', 'durgesh-portfolio-v2']
  const nonForkRepos = data.filter(
    r => !r.fork && !r.name.startsWith('.') && !EXCLUDED_REPOS.includes(r.name)
  )

  // Enrich and rank repositories
  const enrichedRepos = nonForkRepos.map(r => {
    const meta = TOP_5_CURATED_METADATA[r.name]
    return {
      ...r,
      priority: meta?.priority ?? 99,
      category: meta?.category ?? (r.language ? `${r.language} Project` : 'Software Engineering'),
      description: meta?.description ?? r.description ?? 'Project repository on GitHub',
      highlights: meta?.highlights ?? (r.topics && r.topics.length ? r.topics : [r.language || 'Code']),
      live_url: meta?.live_url ?? r.homepage ?? null,
      language: r.language ?? meta?.language ?? 'Code',
    }
  })

  // Sort by priority ascending and return strictly Top 5
  enrichedRepos.sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99))
  return enrichedRepos.slice(0, 5) as GitHubRepo[]
}

export async function fetchGitHubProfile(): Promise<GitHubProfile> {
  try {
    const res = await fetch(`https://api.github.com/users/${USERNAME}`, {
      next: { revalidate: 3600 },
    })
    if (res.ok) return await res.json()
  } catch {}

  return {
    login: USERNAME,
    name: 'Durgesh Sinha',
    bio: 'MCA (AIML) @ SBU Pune | Autonomous Agent Developer | UNLOX AI Fellow',
    avatar_url: 'https://avatars.githubusercontent.com/u/146377023?v=4',
    public_repos: 9,
    followers: 1,
    following: 1,
    html_url: `https://github.com/${USERNAME}`,
    location: 'Pune, India',
    blog: 'https://durgeshdsinha.com',
  }
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  // 1. In Node environment (build-time / SSR), check for pre-cached static snapshot first
  if (typeof window === 'undefined') {
    try {
      const fs = await import('node:fs')
      const path = await import('node:path')
      const cachePath = path.resolve(process.cwd(), 'public/data/github-cache.json')
      if (fs.existsSync(cachePath)) {
        const raw = fs.readFileSync(cachePath, 'utf8')
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed?.repos) && parsed.repos.length > 0) {
          return processRawRepos(parsed.repos)
        }
      }
    } catch {}
  }

  // 2. Fetch from GitHub API if cache not available
  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&type=public`,
      { next: { revalidate: 3600 } }
    )
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        return processRawRepos(data)
      }
    }
  } catch {}

  // 3. Fallback to curated production repository snapshot
  return FALLBACK_TOP_5_REPOS
}
