const { test, expect } = require('@playwright/test')

test.describe('Dynamic Prop Updates', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/simple')
  })

  test('pagination updates when clicking page numbers', async ({ page }) => {
    const pagination = page.locator('.c-sliding-pagination')
    await expect(pagination).toBeVisible()

    // Initially on page 1
    const activePage = pagination.locator('.c-sliding-pagination__list-element--active .c-sliding-pagination__page')
    await expect(activePage).toHaveText('1')

    // Click page 5
    const page5 = pagination.locator('.c-sliding-pagination__page').filter({ hasText: /^5$/ })
    await page5.click()

    // Should be on page 5
    await expect(activePage).toHaveText('5')
  })

  test('pagination updates when clicking page numbers multiple times', async ({ page }) => {
    const pagination = page.locator('.c-sliding-pagination')

    const activePage = pagination.locator('.c-sliding-pagination__list-element--active .c-sliding-pagination__page')
    await expect(activePage).toHaveText('1')

    // Click through several pages
    const page2 = pagination.locator('.c-sliding-pagination__page').filter({ hasText: /^2$/ })
    await page2.click()
    await expect(activePage).toHaveText('2')

    const page3 = pagination.locator('.c-sliding-pagination__page').filter({ hasText: /^3$/ })
    await page3.click()
    await expect(activePage).toHaveText('3')
  })

  test('previous button is disabled on first page', async ({ page }) => {
    const pagination = page.locator('.c-sliding-pagination')

    const activePage = pagination.locator('.c-sliding-pagination__list-element--active .c-sliding-pagination__page')
    await expect(activePage).toHaveText('1')

    // Previous button should be disabled
    const prevButton = pagination.locator('.c-sliding-pagination__list-element--disabled').filter({ hasText: '«' }).first()
    await expect(prevButton).toBeVisible()
  })

  test('next button is disabled on last page', async ({ page }) => {
    const pagination = page.locator('.c-sliding-pagination')

    // Go to page 10 (last page)
    const page10 = pagination.locator('.c-sliding-pagination__page').filter({ hasText: /^10$/ })
    await page10.click()

    const activePage = pagination.locator('.c-sliding-pagination__list-element--active .c-sliding-pagination__page')
    await expect(activePage).toHaveText('10')

    // Next button should be disabled
    const nextButton = pagination.locator('.c-sliding-pagination__list-element--disabled').filter({ hasText: '»' }).last()
    await expect(nextButton).toBeVisible()
  })
})
