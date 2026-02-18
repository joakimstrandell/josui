import { expect, test } from '@playwright/test';

test('renders categories page shell', async ({ page }) => {
  await page.goto('/categories');
  await expect(page.getByText('Token Categories')).toBeVisible();
});
