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
    title: 'AI Fitness Platform',
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
    keywords: ['certifications', 'aws', 'unlox', 'fellow', 'machine learning', 'cloud', 'credentials', 'cert'],
    questionPrompts: ['What certifications does Durgesh hold?', 'Is he AWS certified?'],
    answer: "Durgesh holds the AWS Machine Learning Foundations certification and is an UNLOX® AI Fellow, recognized for engineering autonomous agent architectures and production-grade LLM pipelines.",
    actionUrl: '/resume',
    actionLabel: 'Inspect Verified Badges 🏆'
  },
  {
    id: 'contact',
    title: 'Collaboration & Hiring',
    keywords: ['hire', 'contact', 'email', 'interview', 'reach', 'connect', 'linkedin', 'github', 'phone'],
    questionPrompts: ['How can I hire Durgesh?', 'What is his email address?'],
    answer: "You can reach Durgesh directly at durgeshsinha1234567@gmail.com or via LinkedIn. He is actively interviewing for AI/ML and Full-Stack Engineering roles.",
    actionUrl: '#contact',
    actionLabel: 'Send Direct Message 📬'
  },
  {
    id: 'stack',
    title: 'Engineering Stack & Skills',
    keywords: ['stack', 'skills', 'technologies', 'tools', 'languages', 'python', 'react', 'nextjs', 'typescript', 'threejs'],
    questionPrompts: ['What technologies does Durgesh use?', 'What is his core tech stack?'],
    answer: "Core stack: Python (PyTorch, TensorFlow, Scikit-Learn, MediaPipe, OpenCV), TypeScript/Next.js 14 SSG, Three.js/React Three Fiber, Cloudflare Pages Edge, Tailwind CSS, PostgreSQL, and Docker.",
    actionUrl: '/#about',
    actionLabel: 'Explore Skills Matrix ⚡'
  }
]

export const SUGGESTED_QUESTION_CHIPS = [
  '💡 RoleRadar Tech Stack',
  '🎓 Education & MCA',
  '🏋️ MediaPipe Fitness',
  '🏆 AWS ML Certifications',
]

export function searchKnowledge(query: string): KnowledgeEntry | null {
  const clean = query.toLowerCase().trim()
  if (!clean) return null

  let bestEntry: KnowledgeEntry | null = null
  let maxScore = 0

  for (const entry of CYBERBOT_KNOWLEDGE_CORPUS) {
    let score = 0
    // Exact id or title match
    if (clean.includes(entry.id) || clean.includes(entry.title.toLowerCase())) score += 10

    // Keyword matches
    for (const kw of entry.keywords) {
      if (clean.includes(kw)) score += 3
    }

    // Prompts similarity
    for (const p of entry.questionPrompts) {
      const pClean = p.toLowerCase()
      if (clean.includes(pClean) || pClean.includes(clean)) score += 6
    }

    if (score > maxScore) {
      maxScore = score
      bestEntry = entry
    }
  }

  return maxScore >= 3 ? bestEntry : null
}

