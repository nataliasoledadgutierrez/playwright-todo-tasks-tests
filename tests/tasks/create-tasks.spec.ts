import { test, expect } from '@playwright/test';

test('Agregar nueva tarea', async ({ page }) => {
  // 1. Ir a la página
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  // 2. Seleccionar el campo de texto para agregar una tarea
  const inputNuevaTarea = page.locator('.new-todo');

  // 3. Escribir una tarea
  await inputNuevaTarea.fill('Productos de limpieza');

  // 4. Agregar tarea
  await inputNuevaTarea.press('Enter');

  // 5. Verificar que la tarea se haya agregado correctamente
  const tarea = page.locator('.todo-list li', { hasText: 'Productos de limpieza' });
  await expect(tarea).toBeVisible();
});
