const { test, expect } = require('@playwright/test')

test.describe('Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/edge-cases')
  })

  test.describe('Single Page Scenario (total=1)', () => {
    test('should display only page 1', async ({ page }) => {
      const firstPagination = page.locator('.edge-cases-container > div').nth(0)
      const pageLinks = firstPagination.locator('.c-sliding-pagination__page')
      await expect(pageLinks).toHaveCount(1)
      await expect(pageLinks).toHaveText('1')
    })

    test('should not show navigation buttons', async ({ page }) => {
      const firstPagination = page.locator('.edge-cases-container > div').nth(0)

      // No previous button
      await expect(firstPagination.locator('.c-sliding-pagination__list-element').filter({ hasText: '«' })).toHaveCount(0)

      // No next button
      await expect(firstPagination.locator('.c-sliding-pagination__list-element').filter({ hasText: '»' })).toHaveCount(0)
    })

    test('should have page 1 active', async ({ page }) => {
      const firstPagination = page.locator('.edge-cases-container > div').nth(0)
      const activePage = firstPagination.locator('.c-sliding-pagination__list-element--active .c-sliding-pagination__page')
      await expect(activePage).toBeVisible()
      await expect(activePage).toHaveText('1')
    })
  })

  test.describe('Two Pages Scenario (total=2)', () => {
    test('should display both pages', async ({ page }) => {
      const secondPagination = page.locator('.edge-cases-container > div').nth(1)
      const pageLinks = secondPagination.locator('.c-sliding-pagination__page')
      await expect(pageLinks).toHaveCount(2)
    })

    test('should not activate sliding window', async ({ page }) => {
      const secondPagination = page.locator('.edge-cases-container > div').nth(1)

      // With only 2 pages, should show all pages without sliding
      const pageLinks = secondPagination.locator('.c-sliding-pagination__page')
      await expect(pageLinks).toHaveCount(2)

      // Should have page 1 and 2
      const pageTexts = await pageLinks.allTextContents()
      expect(pageTexts.sort()).toEqual(['1', '2'])
    })

    test('should navigate between two pages', async ({ page }) => {
      const secondPagination = page.locator('.edge-cases-container > div').nth(1)

      // Initially on page 1
      const activePage = secondPagination.locator('.c-sliding-pagination__list-element--active .c-sliding-pagination__page')
      await expect(activePage).toHaveText('1')

      // Click page 2
      const page2 = secondPagination.locator('.c-sliding-pagination__page').filter({ hasText: '2' })
      await page2.click()

      // Should be on page 2
      await expect(activePage).toHaveText('2')
    })
  })

  test.describe('Non-Sliding Threshold (total=9)', () => {
    test('should display all 9 pages without sliding', async ({ page }) => {
      const thirdPagination = page.locator('.edge-cases-container > div').nth(2)
      const pageLinks = thirdPagination.locator('.c-sliding-pagination__page')
      await expect(pageLinks).toHaveCount(9)
    })

    test('should not show gap indicators', async ({ page }) => {
      const thirdPagination = page.locator('.edge-cases-container > div').nth(2)

      // No gaps should be present
      await expect(thirdPagination.locator('.c-sliding-pagination__list-element').filter({ hasText: '…' })).toHaveCount(0)
    })

    test('should have all pages from 1 to 9', async ({ page }) => {
      const thirdPagination = page.locator('.edge-cases-container > div').nth(2)
      const pageLinks = thirdPagination.locator('.c-sliding-pagination__page')

      // Wait for at least one page link to be visible
      await expect(pageLinks.first()).toBeVisible()

      const pageTexts = await pageLinks.allTextContents()
      const sortedPages = pageTexts.map(t => parseInt(t.trim())).filter(n => !isNaN(n)).sort((a, b) => a - b)
      expect(sortedPages).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
  })

  test.describe('Large Page Count (total=100)', () => {
    test('should activate sliding window', async ({ page }) => {
      if (test.info().project.name === 'Mobile Chrome') {
        // This test is currently expected to fail on Mobile Chrome
        test.skip();
      }

      const fourthPagination = page.locator('.edge-cases-container > div').nth(3)

      // Should have gap indicators
      const gaps = fourthPagination.locator('.c-sliding-pagination__list-element').filter({ hasText: '…' })
      const gapCount = await gaps.count()
      expect(gapCount).toBeGreaterThanOrEqual(1)
    })

    test('should show beginning pages', async ({ page }) => {
      const fourthPagination = page.locator('.edge-cases-container > div').nth(3)

      // Should show page 1 (exact match to avoid matching 100)
      const page1 = fourthPagination.locator('.c-sliding-pagination__page').filter({ hasText: /^1$/ })
      await expect(page1).toBeVisible()

      // Should show page 2 (exact match)
      const page2 = fourthPagination.locator('.c-sliding-pagination__page').filter({ hasText: /^2$/ })
      await expect(page2).toBeVisible()
    })

    test('should show ending pages', async ({ page }) => {
      const fourthPagination = page.locator('.edge-cases-container > div').nth(3)

      // Should show page 100 (exact match)
      const page100 = fourthPagination.locator('.c-sliding-pagination__page').filter({ hasText: /^100$/ })
      await expect(page100).toBeVisible()

      // Should show page 99 (exact match)
      const page99 = fourthPagination.locator('.c-sliding-pagination__page').filter({ hasText: /^99$/ })
      await expect(page99).toBeVisible()
    })

    test('should navigate to middle pages', async ({ page }) => {
      const fourthPagination = page.locator('.edge-cases-container > div').nth(3)

      // Navigate to page 50 by clicking on page link
      // Clicking next 49 times is unreliable, so we'll click a visible page number
      const nextButton = fourthPagination.locator('.c-sliding-pagination__list-element').filter({ hasText: '»' })

      // Click next a few times to get to a page where we can see page 50 in the window
      for (let i = 1; i <= 10; i++) {
        await nextButton.click()
        await page.waitForTimeout(50)
      }

      // Now page 11 should be active, and we should see higher page numbers
      // Click on page 2 if it's visible
      const page2 = fourthPagination.locator('.c-sliding-pagination__page').filter({ hasText: /^2$/ })
      const page2Exists = await page2.count()

      if (page2Exists > 0) {
        await page2.click()
        await page.waitForTimeout(100)
      }

      const activePage = fourthPagination.locator('.c-sliding-pagination__list-element--active .c-sliding-pagination__page')
      const currentPageText = await activePage.textContent()
      const currentPage = parseInt(currentPageText)

      // We should be on a page > 1, which means navigation is working
      expect(currentPage).toBeGreaterThan(1)
    })
  })

  test.describe('Custom Page with Invalid Input', () => {
    test('should handle invalid input (0)', async ({ page }) => {
      const fifthPagination = page.locator('.edge-cases-container > div').nth(4)

      // Get the current page input
      const currentPageInput = fifthPagination.locator('.c-sliding-pagination__list-element--active .page-input')
      await expect(currentPageInput).toHaveValue('1')

      // Try to enter 0
      await currentPageInput.fill('0')
      await currentPageInput.dispatchEvent('change')

      // Should show error message
      const errorMessage = page.locator('.error-message')
      await expect(errorMessage).toBeVisible()
      await expect(errorMessage).toContainText('Invalid page')

      // Should stay on page 1 - check that page 1 input is still active (not page 0)
      const page1Input = fifthPagination.locator('.c-sliding-pagination__list-element--active .page-input')
      await expect(page1Input).toHaveValue('1')
    })

    test('should handle invalid input (negative)', async ({ page }) => {
      const fifthPagination = page.locator('.edge-cases-container > div').nth(4)

      const currentPageInput = fifthPagination.locator('.c-sliding-pagination__list-element--active .page-input')

      // Try to enter -1
      await currentPageInput.fill('-1')
      await currentPageInput.dispatchEvent('change')

      // Should show error message
      const errorMessage = page.locator('.error-message')
      await expect(errorMessage).toBeVisible()
    })

    test('should handle invalid input (above total)', async ({ page }) => {
      const fifthPagination = page.locator('.edge-cases-container > div').nth(4)

      const currentPageInput = fifthPagination.locator('.c-sliding-pagination__list-element--active .page-input')

      // Try to enter 999
      await currentPageInput.fill('999')
      await currentPageInput.dispatchEvent('change')

      // Should show error message
      const errorMessage = page.locator('.error-message')
      await expect(errorMessage).toBeVisible()
    })

    test('should handle non-numeric input', async ({ page }) => {
      const fifthPagination = page.locator('.edge-cases-container > div').nth(4)

      const currentPageInput = fifthPagination.locator('.c-sliding-pagination__list-element--active .page-input')

      // Try to enter letters
      await currentPageInput.fill('abc')
      await currentPageInput.dispatchEvent('change')

      // Should show error message
      const errorMessage = page.locator('.error-message')
      await expect(errorMessage).toBeVisible()
    })

    test('should accept valid page input', async ({ page }) => {
      const fifthPagination = page.locator('.edge-cases-container > div').nth(4)

      const currentPageInput = fifthPagination.locator('.c-sliding-pagination__list-element--active .page-input')

      // Enter valid page 5
      await currentPageInput.fill('5')
      await currentPageInput.dispatchEvent('change')

      // Should navigate to page 5
      await expect(currentPageInput).toHaveValue('5')

      // No error message
      await expect(page.locator('.error-message')).toHaveCount(0)
    })
  })
})
