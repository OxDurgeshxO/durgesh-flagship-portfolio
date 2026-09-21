import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://durgesh-portfolio-v2.pages.dev'),
  title: 'Durgesh Dutt Sinha | AI/ML Engineer & Intelligent Systems Developer',
  description: 'AI/ML Engineer building useful AI products, ML pipelines, and intelligent interfaces. Explore 5 flagship platforms, architecture deep dives, and production deployments.',
  keywords: [
    'AI/ML engineer portfolio',
    'Full-stack AI developer',
    'Next.js AI applications',
    'Machine learning projects',
    'Realtime voice assistant developer',
    'Durgesh Dutt Sinha',
    'RoleRadar',
    'PyTorch',
    'Three.js',
  ],
  authors: [{ name: 'Durgesh Dutt Sinha', url: 'https://github.com/OxDurgeshxO' }],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Durgesh Dutt Sinha | AI/ML Engineer & Developer',
    description: 'I design and ship AI applications, ML systems, and high-performance web experiences. View 5 flagship platforms and verified architecture case studies.',
    url: 'https://durgesh-portfolio-v2.pages.dev',
    siteName: 'Durgesh Dutt Sinha Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 2400,
        height: 1260,
        alt: 'Durgesh Dutt Sinha - AI/ML Engineer & Developer Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Durgesh Dutt Sinha | AI/ML Engineer & Developer',
    description: 'I design and ship AI applications, ML systems, and high-performance web experiences. View 5 flagship platforms and verified architecture case studies.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://durgesh-portfolio-v2.pages.dev/#person',
        name: 'Durgesh Dutt Sinha',
        jobTitle: 'AI/ML Engineer & Developer',
        url: 'https://durgesh-portfolio-v2.pages.dev',
        image: 'https://durgesh-portfolio-v2.pages.dev/og-image.png',
        sameAs: [
          'https://github.com/OxDurgeshxO',
          'https://www.linkedin.com/in/durgesh-dutt-s-4ba74924b',
        ],
        knowsAbout: [
          'Artificial Intelligence',
          'Machine Learning',
          'Autonomous AI Agents',
          'Deep Learning',
          'Computer Vision',
          'Full-Stack Development',
          'Next.js',
          'Python',
          'TypeScript',
          'WebSockets',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://durgesh-portfolio-v2.pages.dev/#website',
        url: 'https://durgesh-portfolio-v2.pages.dev',
        name: 'Durgesh Dutt Sinha - AI/ML Engineering Portfolio',
        description: 'Flagship engineering portfolio featuring production AI SaaS, real-time voice assistants, and unsupervised ML pipelines.',
        publisher: {
          '@id': 'https://durgesh-portfolio-v2.pages.dev/#person',
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'RoleRadar',
        operatingSystem: 'Web',
        applicationCategory: 'BusinessApplication',
        url: 'https://rolefit-2.vercel.app',
        description: 'AI-powered resume analysis and career intelligence platform evaluating candidates across 16 industry roles with 8-point ATS scoring.',
        author: {
          '@id': 'https://durgesh-portfolio-v2.pages.dev/#person',
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'jarvis-realtime-assistant',
        operatingSystem: 'Web',
        applicationCategory: 'MultimediaApplication',
        url: 'https://oxdurgeshxo.github.io/jarvis-realtime-assistant/',
        description: 'Realtime AI voice assistant and Iron Man HUD powered by Gemini 2.0 Flash, Whisper STT, and WebSockets.',
        author: {
          '@id': 'https://durgesh-portfolio-v2.pages.dev/#person',
        },
      },
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}