import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://durgesh-portfolio-v2.pages.dev'),
  title: 'Durgesh Dutt Sinha | AIML Engineer & Developer',
  description: 'Professional 3D portfolio of Durgesh Dutt Sinha — AIML Engineer, AI Program Fellow, Full-Stack Developer.',
  keywords: ['AI Engineer', 'AIML', 'Portfolio', 'Full Stack', 'Durgesh Dutt Sinha', 'Three.js', 'Next.js'],
  authors: [{ name: 'Durgesh Dutt Sinha', url: 'https://github.com/OxDurgeshxO' }],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Durgesh Dutt Sinha | AIML Engineer & Developer',
    description: 'Interactive 3D digital portfolio showcasing autonomous AI systems, machine learning architectures, and full-stack engineering.',
    url: 'https://durgesh-portfolio-v2.pages.dev',
    siteName: 'Durgesh Dutt Sinha Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 2400,
        height: 1260,
        alt: 'Durgesh Dutt Sinha — AIML Engineer & Developer Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Durgesh Dutt Sinha | AIML Engineer & Developer',
    description: 'Interactive 3D digital portfolio showcasing autonomous AI systems, machine learning architectures, and full-stack engineering.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Durgesh Dutt Sinha',
    jobTitle: 'AIML Engineer & Developer',
    url: 'https://durgesh-portfolio-v2.pages.dev',
    sameAs: [
      'https://github.com/OxDurgeshxO',
      'https://www.linkedin.com/in/durgesh-dutt-s-4ba74924b',
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Autonomous Agents',
      'Deep Learning',
      'Full-Stack Development',
      'Next.js',
      'Python',
      'TypeScript',
      'Three.js',
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
