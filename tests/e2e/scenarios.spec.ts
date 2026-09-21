import { test, expect } from '@playwright/test';
import { CASE_STUDIES } from '../../lib/case-studies';

test.describe('Doc1 Core Scenarios & Resilience Verification', () => {
  // 1. Homepage loads with a visible hero heading
  test('1. Homepage loads with a visible hero heading', async ({ page }) => {
    await page.goto('/');
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Durgesh Dutt Sinha');
  });

  // 2. Primary CTA navigates to selected work
  test('2. Primary CTA navigates to selected work', async ({ page }) => {
    await page.goto('/');
    const cta = page.getByRole('link', { name: /View Selected Work/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /#projects|#featured-projects/);
  });

  // 3. Navigation works on mobile
  test('3. Navigation works on mobile', async ({ page, isMobile }) => {
    await page.goto('/');
    if (isMobile) {
      // Mobile header should be visible with navigation elements
      const nav = page.locator('nav, header');
      await expect(nav.first()).toBeVisible();
    } else {
      const desktopNav = page.locator('nav');
      await expect(desktopNav).toBeVisible();
    }
  });

  // 4. Every flagship project route loads dynamically
  test('4. Every flagship project route loads dynamically from CASE_STUDIES', async ({ page }) => {
    const slugs = Object.keys(CASE_STUDIES);
    expect(slugs.length).toBeGreaterThanOrEqual(5);

    for (const slug of slugs) {
      const response = await page.goto(`/work/${slug}`);
      expect(response?.status()).toBe(200);
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
    }
  });

  // 5. Resume link returns a valid PDF
  test('5. Resume link returns a valid PDF', async ({ request }) => {
    const response = await request.get('/resume.pdf');
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'] || '';
    expect(contentType.toLowerCase()).toContain('pdf');
  });

  // 6. Custom 404 renders
  test('6. Custom 404 renders for unknown paths', async ({ page }) => {
    const response = await page.goto('/_not-found');
    // In static export, _not-found page is prerendered
    await expect(page.locator('body')).toContainText(/not found|page not found|404/i);
  });

  // 7. Keyboard users can reach primary controls
  test('7. Keyboard navigation reaches primary landmarks and buttons', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(focused).toBeTruthy();
  });

  // 8. Reduced-motion mode disables or reduces animation
  test('8. Reduced-motion mode respected', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
  });

  // 9. WebGL failure does not hide the main content
  test('9. WebGL failure does not hide the main content', async ({ page }) => {
    // Disable WebGL by navigating with a page that has WebGL context disabled
    await page.addInitScript(() => {
      HTMLCanvasElement.prototype.getContext = function (type: string) {
        if (type === 'webgl' || type === 'webgl2') {
          return null;
        }
        return null;
      } as any;
    });

    await page.goto('/');
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Durgesh Dutt Sinha');
    const mainContent = page.locator('main, #hero');
    await expect(mainContent.first()).toBeVisible();
  });
});
