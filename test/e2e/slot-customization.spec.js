const { test, expect } = require('@playwright/test')

test.describe('Slot Customization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/custompage')
  })

  test('custom page component with input renders', async ({ page }) => {
    const pagination = page.locator('.c-sliding-pagination')
    await expect(pagination).toBeVisible()
    
    // Should have input for current page
    const currentPageInput = pagination.locator('.c-sliding-pagination__list-element--active .page-input')
    await expect(currentPageInput).toBeVisible()
  })

  test('custom page component input has correct value', async ({ page }) => {
    const pagination = page.locator('.c-sliding-pagination')
    
    const currentPageInput = pagination.locator('.c-sliding-pagination__list-element--active .page-input')
    await expect(currentPageInput).toHaveValue('1')
  })

  test('custom page component navigation works', async ({ page }) => {
    const pagination = page.locator('.c-sliding-pagination')
    
    const currentPageInput = pagination.locator('.c-sliding-pagination__list-element--active .page-input')
    
    // Change to page 5
    await currentPageInput.fill('5')
    await currentPageInput.dispatchEvent('change')
    
    // Wait for navigation
    await page.waitForTimeout(100)
    
    // Should be on page 5
    const newCurrentPageInput = pagination.locator('.c-sliding-pagination__list-element--active .page-input')
    await expect(newCurrentPageInput).toHaveValue('5')
  })

  test('non-current pages are links not inputs', async ({ page }) => {
    const pagination = page.locator('.c-sliding-pagination')
    
    // Non-current pages should be <a> elements
    const page2Link = pagination.locator('.c-sliding-pagination__page').filter({ hasText: /^2$/ })
    await expect(page2Link).toBeVisible()
    
    // Should be an <a> tag, not an input
    const tagName = await page2Link.evaluate(el => el.tagName)
    expect(tagName.toLowerCase()).toBe('a')
  })
})
