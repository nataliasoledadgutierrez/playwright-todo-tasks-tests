import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
});

test('Eliminar una tarea completada', async ({ page }) => {
 
  // 1. Agregar nueva tarea
  const inputNuevaTarea = page.locator('.new-todo');
  await inputNuevaTarea.fill('Eliminar tarea');
  await inputNuevaTarea.press('Enter');

  // 2. Seleccionar la tarea agregada
  const tarea = page.locator('.todo-list li', { hasText: 'Eliminar tarea' });
  await expect(tarea).toBeVisible();

  // 3. Marcarla como completada
  const checkbox = tarea.locator('.toggle');
  await checkbox.click();
  await expect(tarea).toHaveClass(/completed/);

  // 4. Hacer hover y click en el botón eliminar
  await tarea.hover();
  const botonEliminar = tarea.locator('.destroy');
  await botonEliminar.click();

  // 5. Verificar que ya no esté visible
  await expect(tarea).not.toBeVisible();
});
