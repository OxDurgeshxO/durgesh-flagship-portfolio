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
  rating: number
  category: string
  description: string
  highlights: string[]
  live_url: string | null
  language: string
}> = {
  'MarketMatch-AI': {
    rating: 9.6,
    category: 'Customer Analytics & Recommenders',
    description: 'End-to-end Machine Learning pipeline using K-Means and DBSCAN clustering with a Nearest Neighbors recommendation engine for retail customer targeting.',
    highlights: ['K-Means & DBSCAN', 'Nearest Neighbors', 'Targeted Marketing'],
    live_url: null,
    language: 'Python',
  },
  'bank-churn-prediction-studio': {
    rating: 9.5,
    category: 'Financial AI & Predictive Analytics',
    description: 'AI-Powered Customer Churn Prediction Dashboard built with Streamlit, Scikit-Learn, and SMOTE for handling class imbalance with real-time risk scoring.',
    highlights: ['Streamlit Cloud', 'SMOTE Balancing', 'Real-time Risk Scoring'],
    live_url: 'https://bank-churn-prediction-studio-mrl8whyxpnhkyfvfwmtqwq.streamlit.app/',
    language: 'Python',
  },
  'jarvis-realtime-assistant': {
    rating: 9.3,
    category: 'Realtime AI Voice & WebSocket Systems',
    description: 'Full-stack realtime AI voice assistant & Iron Man HUD with Gemini 2.0 Flash, Edge-TTS & Whisper STT — built with FastAPI, WebSockets, React & TypeScript.',
    highlights: ['Gemini 2.0 Flash', 'Whisper STT', 'WebSockets HUD'],
    live_url: 'https://oxdurgeshxo.github.io/jarvis-realtime-assistant/',
    language: 'TypeScript',
  },
  'CNN-STREAMLIT': {
    rating: 8.9,
    category: 'Computer Vision & Deep Learning',
    description: 'End-to-end Deep Learning Convolutional Neural Network trained on Fashion MNIST with 89.3% accuracy and interactive real-time Streamlit image classifier.',
    highlights: ['CNN / TensorFlow', '89.3% Accuracy', 'Interactive Inference'],
    live_url: null,
    language: 'Python',
  },
  'RoleRadar': {
    rating: 8.8,
    category: 'Full Stack AI & Career Tech',
    description: 'AI-Powered Resume Analyzer & Career Intelligence Platform built with Next.js 16, TypeScript, Drizzle ORM, and Tailwind CSS v4 — live on Vercel.',
    highlights: ['Next.js 16', 'Drizzle ORM', 'Tailwind CSS v4'],
    live_url: 'https://rolefit-2.vercel.app',
    language: 'TypeScript',
  },
}

export const FALLBACK_TOP_5_REPOS: GitHubRepo[] = [
  {
    id: 101,
    name: 'MarketMatch-AI',
    description: TOP_5_CURATED_METADATA['MarketMatch-AI'].description,
    stargazers_count: 0,
    forks_count: 0,
    language: 'Python',
    html_url: `https://github.com/${USERNAME}/MarketMatch-AI`,
    topics: ['machine-learning', 'clustering', 'recommendation-engine'],
    updated_at: '2026-08-02',
    rating: 9.6,
    category: 'Customer Analytics & Recommenders',
    highlights: ['K-Means & DBSCAN', 'Nearest Neighbors', 'Targeted Marketing'],
    live_url: null,
  },
  {
    id: 102,
    name: 'bank-churn-prediction-studio',
    description: TOP_5_CURATED_METADATA['bank-churn-prediction-studio'].description,
    stargazers_count: 0,
    forks_count: 0,
    language: 'Python',
    html_url: `https://github.com/${USERNAME}/bank-churn-prediction-studio`,
    topics: ['streamlit', 'scikit-learn', 'smote', 'fintech'],
    updated_at: '2026-08-02',
    rating: 9.5,
    category: 'Financial AI & Predictive Analytics',
    highlights: ['Streamlit Cloud', 'SMOTE Balancing', 'Real-time Risk Scoring'],
    live_url: 'https://bank-churn-prediction-studio-mrl8whyxpnhkyfvfwmtqwq.streamlit.app/',
  },
  {
    id: 103,
    name: 'jarvis-realtime-assistant',
    description: TOP_5_CURATED_METADATA['jarvis-realtime-assistant'].description,
    stargazers_count: 1,
    forks_count: 0,
    language: 'TypeScript',
    html_url: `https://github.com/${USERNAME}/jarvis-realtime-assistant`,
    topics: ['gemini-2-flash', 'whisper', 'websockets', 'voice-assistant', 'fastapi'],
    updated_at: '2026-09-10',
    rating: 9.3,
    category: 'Realtime AI Voice & WebSocket Systems',
    highlights: ['Gemini 2.0 Flash', 'Whisper STT', 'WebSockets HUD'],
    live_url: 'https://oxdurgeshxo.github.io/jarvis-realtime-assistant/',
  },
  {
    id: 104,
    name: 'CNN-STREAMLIT',
    description: TOP_5_CURATED_METADATA['CNN-STREAMLIT'].description,
    stargazers_count: 0,
    forks_count: 0,
    language: 'Python',
    html_url: `https://github.com/${USERNAME}/CNN-STREAMLIT`,
    topics: ['deep-learning', 'cnn', 'tensorflow', 'computer-vision'],
    updated_at: '2026-07-25',
    rating: 8.9,
    category: 'Computer Vision & Deep Learning',
    highlights: ['CNN / TensorFlow', '89.3% Accuracy', 'Interactive Inference'],
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
    rating: 8.8,
    category: 'Full Stack AI & Career Tech',
    highlights: ['Next.js 16', 'Drizzle ORM', 'Tailwind CSS v4'],
    live_url: 'https://rolefit-2.vercel.app',
  },
]

export async function fetchGitHubProfile(): Promise<GitHubProfile> {
  const res = await fetch(`https://api.github.com/users/${USERNAME}`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error('Failed to fetch GitHub profile')
  return res.json()
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&type=public`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return FALLBACK_TOP_5_REPOS

    const data = await res.json()
    if (!Array.isArray(data)) return FALLBACK_TOP_5_REPOS

    // Filter out forks, dotfiles, meta-repos and the portfolio itself
    const EXCLUDED_REPOS = ['durgesh-flagship-portfolio', 'durgesh-portfolio']
    const nonForkRepos = (data as any[]).filter(
      r => !r.fork && !r.name.startsWith('.') && !EXCLUDED_REPOS.includes(r.name)
    )

    // Rate, enrich, and rank repositories
    const ratedRepos: GitHubRepo[] = nonForkRepos.map(r => {
      const meta = TOP_5_CURATED_METADATA[r.name]
      const defaultScore = (r.description ? 7.0 : 4.0) + (r.size > 100 ? 1.0 : 0)
      return {
        ...r,
        rating: meta?.rating ?? defaultScore,
        category: meta?.category ?? (r.language ? `${r.language} Project` : 'Software Engineering'),
        description: meta?.description ?? r.description ?? 'Project repository on GitHub',
        highlights: meta?.highlights ?? (r.topics && r.topics.length ? r.topics : [r.language || 'Code']),
        live_url: meta?.live_url ?? r.homepage ?? null,
        language: meta?.language ?? r.language ?? 'Code',
      }
    })

    // Sort by rating descending and return strictly Top 5
    ratedRepos.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    return ratedRepos.slice(0, 5)
  } catch {
    return FALLBACK_TOP_5_REPOS
  }
}
