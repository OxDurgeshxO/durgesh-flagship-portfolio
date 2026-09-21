import { test, expect } from '@playwright/test';
import { CASE_STUDIES } from '../../lib/case-studies';

test.describe('Post-Deployment Static Route Smoke Tests', () => {
  const staticRoutes = [
    '/',
    '/resume',
    '/recruiter',
    '/performance',
    '/changelog',
    '/github-health',
    '/lab',
    '/privacy',
    '/robots.txt',
    '/sitemap.xml',
    '/resume.pdf',
  ];

  for (const route of staticRoutes) {
    test(`Static route ${route} responds 200 OK`, async ({ request }) => {
      const res = await request.get(route);
      expect(res.status()).toBe(200);
    });
  }

  for (const slug of Object.keys(CASE_STUDIES)) {
    test(`Case study /work/${slug} responds 200 OK`, async ({ request }) => {
      const res = await request.get(`/work/${slug}`);
      expect(res.status()).toBe(200);
    });
  }
});
