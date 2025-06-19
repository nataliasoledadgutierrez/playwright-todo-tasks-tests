import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
});

test('Agregar nueva tarea', async ({ page }) => {
 
  // 1. Seleccionar el campo de texto para agregar una tarea
  const inputNuevaTarea = page.locator('.new-todo');

  // 2. Escribir una tarea
  await inputNuevaTarea.fill('Productos de limpieza');

  // 3. Agregar tarea
  await inputNuevaTarea.press('Enter');

  // 4. Verificar que la tarea se haya agregado correctamente
  const tarea = page.locator('.todo-list li', { hasText: 'Productos de limpieza' });
  await expect(tarea).toBeVisible();
});
