const { test, expect } = require('@playwright/test')

test.describe('Pagination Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/simple')
  })

  test('should display pagination component', async ({ page }) => {
    const pagination = page.locator('.c-sliding-pagination__list')
    await expect(pagination).toBeVisible()
  })

  test('should display page numbers', async ({ page }) => {
    const pageLinks = page.locator('.c-sliding-pagination__page')
    await expect(pageLinks).toHaveCount(10)
  })

  test('should have current page highlighted', async ({ page }) => {
    const currentPage = page.locator('.c-sliding-pagination__list-element--active .c-sliding-pagination__page')
    await expect(currentPage).toBeVisible()
    await expect(currentPage).toHaveText('1')
  })

  test('previous button should be disabled on first page', async ({ page }) => {
    // Find the previous page button (contains «)
    const prevButton = page.locator('.c-sliding-pagination__list-element--disabled').filter({ hasText: '«' })
    await expect(prevButton).toBeVisible()

    // Try to click it (should not navigate)
    await prevButton.click()

    // Should still be on page 1
    const currentPage = page.locator('.c-sliding-pagination__list-element--active .c-sliding-pagination__page')
    await expect(currentPage).toHaveText('1')
  })

  test('next button should be disabled on last page', async ({ page }) => {
    // Navigate to the last page first
    const lastPageLink = page.locator('.c-sliding-pagination__page').filter({ hasText: '10' })
    await lastPageLink.click()

    // Find the next page button (should be disabled)
    const nextButton = page.locator('.c-sliding-pagination__list-element--disabled').filter({ hasText: '»' })
    await expect(nextButton).toBeVisible()

    // Try to click it (should not navigate)
    await nextButton.click()

    // Should still be on page 10
    const currentPage = page.locator('.c-sliding-pagination__list-element--active .c-sliding-pagination__page')
    await expect(currentPage).toHaveText('10')
  })

  test('clicking page number should navigate to that page', async ({ page }) => {
    // Click page 5
    const page5 = page.locator('.c-sliding-pagination__page').filter({ hasText: '5' })
    await page5.click()

    // Should be on page 5
    const currentPage = page.locator('.c-sliding-pagination__list-element--active .c-sliding-pagination__page')
    await expect(currentPage).toHaveText('5')
  })
})
