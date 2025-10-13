import { test, expect } from '@playwright/test'

test.describe('Responsive Design', () => {
  test('should work on iPhone 12', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    await expect(page.getByLabel('Ouvrir le menu')).toBeVisible()
    await expect(page.getByText('MAISON')).toBeVisible()
  })

  test('should work on iPad', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')

    await expect(page.getByText('MAISON')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  test('should work on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')

    await expect(page.getByText('Collection')).toBeVisible()
    await expect(page.getByText('MAISON')).toBeVisible()
  })

  test('should have touch-friendly buttons on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const menuButton = page.getByLabel('Ouvrir le menu')
    const boundingBox = await menuButton.boundingBox()

    // Check minimum touch target size (44x44px)
    expect(boundingBox?.height).toBeGreaterThanOrEqual(44)
  })

  test('should not overflow on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 })
    await page.goto('/')

    const body = page.locator('body')
    const boundingBox = await body.boundingBox()

    // Should not cause horizontal scroll
    expect(boundingBox?.width).toBeLessThanOrEqual(320)
  })

  test('should adjust header on scroll for mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 300))
    await page.waitForTimeout(300)

    const header = page.locator('header')
    await expect(header).toBeVisible()
  })

  test('should display mobile menu correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    await page.getByLabel('Ouvrir le menu').click()
    await expect(page.getByLabel('Navigation mobile')).toBeVisible()
    await expect(page.getByText('Réserver une table')).toBeVisible()
  })

  test('should show desktop navigation on large screens', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    await expect(page.getByLabel('Navigation principale')).toBeVisible()
    await expect(page.getByLabel('Ouvrir le menu')).not.toBeVisible()
  })

  test('should handle orientation change', async ({ page }) => {
    // Portrait
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await expect(page.getByText('MAISON')).toBeVisible()

    // Landscape
    await page.setViewportSize({ width: 667, height: 375 })
    await page.waitForTimeout(300)
    await expect(page.getByText('MAISON')).toBeVisible()
  })
})
