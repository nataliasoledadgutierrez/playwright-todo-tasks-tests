import { test, expect } from '@playwright/test';

test('test input placeholder', async ({ page }) => {
  await page.goto('https://opencart.abstracta.us/'); // Ir al sitio

  // Llenar el campo de búsqueda usando el placeholder
  await page.getByPlaceholder('Search').fill('iphone'); // Ojo: "Search" va con mayúscula en este sitio

  // Hacer clic en el botón de búsqueda
  await page.locator('button[type="button"].btn.btn-default.btn-lg').click();

  // Obtener todos los links llamados "iPhone" y ver cuántos hay
  const items = await page.getByRole('link', { name: 'iPhone' });
  console.log('Cantidad de links con texto "iPhone":', await items.count());

  // Hacer clic solo en el primero
  await items.first().click();

  // Verificar que el título del producto sea visible (nota: el título es "iPhone" con mayúscula)
  await expect(page.getByRole('heading', { name: 'iPhone' })).toBeVisible();

  await page.pause();
});
