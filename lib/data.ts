export const OWNER = {
  name: 'Durgesh Dutt Sinha',
  title: 'AIML Engineer & Full-Stack Developer',
  email: process.env.NEXT_PUBLIC_EMAIL || 'durgeshdsinha@gmail.com',
  phone: '+916299257203',
  location: 'Pune, Maharashtra, India',
  github: 'https://github.com/OxDurgeshxO',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/durgesh-dutt-s-4ba74924b',
  bio: 'Pursuing MCA in AIML at Sri Balaji University, Pune. AI Program Fellow at UNLOX®. Passionate about autonomous AI systems, full-stack development, and turning ideas into intelligent products.',
}

export const SKILLS = [
  { name: 'System Architecture', level: 85, category: 'core' },
  { name: 'AI Engineering', level: 88, category: 'ai' },
  { name: 'Prompt Engineering', level: 90, category: 'ai' },
  { name: 'Autonomous AI Agents', level: 82, category: 'ai' },
  { name: 'Full-Stack Dev', level: 80, category: 'dev' },
  { name: 'AWS ML', level: 75, category: 'cloud' },
  { name: 'Python', level: 85, category: 'dev' },
  { name: 'TypeScript', level: 78, category: 'dev' },
  { name: 'React / Next.js', level: 80, category: 'dev' },
  { name: 'Data Analytics', level: 76, category: 'data' },
]

export const EXPERIENCE = [
  {
    role: 'AI Cohort Member',
    company: 'Be10x',
    period: 'May 2026 – Present',
    location: 'India',
    points: [
      'Built autonomous AI agents to optimize real-world workflows',
      'Developed full-stack AI product concepts from ideation to demo',
      'Utilized data analytics to derive and communicate actionable insights',
    ],
    color: '#6c63ff',
  },
  {
    role: 'AI Program Fellow',
    company: 'UNLOX®',
    period: 'Jun 2026 – Present',
    location: 'Maharashtra, India (Remote)',
    points: [
      'Hands-on end-to-end AI deployment pipelines',
      'Built and tested autonomous AI systems for industry use-cases',
      'Industry-level project execution under mentorship',
    ],
    color: '#00d4ff',
  },
  {
    role: 'Central Co-Ordination Team',
    company: 'School of Computer Studies – SBUP',
    period: '2026',
    location: 'Pune',
    points: ['Volunteer at Freshers Central Coordination Team'],
    color: '#a855f7',
  },
]

export const EDUCATION = [
  {
    degree: 'Master of Computer Applications (AIML)',
    institution: 'Sri Balaji University, Pune',
    period: 'Jul 2025 – 2027 (Expected)',
    grade: 'Specialization: Artificial Intelligence & Machine Learning',
  },
  {
    degree: 'Bachelor of Computer Applications',
    institution: 'Sri Balaji University, Pune',
    period: 'Aug 2022 – Apr 2025',
    grade: 'Focus: AI, System Architecture, Prompt Engineering',
  },
]

export const CERTIFICATIONS = [
  { name: 'AWS Educate Emerging Talent Community Member', issuer: 'Amazon Web Services (AWS)', color: '#FF9900' },
  { name: 'AWS Educate Machine Learning Foundations', issuer: 'Amazon Web Services (AWS)', color: '#FF9900' },
]

export const VOLUNTEERING = [
  { role: 'Web Development Intern', org: 'InAmigos Foundation (IAF)', description: 'Built and maintained web pages for a non-profit organization.' },
]
