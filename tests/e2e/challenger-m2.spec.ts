import { test, expect } from '@playwright/test';

test.describe('Milestone 2 Challenger Empirical Audits', () => {
  test('AccessibilityPanel: Touch target, auto-focus, Tab cycling trap, and Escape dismissal', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 1. Locate floating trigger button
    const trigger = page.locator('button[aria-label="Open Accessibility Panel (Alt + A)"]');
    await expect(trigger).toBeVisible();

    // Verify touch target size >= 44x44px (WCAG 2.5.5 / 2.5.8)
    const box = await trigger.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }

    // 2. Click trigger to open modal dialog
    await trigger.click();

    const dialog = page.locator('div[role="dialog"][aria-label="Accessibility & Display Preferences"]');
    await expect(dialog).toBeVisible();

    // Wait for auto-focus on first element (setTimeout 50ms in component)
    await page.waitForTimeout(200);

    // Verify first focusable is focused (Close button)
    const closeBtn = dialog.locator('button[aria-label="Close dialog"]');
    await expect(closeBtn).toBeFocused();

    // 3. Tab cycling trap: query all focusable elements inside dialog
    const focusables = dialog.locator('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const count = await focusables.count();
    expect(count).toBeGreaterThanOrEqual(5);

    // Tab through all focusables
    for (let i = 1; i < count; i++) {
      await page.keyboard.press('Tab');
      await expect(focusables.nth(i)).toBeFocused();
    }

    // Now focus is on the last element. Pressing Tab must wrap around to the first element (closeBtn).
    await page.keyboard.press('Tab');
    await expect(closeBtn).toBeFocused();

    // Now focus is on first element. Pressing Shift+Tab must wrap to the last element.
    await page.keyboard.press('Shift+Tab');
    const lastElement = focusables.nth(count - 1);
    await expect(lastElement).toBeFocused();

    // 4. Escape handling: Pressing Escape must close the dialog and restore focus
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();

    // Verify focus restored to trigger or document body
    await page.waitForTimeout(100);
    const activeIsTrigger = await page.evaluate(() => {
      const active = document.activeElement;
      return active?.getAttribute('aria-label') === 'Open Accessibility Panel (Alt + A)';
    });
    expect(activeIsTrigger).toBe(true);

    // 5. Test Alt+A shortcut opening and Escape closing
    await page.keyboard.press('Alt+KeyA');
    await expect(dialog).toBeVisible();
    await page.waitForTimeout(200);
    await expect(closeBtn).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  const AUDIT_ROUTES = [
    { path: '/', name: 'Homepage' },
    { path: '/lab', name: 'AI Lab' },
    { path: '/performance', name: 'Performance Diagnostics' },
    { path: '/github-health', name: 'GitHub Health' },
    { path: '/work/roleradar', name: 'Case Study (RoleRadar)' },
    { path: '/recruiter', name: 'Recruiter Summary' },
    { path: '/resume', name: 'Executive Resume' },
    { path: '/cyberbot', name: 'CyberBot Studio' },
    { path: '/changelog', name: 'Changelog' },
    { path: '/privacy', name: 'Privacy Policy' },
  ];

  for (const route of AUDIT_ROUTES) {
    test(`Heading hierarchy validation: ${route.name} (${route.path}) has sequential headings`, async ({ page }) => {
      test.setTimeout(60000);
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);

      // Extract all visible headings in document order
      const headings = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        return elements.map((el) => {
          const tag = el.tagName.toUpperCase();
          const level = parseInt(tag.replace('H', ''), 10);
          const text = (el.textContent || '').trim().replace(/\s+/g, ' ').substring(0, 50);
          return { tag, level, text };
        });
      });

      expect(headings.length).toBeGreaterThan(0);

      // Page should have an H1
      const h1Count = headings.filter((h) => h.level === 1).length;
      expect(h1Count, `Route ${route.path} must have at least one H1`).toBeGreaterThanOrEqual(1);

      // Verify no skipped heading levels (e.g. h1 -> h3 without h2)
      let prevLevel = 0;
      for (const h of headings) {
        if (prevLevel > 0) {
          const diff = h.level - prevLevel;
          // You can go down by 1 level (e.g. h1 -> h2, h2 -> h3), or go up to any higher level (e.g. h3 -> h2, h3 -> h1)
          if (diff > 1) {
            throw new Error(
              `Heading level skipped on ${route.path}: went from H${prevLevel} directly to H${h.level} ("${h.text}")`
            );
          }
        }
        prevLevel = h.level;
      }
    });
  }

  test('Label in Name check on modified interactive elements', async ({ page, isMobile }) => {
    test.setTimeout(60000);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    if (!isMobile) {
      // 1. Desktop Navbar Search button
      const searchBtn = page.locator('button[aria-label="Search (Ctrl+K) - Command Palette"]');
      await expect(searchBtn).toBeVisible();
      const searchBtnText = await searchBtn.innerText();
      expect(searchBtnText).toContain('Search');
      expect(searchBtnText).toContain('Ctrl+K');
    } else {
      // 1. Mobile Search icon button
      const mobileSearchBtn = page.locator('button[aria-label="Open search command palette"]');
      await expect(mobileSearchBtn).toBeVisible();
    }

    // 2. Hero Visual Mode button
    const visualBtn = page.locator('button:has-text("Visual:")');
    await expect(visualBtn).toBeVisible();
    const visualAria = await visualBtn.getAttribute('aria-label');
    const visualText = (await visualBtn.innerText()).trim();
    expect(visualAria).not.toBeNull();
    expect(visualAria?.startsWith(visualText)).toBe(true);

    // 3. CyberBot input semantics
    await page.goto('/cyberbot');
    await page.waitForLoadState('networkidle');
    const botInput = page.locator('input#cyberbot-query');
    await expect(botInput).toBeVisible();
    expect(await botInput.getAttribute('name')).toBe('query');
    expect(await botInput.getAttribute('autoComplete')).toBe('off');
    expect(await botInput.getAttribute('aria-label')).toBe('Ask anything about Durgesh');

    // 4. Contact section inputs
    await page.goto('/');
    const nameInput = page.locator('input#contact-name');
    const emailInput = page.locator('input#contact-email');
    await expect(nameInput).toHaveAttribute('autoComplete', 'name');
    await expect(emailInput).toHaveAttribute('autoComplete', 'email');
  });
});
