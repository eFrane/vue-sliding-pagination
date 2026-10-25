const { test, expect } = require('@playwright/test')

test.describe('Custom Page Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/custompage')
  })

  test('should display pagination with custom page component', async ({ page }) => {
    const pagination = page.locator('.c-sliding-pagination__list')
    await expect(pagination).toBeVisible()
  })

  test('should display custom page components', async ({ page }) => {
    // The custom page component should have input elements for the current page
    const inputs = page.locator('.page-input')
    // Should have one input for the current page (page 1)
    await expect(inputs).toHaveCount(1)
  })

  test('should display page numbers for non-current pages', async ({ page }) => {
    // Non-current pages should still be displayed as links
    const pageLinks = page.locator('.c-sliding-pagination__page')
    // With 20 total pages and nonSlidingSize=9, we have sliding pagination
    // Only a subset of pages are visible at once
    // We should have at least some page links visible (the beginning pages)
    const count = await pageLinks.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('current page should have an input field', async ({ page }) => {
    const currentPageInput = page.locator('.c-sliding-pagination__list-element--active .page-input')
    await expect(currentPageInput).toBeVisible()
    await expect(currentPageInput).toHaveValue('1')
  })

  test('can change page by entering new page number in input', async ({ page }) => {
    // Get the current page input
    const currentPageInput = page.locator('.c-sliding-pagination__list-element--active .page-input')
    await expect(currentPageInput).toHaveValue('1')

    // Change the input value to 5
    await currentPageInput.fill('5')
    await currentPageInput.dispatchEvent('change')

    // Wait for navigation
    await page.waitForSelector('.c-sliding-pagination__list-element--active .page-input')

    // The input should now show page 5
    const newCurrentPageInput = page.locator('.c-sliding-pagination__list-element--active .page-input')
    await expect(newCurrentPageInput).toHaveValue('5')
  })

  test('can navigate to page by clicking non-current page link', async ({ page }) => {
    // Click on page 2 (which should be a regular link, not an input)
    // Use exact match to avoid matching page 20
    const page2Link = page.locator('.c-sliding-pagination__page').filter({ hasText: /^2$/ })
    await page2Link.click()

    // Now page 2 should be current and have an input
    const currentPageInput = page.locator('.c-sliding-pagination__list-element--active .page-input')
    await expect(currentPageInput).toBeVisible()
    await expect(currentPageInput).toHaveValue('2')
  })

  test('previous/next navigation should work with custom pages', async ({ page }) => {
    // Navigate to page 2
    const nextButton = page.locator('.c-sliding-pagination__list-element').filter({ hasText: '»' })
    await nextButton.click()

    // Should be on page 2 with input
    const currentPageInput = page.locator('.c-sliding-pagination__list-element--active .page-input')
    await expect(currentPageInput).toHaveValue('2')

    // Go back to page 1
    const prevButton = page.locator('.c-sliding-pagination__list-element').filter({ hasText: '«' })
    await prevButton.click()

    // Should be back on page 1 with input
    await expect(currentPageInput).toHaveValue('1')
  })
})
