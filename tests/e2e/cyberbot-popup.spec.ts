import { test, expect } from '@playwright/test'

test.describe('CyberBot Companion Interactive System & Popup Persistence', () => {
  test.beforeEach(async () => {
    test.setTimeout(60000)
  })

  test('Speech bubble stays visible on mouse hover and handles Q&A search', async ({ page, isMobile }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    // Allow portfolio loading screen to clear and 3D companion to mount
    const companion = page.locator('[role="region"][aria-label*="CyberBot 3D AI Companion"]')
    await expect(companion).toBeVisible({ timeout: 25000 })

    if (isMobile) {
      // On mobile viewport, click the floating badge to open bubble
      const calloutBadge = companion.locator('button:has-text("CyberBot AI")')
      await expect(calloutBadge).toBeVisible({ timeout: 5000 })
      await calloutBadge.click()
    }

    // Find speech bubble
    const speechBubble = companion.locator('[role="status"][aria-live="polite"]')
    await expect(speechBubble).toBeVisible({ timeout: 10000 })

    // Hover over speech bubble to verify it does not dismiss
    await speechBubble.hover()
    await page.waitForTimeout(2000)
    await expect(speechBubble).toBeVisible()

    // Test integrated Q&A search
    const searchInput = speechBubble.locator('input[placeholder*="Ask anything about Durgesh"]')
    await expect(searchInput).toBeVisible()
    await searchInput.fill('RoleRadar')
    await searchInput.press('Enter')

    // Expect message body to update with RoleRadar details
    const messageBody = speechBubble.locator('p')
    await expect(messageBody).toContainText(/RoleRadar/i, { timeout: 5000 })

    // Test Quick-Dial drawer opening
    const quickDialBtn = speechBubble.getByRole('button', { name: /Quick-Dial/i })
    await expect(quickDialBtn).toBeVisible()
    await quickDialBtn.click()

    const quickDialDrawer = page.locator('text=Recruiter Quick-Dial')
    await expect(quickDialDrawer).toBeVisible({ timeout: 5000 })

    // Press Escape to close quick dial
    await page.keyboard.press('Escape')
    await expect(quickDialDrawer).not.toBeVisible()
  })

  test('CyberBot Studio page renders full 3D canvas and controls', async ({ page }) => {
    await page.goto('/cyberbot', { waitUntil: 'domcontentloaded' })
    const heading = page.locator('h1')
    await expect(heading).toContainText(/CyberBot 3D Studio/i)

    // Canvas exists
    const canvas = page.locator('canvas')
    await expect(canvas.first()).toBeVisible({ timeout: 15000 })

    // Studio action buttons exist
    const flipButton = page.getByRole('button', { name: /360° Ion Flip/i })
    await expect(flipButton).toBeVisible()
  })
})
