import { test, expect } from '@playwright/test'

test.describe('Cocktails Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Navigate to cocktails section
    await page.locator('#cocktails').scrollIntoViewIfNeeded()
    await page.waitForTimeout(1500) // Wait for lazy loading and animations
  })

  test('should display cocktail grid', async ({ page }) => {
    const cocktailSection = page.locator('#cocktails')
    await expect(cocktailSection).toBeVisible()
  })

  test('should display cocktail cards', async ({ page }) => {
    // Wait for cocktails to load
    await page.waitForSelector('text=View Recipe', { timeout: 5000 })

    const viewRecipeButtons = page.getByText('View Recipe')
    const count = await viewRecipeButtons.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should display cocktail ingredients', async ({ page }) => {
    await page.waitForSelector('text=Ingredients', { timeout: 5000 })
    await expect(page.getByText('Ingredients').first()).toBeVisible()
  })

  test('should display alcohol percentage', async ({ page }) => {
    // Look for percentage signs
    await page.waitForTimeout(1000)
    const percentages = page.locator('text=/\\d+%/')
    const count = await percentages.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should show hover effects on cocktail cards', async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip()
    }

    await page.waitForSelector('text=View Recipe', { timeout: 5000 })
    const firstCard = page.getByText('View Recipe').first()

    // Hover over card
    await firstCard.hover()
    await page.waitForTimeout(500)

    // View Recipe button should be visible
    await expect(firstCard).toBeVisible()
  })

  test('should display multiple cocktails', async ({ page }) => {
    await page.waitForTimeout(1500)

    // Count cocktail cards by unique identifiers
    const cards = page.locator('text=View Recipe')
    const count = await cards.count()

    expect(count).toBeGreaterThanOrEqual(3)
  })

  test('should load cocktail data from API', async ({ page }) => {
    // Intercept API call
    const apiResponse = page.waitForResponse('**/api/cocktails*')
    await page.goto('/')
    const response = await apiResponse

    expect(response.status()).toBe(200)
    const data = await response.json()
    expect(Array.isArray(data)).toBeTruthy()
    expect(data.length).toBeGreaterThan(0)
  })

  test('should display cocktail names', async ({ page }) => {
    await page.waitForTimeout(1500)

    // Common cocktail ingredient
    const hasContent = await page.locator('h3').count()
    expect(hasContent).toBeGreaterThan(0)
  })
})
