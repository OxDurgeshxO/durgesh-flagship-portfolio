import { test, expect } from '@playwright/test';

test.describe('Contact Form Interaction & Resilience', () => {
  test('Contact form renders fields and submits successfully on 200 API response', async ({ page }) => {
    // Intercept /api/contact and return 200 OK
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Message delivered.' }),
      });
    });

    await page.goto('/');
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();

    // Fill form fields
    await page.locator('#contact-name').fill('Ada Lovelace');
    await page.locator('#contact-email').fill('ada@example.com');
    await page.locator('#contact-message').fill('Hello Durgesh, this is a test inquiry about intelligent systems engineering.');

    // Submit form
    const submitBtn = page.getByRole('button', { name: /Send Message/i });
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // Verify success banner and updated copy
    await expect(page.getByText('Message Dispatched!')).toBeVisible({ timeout: 10000 });
    await expect(
      page.getByText('Your message was sent successfully. Durgesh will respond within 24 hours.')
    ).toBeVisible();
  });

  test('Contact form handles 429 rate limit error gracefully', async ({ page }) => {
    // Intercept /api/contact and simulate 429 Rate Limit
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 429,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Too many requests. Please wait a minute before sending another message.' }),
      });
    });

    await page.goto('/');
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();

    await page.locator('#contact-name').fill('Rapid Sender');
    await page.locator('#contact-email').fill('rapid@example.com');
    await page.locator('#contact-message').fill('Checking rate limit handling in UI.');

    const submitBtn = page.getByRole('button', { name: /Send Message/i });
    await submitBtn.click();

    // Verify error banner displays rate limit error message
    await expect(
      page.getByText(/Too many requests/i)
    ).toBeVisible({ timeout: 10000 });
  });
});
