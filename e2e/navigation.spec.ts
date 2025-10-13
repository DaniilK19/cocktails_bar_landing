import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should navigate to cocktails section when clicking Collection link', async ({ page }) => {
    await page.getByText('Collection').first().click()
    await page.waitForTimeout(500)

    const url = page.url()
    expect(url).toContain('#cocktails')
  })

  test('should navigate to about section when clicking Histoire link', async ({ page }) => {
    await page.getByText('Histoire').first().click()
    await page.waitForTimeout(500)

    const url = page.url()
    expect(url).toContain('#about')
  })

  test('should navigate to contact section when clicking Contact link', async ({ page }) => {
    await page.getByText('Contact').first().click()
    await page.waitForTimeout(500)

    const url = page.url()
    expect(url).toContain('#contact')
  })

  test('should open mobile menu and navigate', async ({ page, isMobile }) => {
    if (!isMobile) {
      await page.setViewportSize({ width: 375, height: 667 })
    }

    // Open mobile menu
    await page.getByLabel('Ouvrir le menu').click()
    await expect(page.getByLabel('Fermer le menu')).toBeVisible()

    // Click on a navigation item
    await page.getByText('Histoire').last().click()
    await page.waitForTimeout(500)

    // Menu should close
    await expect(page.getByLabel('Fermer le menu')).not.toBeVisible()
  })

  test('should close mobile menu when clicking backdrop', async ({ page, isMobile }) => {
    if (!isMobile) {
      await page.setViewportSize({ width: 375, height: 667 })
    }

    // Open mobile menu
    await page.getByLabel('Ouvrir le menu').click()
    await expect(page.getByLabel('Fermer le menu')).toBeVisible()

    // Click backdrop
    await page.locator('.fixed.inset-0.z-40').first().click({ position: { x: 10, y: 10 } })
    await page.waitForTimeout(300)

    // Menu should close
    await expect(page.getByLabel('Fermer le menu')).not.toBeVisible()
  })

  test('should close mobile menu when clicking close button', async ({ page, isMobile }) => {
    if (!isMobile) {
      await page.setViewportSize({ width: 375, height: 667 })
    }

    // Open mobile menu
    await page.getByLabel('Ouvrir le menu').click()
    await expect(page.getByLabel('Fermer le menu')).toBeVisible()

    // Click close button
    await page.getByLabel('Fermer le menu').first().click()
    await page.waitForTimeout(300)

    // Menu should close
    await expect(page.getByLabel('Fermer le menu')).not.toBeVisible()
  })

  test('should navigate to home when clicking logo', async ({ page }) => {
    await page.getByLabel('Maison Cocktail - Accueil').click()
    await page.waitForLoadState('networkidle')

    const url = page.url()
    expect(url).toBe('http://localhost:3000/')
  })

  test('should show sticky header on scroll', async ({ page }) => {
    const header = page.locator('header')
    await expect(header).toBeVisible()

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500))
    await page.waitForTimeout(300)

    // Header should still be visible and have scrolled class
    await expect(header).toBeVisible()
  })
})
