export interface KnowledgeEntry {
  id: string
  title: string
  keywords: string[]
  questionPrompts: string[]
  answer: string
  actionUrl?: string
  actionLabel?: string
}

export const CYBERBOT_KNOWLEDGE_CORPUS: KnowledgeEntry[] = [
  {
    id: 'roleradar',
    title: 'RoleRadar Career AI Platform',
    keywords: ['roleradar', 'career', 'job', 'fit', 'multimodal', 'scoring', 'drizzle', 'nextjs', 'flagship', 'role'],
    questionPrompts: ['Tell me about RoleRadar', 'How does RoleRadar evaluate candidates?', 'RoleRadar Tech Stack'],
    answer: "RoleRadar is an enterprise AI career platform evaluating candidates across 16 core engineering dimensions using multi-model scoring. Built on Next.js 16, TypeScript, Drizzle ORM, and Tailwind CSS.",
    actionUrl: 'https://rolefit-2.vercel.app',
    actionLabel: 'Open Live RoleRadar Demo 🚀'
  },
  {
    id: 'fitness',
    title: 'AI Fitness Platform (FitTrack)',
    keywords: ['fitness', 'fittrack', 'mediapipe', 'pose', 'computer vision', 'opencv', 'repetition', 'posture', 'workout'],
    questionPrompts: ['How does the AI Fitness Platform work?', 'What computer vision models were used?', 'MediaPipe Fitness'],
    answer: "The AI Fitness Platform uses Google MediaPipe pose landmarks and OpenCV to track exercise posture with sub-50ms latency, delivering real-time audio corrections and automated repetition counting.",
    actionUrl: '/work/fittrack',
    actionLabel: 'Read Case Study 🏋️'
  },
  {
    id: 'marketmatch',
    title: 'MarketMatch-AI Customer Segmentation',
    keywords: ['marketmatch', 'clustering', 'kmeans', 'dbscan', 'scikit-learn', 'segmentation', 'retail', 'customers'],
    questionPrompts: ['Explain MarketMatch-AI', 'What clustering algorithms were used?'],
    answer: "MarketMatch-AI combines K-Means and DBSCAN density clustering with Nearest Neighbors recommendation algorithms for customer behavioral segmentation and predictive retail intelligence.",
    actionUrl: '/work/marketmatch-ai',
    actionLabel: 'Explore Clustering Lab 📊'
  },
  {
    id: 'jarvis',
    title: 'Jarvis Realtime Voice Assistant',
    keywords: ['jarvis', 'voice', 'realtime', 'webrtc', 'whisper', 'speech', 'audio', 'assistant', 'stt', 'tts'],
    questionPrompts: ['Tell me about the Jarvis voice assistant', 'How does real-time voice synthesis work?'],
    answer: "Jarvis is a low-latency bidirectional voice assistant leveraging OpenAI Whisper for speech-to-text, edge LLM streaming inference, and Web Audio synthesis for human-like conversational responsiveness.",
    actionUrl: '/work/jarvis-realtime-assistant',
    actionLabel: 'Inspect Voice Architecture 🎙️'
  },
  {
    id: 'cnn',
    title: 'CNN Deep Learning Platform',
    keywords: ['cnn', 'convolutional', 'deep learning', 'pytorch', 'streamlit', 'classification', 'neural network', 'vision'],
    questionPrompts: ['What deep learning computer vision models has Durgesh built?', 'Tell me about the CNN Streamlit project'],
    answer: "CNN Streamlit is an interactive deep learning platform built on PyTorch for real-time convolutional image classification, featuring transfer learning and model explainability metrics.",
    actionUrl: '/work/cnn-streamlit',
    actionLabel: 'View CNN Case Study 🧠'
  },
  {
    id: 'spaceedu',
    title: 'SpaceEdu 3D Planetary Simulation',
    keywords: ['spaceedu', 'space', 'planetary', 'kepler', 'orbit', 'threejs', 'physics', 'astronomy', 'cosmos', 'solar'],
    questionPrompts: ['What is SpaceEdu?', 'Tell me about the 3D space simulation'],
    answer: "SpaceEdu is a responsive 3D planetary cosmos simulation powered by Three.js and Keplerian orbital mechanics, rendering celestial bodies, orbital trajectories, and gravitational interactions in real time.",
    actionUrl: '/spaceedu',
    actionLabel: 'Launch 3D Cosmos 🪐'
  },
  {
    id: 'architecture',
    title: 'Static SSG & Edge Architecture',
    keywords: ['architecture', 'static', 'export', 'ssg', 'cloudflare', 'edge', 'workers', 'pages', 'isolate', 'jamstack'],
    questionPrompts: ['How is this portfolio architected?', 'Explain the Cloudflare Pages edge architecture'],
    answer: "The portfolio uses Next.js 14 App Router static export (`output: 'export'`) decoupled from Node servers, combined with Cloudflare Pages Functions running on stateless V8 worker isolates for maximum speed and security.",
    actionUrl: '/performance',
    actionLabel: 'Review Architecture Metrics 📐'
  },
  {
    id: 'security',
    title: 'Production Security Posture',
    keywords: ['security', 'csp', 'headers', 'permissions', 'xss', 'sanitize', 'rate limit', 'hardening', 'owasp'],
    questionPrompts: ['What security controls are implemented?', 'How is XSS and spam prevented?'],
    answer: "Security hardening includes strict Content-Security-Policy, Permissions-Policy locking camera/mic snooping, HTML entity escaping on edge endpoints, reverse tabnabbing defense (`noopener noreferrer`), and KV rate limiting.",
    actionUrl: '/privacy',
    actionLabel: 'View Security Disclosures 🔒'
  },
  {
    id: 'accessibility',
    title: 'Accessibility & WCAG 2.1 AA Compliance',
    keywords: ['accessibility', 'a11y', 'wcag', 'screen reader', 'focus trap', 'contrast', 'touch target', 'aria'],
    questionPrompts: ['Is the portfolio accessible?', 'What WCAG standards are met?'],
    answer: "The portfolio achieves 100% WCAG 2.1 AA compliance with zero critical violations across 22 automated Playwright Axe tests, featuring modal focus trapping, 44x44px touch targets, and sequential heading hierarchies.",
    actionUrl: '/#about',
    actionLabel: 'Inspect A11y Standards ♿'
  },
  {
    id: 'education',
    title: 'Education & Academics',
    keywords: ['education', 'college', 'degree', 'mca', 'bca', 'cgpa', 'university', 'balaji', 'sbup', 'study', 'academic'],
    questionPrompts: ['What is Durgesh\'s educational background?', 'Where does he study?', 'Education & MCA'],
    answer: "Durgesh is pursuing his MCA in Artificial Intelligence & Machine Learning at Sri Balaji University, Pune (2025–2027). He holds a BCA with an 8.9 CGPA from Tilak Maharashtra Vidyapeeth.",
    actionUrl: '/resume',
    actionLabel: 'View Full Resume 🎓'
  },
  {
    id: 'certifications',
    title: 'Certifications & Honors',
    keywords: ['certifications', 'aws', 'unlox', 'fellow', 'machine learning', 'cloud', 'credentials', 'cert', 'honors'],
    questionPrompts: ['What certifications does Durgesh hold?', 'Is he AWS certified?'],
    answer: "Durgesh holds the AWS Machine Learning Foundations certification and is an UNLOX® AI Fellow, recognized for engineering autonomous agent architectures and production-grade LLM pipelines.",
    actionUrl: '/resume',
    actionLabel: 'Inspect Verified Badges 🏆'
  },
  {
    id: 'github',
    title: 'Open Source GitHub Repositories',
    keywords: ['github', 'open source', 'repositories', 'code', 'commits', 'stars', 'telemetry', 'repos', 'git'],
    questionPrompts: ['What open source code has Durgesh published?', 'Tell me about his GitHub health'],
    answer: "Durgesh maintains 9 audited open-source repositories featuring automated CI pipelines, MIT licensing, and cached health telemetry tracking star distributions, languages, and bundle footprints.",
    actionUrl: '/github-health',
    actionLabel: 'Explore GitHub Telemetry 🐙'
  },
  {
    id: 'contact',
    title: 'Collaboration & Hiring',
    keywords: ['hire', 'contact', 'email', 'interview', 'reach', 'connect', 'linkedin', 'phone', 'available'],
    questionPrompts: ['How can I hire Durgesh?', 'What is his email address?'],
    answer: "You can reach Durgesh directly at durgeshdsinha@gmail.com or via LinkedIn. He is actively interviewing for AI/ML and Full-Stack Engineering roles for Q1/Q2 2027.",
    actionUrl: '#contact',
    actionLabel: 'Send Direct Message 📬'
  },
  {
    id: 'stack',
    title: 'Engineering Stack & Skills',
    keywords: ['stack', 'skills', 'technologies', 'tools', 'languages', 'python', 'react', 'nextjs', 'typescript', 'threejs', 'pytorch', 'docker'],
    questionPrompts: ['What technologies does Durgesh use?', 'What is his core tech stack?'],
    answer: "Core stack: Python (PyTorch, TensorFlow, Scikit-Learn, MediaPipe, OpenCV), TypeScript/Next.js 14 SSG, Three.js/React Three Fiber, Cloudflare Pages Edge, Tailwind CSS, PostgreSQL, and Docker.",
    actionUrl: '/#about',
    actionLabel: 'Explore Skills Matrix ⚡'
  },
  {
    id: 'resume',
    title: 'Printable ATS Resume',
    keywords: ['resume', 'cv', 'pdf', 'download', 'ats', 'curriculum', 'qualifications', 'experience'],
    questionPrompts: ['Where can I download Durgesh\'s resume?', 'Is there an ATS resume?'],
    answer: "Durgesh's 1-page ATS-optimized resume is available as a verified PDF download and responsive semantic HTML view with print stylesheets and keyword-rich executive summaries.",
    actionUrl: '/resume',
    actionLabel: 'Download Resume PDF 📄'
  },
  {
    id: 'performance',
    title: 'Core Web Vitals & Optimization',
    keywords: ['performance', 'speed', 'lcp', 'cls', 'vitals', 'bundle', 'fast', 'lighthouse', 'bandwidth', 'optimization'],
    questionPrompts: ['How fast is this website?', 'What are the Core Web Vitals metrics?'],
    answer: "Optimized for extreme speed: 754ms LCP, 0.0168 CLS, 87.7 kB shared JS bundle, and local 144.7 KB WebP space backgrounds (97.3% bandwidth savings over uncompressed PNGs).",
    actionUrl: '/performance',
    actionLabel: 'Open Performance Center ⚡'
  },
  {
    id: 'audit',
    title: 'System Audit & Production Attestation',
    keywords: ['audit', 'report', 'verification', 'testing', 'quality', 'gates', 'tests', 'hardened', 'production'],
    questionPrompts: ['What were the audit results?', 'Is this portfolio production ready?'],
    answer: "The portfolio holds a 100% green verification baseline certified across 91 unit tests, 22 accessibility tests, 309 internal links, and zero TypeScript errors, detailed in the 337 KB audit PDF.",
    actionUrl: '/V10_Audit_Hardening_Report.pdf',
    actionLabel: 'Open Verified Audit PDF 📑'
  },
  {
    id: 'cyberbot',
    title: 'CyberBot 3D Companion Studio',
    keywords: ['cyberbot', 'bot', 'companion', '3d', 'studio', 'skins', 'stunt', 'dance', 'avatar', 'robot'],
    questionPrompts: ['Tell me about CyberBot', 'How was CyberBot built?'],
    answer: "CyberBot is a procedural Three.js 3D companion featuring customizable chassis skins, real-time audio telemetry visualizers, 360° stunt flips, beat dancing, and contextual portfolio navigation.",
    actionUrl: '/cyberbot',
    actionLabel: 'Open 3D Studio Shell 🤖'
  }
]

