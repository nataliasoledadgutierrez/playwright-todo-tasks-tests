import { test, expect } from '@playwright/test';

test('Eliminar una tarea completada', async ({ page }) => {
  // 1. Ir a la página
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  // 2. Agregar nueva tarea
  const inputNuevaTarea = page.locator('.new-todo');
  await inputNuevaTarea.fill('Eliminar tarea');
  await inputNuevaTarea.press('Enter');

  // 3. Seleccionar la tarea agregada
  const tarea = page.locator('.todo-list li', { hasText: 'Eliminar tarea' });
  await expect(tarea).toBeVisible();

  // 4. Marcarla como completada
  const checkbox = tarea.locator('.toggle');
  await checkbox.click();
  await expect(tarea).toHaveClass(/completed/);

  // 5. Hacer hover y click en el botón eliminar
  await tarea.hover();
  const botonEliminar = tarea.locator('.destroy');
  await botonEliminar.click();

  // 6. Verificar que ya no esté visible
  await expect(tarea).not.toBeVisible();
});
