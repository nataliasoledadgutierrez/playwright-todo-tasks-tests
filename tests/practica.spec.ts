import { test, expect } from '@playwright/test';

test('test input placeholder', async ({ page }) => {
  await page.goto('https://opencart.abstracta.us/');
  await page.getByPlaceholder('search').fill('iphone');
  await page.pause();
});
