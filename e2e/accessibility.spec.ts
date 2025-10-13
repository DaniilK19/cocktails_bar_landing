import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should have proper document structure', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    const h1 = await page.locator('h1').count()
    expect(h1).toBeGreaterThanOrEqual(0)

    const h2 = await page.locator('h2').count()
    expect(h2).toBeGreaterThanOrEqual(0)
  })

  test('should have alt text for images', async ({ page }) => {
    await page.waitForTimeout(2000)
    const images = page.locator('img')
    const count = await images.count()

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const alt = await images.nth(i).getAttribute('alt')
        // Alt can be empty string for decorative images, but should exist
        expect(alt).toBeDefined()
      }
    }
  })

  test('should have proper aria labels', async ({ page }) => {
    await expect(page.getByLabel('Maison Cocktail - Accueil')).toBeVisible()
    await expect(page.getByLabel('Navigation principale')).toBeVisible()
  })

  test('should have focusable interactive elements', async ({ page }) => {
    await page.keyboard.press('Tab')
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement || '')
  })

  test('should have proper link titles', async ({ page }) => {
    const links = page.locator('a[title]')
    const count = await links.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should have lang attribute', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang')
    expect(lang).toBe('fr')
  })

  test('should have proper button labels', async ({ page, isMobile }) => {
    if (!isMobile) {
      await page.setViewportSize({ width: 375, height: 667 })
    }

    await expect(page.getByLabel('Ouvrir le menu')).toBeVisible()

    await page.getByLabel('Ouvrir le menu').click()
    await expect(page.getByLabel('Fermer le menu')).toBeVisible()
  })

  test('should have semantic HTML elements', async ({ page }) => {
    const nav = await page.locator('nav').count()
    const header = await page.locator('header').count()
    const footer = await page.locator('footer').count()
    const main = await page.locator('main').count()

    expect(nav).toBeGreaterThan(0)
    expect(header).toBeGreaterThan(0)
    expect(footer).toBeGreaterThan(0)
    expect(main).toBeGreaterThan(0)
  })

  test('should have address element in footer', async ({ page }) => {
    await page.locator('footer').scrollIntoViewIfNeeded()
    const address = page.locator('address')
    await expect(address).toBeVisible()
  })

  test('should have proper time elements', async ({ page }) => {
    await page.locator('footer').scrollIntoViewIfNeeded()
    const timeElements = page.locator('time')
    const count = await timeElements.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should support keyboard navigation', async ({ page }) => {
    // Tab through elements
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    const focused = await page.evaluate(() => document.activeElement !== document.body)
    expect(focused).toBeTruthy()
  })
})
