import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '../styles/globals.css'


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://durgesh-portfolio.pages.dev'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    url: SITE_URL,
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
        '@id': `${SITE_URL}/#person`,
        name: 'Durgesh Dutt Sinha',
        jobTitle: 'AI/ML Engineer & Developer',
        url: SITE_URL,
        image: `${SITE_URL}/og-image.png`,
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
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Durgesh Dutt Sinha - AI/ML Engineering Portfolio',
        description: 'Flagship engineering portfolio featuring production AI SaaS, real-time voice assistants, and unsupervised ML pipelines.',
        publisher: {
          '@id': `${SITE_URL}/#person`,
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
          '@id': `${SITE_URL}/#person`,
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
          '@id': `${SITE_URL}/#person`,
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
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>{children}</body>
    </html>
  )
}