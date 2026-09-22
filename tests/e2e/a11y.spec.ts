import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Axe audits for every route the portfolio ships.
 *
 * `color-contrast` used to be disabled globally here:
 *   ACCEPTED_RULES = ['color-contrast']   (previous revision)
 *
 * The token layer restored since then brings all audited routes to zero
 * contrast violations, so the rule is enforced again — a disabled rule is a
 * blind spot, not an accepted exception. Coverage was also widened from the
 * original 3 routes to the 10 the audit covers, including the resume,
 * changelog, lab, health, performance and privacy surfaces plus the 404 route.
 */
const ROUTES = [
  { path: '/', name: 'Homepage' },
  { path: '/recruiter', name: 'Recruiter' },
  { path: '/resume', name: 'Resume' },
  { path: '/work/roleradar', name: 'Case study' },
  { path: '/changelog', name: 'Changelog' },
  { path: '/lab', name: 'AI Lab' },
  { path: '/github-health', name: 'GitHub health' },
  { path: '/performance', name: 'Performance' },
  { path: '/privacy', name: 'Privacy' },
  { path: '/this-route-does-not-exist', name: 'Not found' },
];

test.describe('Automated Accessibility Audits (Axe)', () => {
  for (const route of ROUTES) {
    test(`${route.name} ${route.path} has zero critical or serious axe violations`, async ({
      page,
    }) => {
      // Several routes mount a 3D scene and an intro loader, so the default
      // per-test budget is not enough on a cold build.
      test.setTimeout(120000);

      await page.goto(route.path);
      await page.waitForLoadState('networkidle');

      // Let the intro loader and entrance animations settle, so contrast is
      // measured on the final rendered state rather than mid-transition.
      await page.waitForTimeout(3000);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const seriousOrCritical = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      );

      expect(
        seriousOrCritical,
        `axe found ${seriousOrCritical.length} critical/serious violation(s) on ${route.path}: ${JSON.stringify(
          seriousOrCritical.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.length,
          })),
        )}`
      ).toEqual([]);
    });
  }
});