export const SUGGESTED_QUESTION_CHIPS = [
  '💡 RoleRadar Tech Stack',
  '🏋️ MediaPipe Fitness',
  '🪐 SpaceEdu 3D Simulation',
  '🎓 Education & MCA',
  '⚡ Core Tech Stack',
  '🏆 AWS & UNLOX® Badges'
]

// Dynamic contextual suggestion chips based on active section ID
export const SECTION_CONTEXT_CHIPS: Record<string, string[]> = {
  hero: ['💡 RoleRadar Tech Stack', '🪐 SpaceEdu 3D Simulation', '📄 Download Resume PDF'],
  about: ['🎓 Education & MCA', '⚡ Core Tech Stack', '🏆 AWS & UNLOX® Badges'],
  experience: ['💼 RoleRadar Architecture', '⚡ AI/ML Engineering Skills', '📬 Contact Durgesh'],
  education: ['🎓 Education & MCA', '🏛️ Sri Balaji University', '🏆 AWS & UNLOX® Badges'],
  'featured-projects': ['💡 RoleRadar Tech Stack', '🏋️ MediaPipe Fitness', '📊 MarketMatch Clustering'],
  projects: ['💡 RoleRadar Tech Stack', '🏋️ MediaPipe Fitness', '📊 MarketMatch Clustering'],
  'github-projects': ['🐙 GitHub Repositories', '🔒 Cloudflare Security', '⚡ Core Tech Stack'],
  lab: ['🔬 ATS NLP Analyzer', '📊 Customer Segmentation', '🏋️ Posture Kinematics'],
  contact: ['📬 Direct Email Address', '📄 Download Resume PDF', '🏆 Verified Credentials']
}

