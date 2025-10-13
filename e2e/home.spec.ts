import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load the home page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Maison Cocktail/)
  })

  test('should display the header with logo', async ({ page }) => {
    await expect(page.getByText('MAISON')).toBeVisible()
    await expect(page.getByText('COCKTAIL')).toBeVisible()
  })

  test('should display all navigation items', async ({ page }) => {
    await expect(page.getByText('Accueil')).toBeVisible()
    await expect(page.getByText('Collection')).toBeVisible()
    await expect(page.getByText('Histoire')).toBeVisible()
    await expect(page.getByText('Contact')).toBeVisible()
  })

  test('should display hero section', async ({ page }) => {
    // Wait for the hero section to load
    await expect(page.locator('section').first()).toBeVisible()
  })

  test('should display footer', async ({ page }) => {
    await page.locator('footer').scrollIntoViewIfNeeded()
    await expect(page.locator('footer')).toBeVisible()
    await expect(page.getByText('12 Place Vendôme')).toBeVisible()
  })

  test('should have proper meta tags', async ({ page }) => {
    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).toBeTruthy()
    expect(description).toContain('cocktail')
  })

  test('should load without console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.waitForLoadState('networkidle')
    expect(errors).toHaveLength(0)
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.getByLabel('Ouvrir le menu')).toBeVisible()
  })

  test('should display cocktail collection', async ({ page }) => {
    await page.locator('#cocktails').scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000) // Wait for lazy loading

    // Check if cocktails are displayed
    const cocktailSection = page.locator('#cocktails')
    await expect(cocktailSection).toBeVisible()
  })
})
