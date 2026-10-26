const { defineConfig, devices } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './test/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  use: {
    trace: 'on-first-retry',
    baseURL: 'http://localhost:5173',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'cd docs && corepack yarn dev',
    port: 5173,
    timeout: 120000,
    reuseExistingServer: true,
  },
})
