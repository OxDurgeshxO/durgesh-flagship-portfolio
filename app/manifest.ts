import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Durgesh Dutt Sinha | AI/ML Engineer Portfolio',
    short_name: 'Durgesh Portfolio',
    description: 'High-performance portfolio of Durgesh Dutt Sinha - AI/ML Engineer building intelligent interfaces, ML pipelines, and production systems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0c0c14',
    theme_color: '#0c0c14',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
    ],
  }
}