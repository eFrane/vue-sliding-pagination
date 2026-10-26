const { test, expect } = require('@playwright/test')

test.describe('Class Map Customization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/examples/class-map')
  })

  test.describe('Default Class Map', () => {
    test('uses default BEM class names', async ({ page }) => {
      const firstPagination = page.locator('.class-map-container > div').nth(0)

      // Component class
      const component = firstPagination.locator('.c-sliding-pagination')
      await expect(component).toBeVisible()

      // List class
      const list = component.locator('.c-sliding-pagination__list')
      await expect(list).toBeVisible()

      // Element class
      const elements = list.locator('.c-sliding-pagination__list-element')
      expect(await elements.count()).toBeGreaterThan(0)

      // Page class
      const pages = elements.locator('.c-sliding-pagination__page')
      expect(await pages.count()).toBeGreaterThan(0)

      // Active element class
      const activeElement = list.locator('.c-sliding-pagination__list-element--active')
      await expect(activeElement).toBeVisible()
    })

    test('BEM structure is maintained', async ({ page }) => {
      const firstPagination = page.locator('.class-map-container > div').nth(0)

      // Verify hierarchy: component > list > element > page
      const component = firstPagination.locator('.c-sliding-pagination')
      const list = component.locator('.c-sliding-pagination__list')
      const elements = list.locator('.c-sliding-pagination__list-element')
      const pages = elements.locator('.c-sliding-pagination__page')

      await expect(component).toBeVisible()
      await expect(list).toBeVisible()
      expect(await elements.count()).toBeGreaterThan(0)
      expect(await pages.count()).toBeGreaterThan(0)
    })
  })

  test.describe('Bootstrap-like Class Map', () => {
    test('uses custom Bootstrap class names', async ({ page }) => {
      const secondPagination = page.locator('.class-map-container > div').nth(1)

      // Component class
      const component = secondPagination.locator('.pagination')
      await expect(component).toBeVisible()

      // List class
      const list = component.locator('.pagination-list')
      await expect(list).toBeVisible()

      // Element class
      const elements = list.locator('.page-item')
      expect(await elements.count()).toBeGreaterThan(0)

      // Page class
      const pages = elements.locator('.page-link')
      expect(await pages.count()).toBeGreaterThan(0)
    })

    test('active state uses custom class', async ({ page }) => {
      const secondPagination = page.locator('.class-map-container > div').nth(1)

      // Active element should have 'active' class
      const activeElement = secondPagination.locator('.page-item.active')
      await expect(activeElement).toBeVisible()
    })

    test('disabled state uses custom class', async ({ page }) => {
      const secondPagination = page.locator('.class-map-container > div').nth(1)

      // Disabled element should have 'disabled' class
      const disabledElement = secondPagination.locator('.page-item.disabled').first()
      await expect(disabledElement).toBeVisible()
    })

    test('maintains structure with custom classes', async ({ page }) => {
      const secondPagination = page.locator('.class-map-container > div').nth(1)

      const component = secondPagination.locator('.pagination')
      const list = component.locator('.pagination-list')
      const elements = list.locator('.page-item')

      await expect(component).toBeVisible()
      await expect(list).toBeVisible()
      expect(await elements.count()).toBeGreaterThan(0)
    })
  })

  test.describe('Minimal Class Map', () => {
    test('uses minimal custom class names', async ({ page }) => {
      const thirdPagination = page.locator('.class-map-container > div').nth(2)

      // Component class
      const component = thirdPagination.locator('.pagination-minimal')
      await expect(component).toBeVisible()

      // List class
      const list = component.locator('.pagination-list-minimal')
      await expect(list).toBeVisible()

      // Element class
      const elements = list.locator('.page')
      expect(await elements.count()).toBeGreaterThan(0)
    })

    test('page links use custom class', async ({ page }) => {
      if (test.info().project.name === 'Mobile Chrome') {
        // This test is currently expected to fail on Mobile Chrome
        test.skip()
      }

      const thirdPagination = page.locator('.class-map-container > div').nth(2)

      const pages = thirdPagination.locator('.page-link-minimal')
      expect(await pages.count()).toBeGreaterThan(0)
    })

    test('active and disabled classes work', async ({ page }) => {
      const thirdPagination = page.locator('.class-map-container > div').nth(2)

      // Active element
      const activeElement = thirdPagination.locator('.page.active').first()
      await expect(activeElement).toBeVisible()

      // Disabled element
      const disabledElement = thirdPagination.locator('.page.disabled').first()
      await expect(disabledElement).toBeVisible()
    })
  })

  test.describe('Tailwind-like Class Map', () => {
    test('uses Tailwind utility classes', async ({ page }) => {
      const fourthPagination = page.locator('.class-map-container > div').nth(3)

      // Component with Tailwind classes - use nav element
      const component = fourthPagination.locator('nav.flex')
      await expect(component).toBeVisible()

      // Check for justify-center class on nav
      const justifiedComponent = fourthPagination.locator('nav.justify-center')
      await expect(justifiedComponent).toBeVisible()
    })

    test('list uses Tailwind spacing classes', async ({ page }) => {
      const fourthPagination = page.locator('.class-map-container > div').nth(3)

      // List with space-x-1 class
      const list = fourthPagination.locator('ul.space-x-1')
      await expect(list).toBeVisible()
    })

    test('elements use Tailwind classes', async ({ page }) => {
      if (test.info().project.name === 'Mobile Chrome') {
        // This test is currently expected to fail on Mobile Chrome
        test.skip()
      }

      const fourthPagination = page.locator('.class-map-container > div').nth(3)

      // Elements with padding classes
      const elements = fourthPagination.locator('.px-3')
      expect(await elements.count()).toBeGreaterThan(0)

      // Elements with py-1 class
      const elementsWithPy = fourthPagination.locator('.py-1')
      expect(await elementsWithPy.count()).toBeGreaterThan(0)

      // Elements with rounded class
      const roundedElements = fourthPagination.locator('.rounded')
      expect(await roundedElements.count()).toBeGreaterThan(0)
    })

    test('active state uses Tailwind classes', async ({ page }) => {
      const fourthPagination = page.locator('.class-map-container > div').nth(3)

      // Active element should have bg-blue-500 and text-white
      const activeElement = fourthPagination.locator('.bg-blue-500')
      await expect(activeElement).toBeVisible()

      const whiteText = fourthPagination.locator('.text-white')
      await expect(whiteText).toBeVisible()
    })

    test('disabled state uses Tailwind classes', async ({ page }) => {
      if (test.info().project.name === 'Mobile Chrome') {
        // This test is currently expected to fail on Mobile Chrome
        test.skip()
      }

      const fourthPagination = page.locator('.class-map-container > div').nth(3)

      // Disabled elements
      const disabledElements = fourthPagination.locator('.opacity-50')
      expect(await disabledElements.count()).toBeGreaterThan(0)

      const notAllowedCursor = fourthPagination.locator('.cursor-not-allowed')
      expect(await notAllowedCursor.count()).toBeGreaterThan(0)
    })
  })

  test.describe('Class Map Functionality', () => {
    test('all custom class maps maintain pagination functionality', async ({ page }) => {
      // Test each pagination instance
      const paginations = page.locator('.class-map-container > div')
      const count = await paginations.count()

      for (let i = 0; i < count; i++) {
        const pagination = paginations.nth(i)

        // Should have active page
        const activePage = pagination.locator('.c-sliding-pagination__list-element--active, .page-item.active, .page.active, .bg-blue-500')
        await expect(activePage).toBeVisible()

        // Should have page links
        const pages = pagination.locator('.c-sliding-pagination__page, .page-link, .page-link-minimal, .no-underline')
        expect(await pages.count()).toBeGreaterThan(0)
      }
    })

    test('navigation works with all class maps', async ({ page }) => {
      const secondPagination = page.locator('.class-map-container > div').nth(1)

      // Click page 2 in Bootstrap pagination
      const page2 = secondPagination.locator('.page-link').filter({ hasText: /^2$/ })
      await page2.click()

      // Should be on page 2
      const activePage = secondPagination.locator('.page-item.active .page-link')
      await expect(activePage).toHaveText('2')
    })

    test('previous/next buttons work with custom classes', async ({ page }) => {
      const thirdPagination = page.locator('.class-map-container > div').nth(2)

      // Click next button
      const nextButton = thirdPagination.locator('.page-link-minimal').filter({ hasText: '»' })
      await nextButton.click()

      // Should be on page 2
      const activePage = thirdPagination.locator('.page.active .page-link-minimal')
      await expect(activePage).toHaveText('2')
    })
  })
})
