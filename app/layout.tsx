import type { Metadata } from 'next'
import {
  Inter,
  JetBrains_Mono,
  IBM_Plex_Mono,
  Space_Grotesk,
  Newsreader,
  Instrument_Sans,
  Archivo,
} from 'next/font/google'
import '../styles/globals.css'
// Portfolio theme: Cobalt Blueprint, dark only.
// One flat token sheet scoped to :root — no theme switching, no light mode and
// no attribute scoping. See styles/theme.css for the palette and measured floors.
import '../styles/theme.css'
// Cyber Ronin // Neural Edges hero background layer (own namespaced stylesheet).
import '../components/cyber-ronin/cyber-ronin.css'
import { THEME_BOOT_SCRIPT } from '@/lib/themes/boot'
import { ThemeProvider } from '@/lib/themes/provider'


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

/* Cobalt Blueprint's own faces. Inter + JetBrains Mono remain loaded as the
   document/UI fallbacks; the three other display families that existed for the
   removed themes are gone, so they are no longer shipped to visitors at all. */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
})

/* Display faces for Graphite Ledger, Ember Titanium and Noir Gallery.
   preload:false — only one theme is active at a time, so preloading these would
   cost every visitor bandwidth for fonts they may never render.
   adjustFontFallback:false — Next 14.2 has no bundled metric-override data for
   these faces and that lookup is what fails the build; it is the computation
   being disabled, not the font. */
const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-newsreader',
  preload: false,
  adjustFontFallback: false,
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-sans',
  preload: false,
  adjustFontFallback: false,
})

const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
  preload: false,
  adjustFontFallback: false,
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://durgesh-portfolio.pages.dev'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Durgesh Dutt Sinha | AI/ML Engineer & Intelligent Systems Developer',
  alternates: {
    canonical: '/',
  },
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
        jobTitle: 'AIML Engineer & Full-Stack Developer',
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
      {
        '@type': 'SoftwareApplication',
        name: 'MarketMatch-AI',
        operatingSystem: 'Web',
        applicationCategory: 'BusinessApplication',
        url: 'https://oxdurgeshxo-marketmatch-ai-app-y8ysbm.streamlit.app/',
        description: 'End-to-end machine learning pipeline clustering retail consumer behaviors using K-Means and DBSCAN with PCA dimensionality reduction, paired with a Nearest Neighbors recommendation engine for hyper-targeted campaigns.',
        author: {
          '@id': `${SITE_URL}/#person`,
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'CNN-STREAMLIT',
        operatingSystem: 'Web',
        applicationCategory: 'MultimediaApplication',
        description: 'End-to-end Deep Learning Convolutional Neural Network trained on Fashion-MNIST with 89.3% accuracy, featuring an interactive real-time Streamlit image classifier with sketch canvas and photo upload.',
        author: {
          '@id': `${SITE_URL}/#person`,
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'FitTrack AI Fitness Platform',
        operatingSystem: 'Web',
        applicationCategory: 'HealthApplication',
        description: 'Production-grade 9-page fitness engineering platform featuring real-time MediaPipe pose estimation, kinematic joint angle tracking, exercise rep counting, wearable sensor telemetry, and workout analytics.',
        author: {
          '@id': `${SITE_URL}/#person`,
        },
      },
    ],
  }

  return (
    <html lang="en" data-theme="cobalt" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Anti-FOUC boot script: applies the stored or URL-selected theme before
            the first paint, so a visitor who chose another theme never sees a
            flash of the default. It MUST stay inline, synchronous and in <head>.
            The static data-theme="cobalt" on <html> is the JS-disabled baseline. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
        <meta name="theme-color" content="#07131f" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} ${newsreader.variable} ${instrumentSans.variable} ${archivo.variable}`}
      >
        {/* Global skip link (WCAG 2.4.1). Every route renders a
            <main id="main-content">, so a single link in the root layout covers
            the whole app instead of only the homepage. */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {/* ThemeProvider lives at the ROOT, not inside PortfolioShell:
            PortfolioShell only wraps the homepage, while /not-found, /error and
            the secondary routes render this layout plus <Navbar /> — and the
            navbar contains the theme panel, which reads this context. */}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}