import { test, expect } from '@playwright/test';

test.describe('Console Error & Runtime Exception Auditor', () => {
  const routes = ['/', '/resume', '/recruiter', '/performance', '/changelog', '/github-health', '/lab', '/work/roleradar'];

  for (const route of routes) {
    test(`Route ${route} executes with zero unhandled console errors`, async ({ page }) => {
      const errors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          // Ignore favicon 404 in dev or harmless audio context warnings if any
          const text = msg.text();
          if (!text.includes('favicon.ico') && !text.includes('AudioContext')) {
            errors.push(`Console error on ${route}: ${text}`);
          }
        }
      });

      page.on('pageerror', (err) => {
        errors.push(`Page exception on ${route}: ${err.message}`);
      });

      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');

      expect(errors).toEqual([]);
    });
  }
});
