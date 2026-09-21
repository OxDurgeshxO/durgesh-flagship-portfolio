import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Known non-blocking accepted contrast exceptions:
// Decorative badges and subtle tech labels documented under theme tokens
const ACCEPTED_RULES = ['color-contrast'];

test.describe('Automated Accessibility Audits (Axe)', () => {
  test('Homepage has zero critical or serious axe violations', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(ACCEPTED_RULES)
      .analyze();

    const seriousOrCritical = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    expect(seriousOrCritical).toEqual([]);
  });

  test('Recruiter page has zero critical or serious axe violations', async ({ page }) => {
    await page.goto('/recruiter');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(ACCEPTED_RULES)
      .analyze();

    const seriousOrCritical = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    expect(seriousOrCritical).toEqual([]);
  });

  test('Case study page has zero critical or serious axe violations', async ({ page }) => {
    await page.goto('/work/roleradar');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .disableRules(ACCEPTED_RULES)
      .analyze();

    const seriousOrCritical = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    expect(seriousOrCritical).toEqual([]);
  });
});
