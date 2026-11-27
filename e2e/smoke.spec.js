import { expect, test } from '@playwright/test'

// Smoke: sign in and see the demands list.
// Requires the DB seed to be applied and Chromium installed
// (`npx playwright install chromium`).
test('sign in and see the demands list', async ({ page }) => {
  await page.goto('/login')
  await page.fill('#email', 'qa@kudzu.test')
  await page.fill('#password', 'mock-pass')
  await page.click('button:has-text("Sign in")')

  await expect(page.getByRole('heading', { name: 'Demands' })).toBeVisible()
  const rows = page.locator('tbody tr')
  // Data arrives from the API after the page renders — wait for the first
  // row before counting, otherwise the count races the fetch.
  await expect(rows.first()).toBeVisible()
  const count = await rows.count()
  expect(count).toBeGreaterThan(0)
})
