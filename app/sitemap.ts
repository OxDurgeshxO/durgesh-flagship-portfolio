import { MetadataRoute } from 'next'
import { CASE_STUDIES } from '@/lib/case-studies'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://durgesh-portfolio.pages.dev'

// Stable content date (repo ground truth: GITHUB_HEALTH_SNAPSHOT_DATE in lib/github-health.ts,
// docs/performance-evidence.md audit date). Fixed so lastmod does not churn on every rebuild.
const CONTENT_LAST_MODIFIED = '2026-09-21'

// /work/fitness-platform is a byte-identical alias of /work/fittrack and is excluded from the
// sitemap; its canonical points at /work/fittrack (see app/work/[slug]/page.tsx).
const DUPLICATE_CASE_STUDY_SLUGS = ['fitness-platform']

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/resume`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/recruiter`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/performance`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/changelog`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/lab`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/github-health`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const caseStudyRoutes: MetadataRoute.Sitemap = Object.keys(CASE_STUDIES)
    .filter((slug) => !DUPLICATE_CASE_STUDY_SLUGS.includes(slug))
    .map((slug) => ({
      url: `${BASE_URL}/work/${slug}`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.85,
    }))

  return [...staticRoutes, ...caseStudyRoutes]
}