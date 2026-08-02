import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Durgesh Dutt Sinha | AIML Engineer & Developer',
  description: 'Professional 3D portfolio of Durgesh Dutt Sinha — AIML Engineer, AI Program Fellow, Full-Stack Developer.',
  keywords: ['AI Engineer', 'AIML', 'Portfolio', 'Full Stack', 'Durgesh Dutt Sinha'],
  authors: [{ name: 'Durgesh Dutt Sinha', url: 'https://github.com/OxDurgeshxO' }],
  openGraph: {
    title: 'Durgesh Dutt Sinha | AIML Engineer',
    description: '3D Digital Portfolio — AI, Full-Stack & Autonomous Systems',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