/**
 * Computes Levenshtein distance between two strings for typo tolerance.
 */
function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length
  const n = s2.length
  if (m === 0) return n
  if (n === 0) return m

  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,       // deletion
        dp[i][j - 1] + 1,       // insertion
        dp[i - 1][j - 1] + cost // substitution
      )
    }
  }

  return dp[m][n]
}

/**
 * Fuzzy similarity ratio between two tokens [0, 1].
 */
function tokenSimilarity(tok1: string, tok2: string): number {
  if (tok1 === tok2) return 1.0
  const maxLen = Math.max(tok1.length, tok2.length)
  if (maxLen === 0) return 1.0
  const dist = levenshteinDistance(tok1, tok2)
  return 1.0 - dist / maxLen
}

/**
 * Enhanced Semantic & Fuzzy Knowledge Search.
 * Matches exact IDs, keywords, prompts, and tolerates up to 2-character typos.
 */
export function searchKnowledge(query: string): KnowledgeEntry | null {
  const clean = query.toLowerCase().trim()
  if (!clean) return null

  const queryTokens = clean.split(/[\s,._\-?!=/]+/).filter(t => t.length >= 2)
  if (queryTokens.length === 0) return null

  let bestEntry: KnowledgeEntry | null = null
  let maxScore = 0

  for (const entry of CYBERBOT_KNOWLEDGE_CORPUS) {
    let score = 0

    // Exact ID or title match
    if (clean.includes(entry.id) || clean.includes(entry.title.toLowerCase())) {
      score += 12
    }

    // Exact and Fuzzy Keyword Matching
    for (const kw of entry.keywords) {
      if (clean.includes(kw)) {
        score += 4
        continue
      }

      // Check token-level fuzzy match
      for (const tok of queryTokens) {
        if (tok.length >= 4 && kw.length >= 4) {
          const sim = tokenSimilarity(tok, kw)
          if (sim >= 0.75) {
            score += 3
            break
          }
        }
      }
    }

    // Prompt similarity
    for (const p of entry.questionPrompts) {
      const pClean = p.toLowerCase()
      if (clean.includes(pClean) || pClean.includes(clean)) {
        score += 8
      }
    }

    if (score > maxScore) {
      maxScore = score
      bestEntry = entry
    }
  }

  return maxScore >= 3 ? bestEntry : null
}
