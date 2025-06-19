import { test, expect } from '@playwright/test';

test('Marcar tarea como completada', async ({ page }) => {
  // 1. Ir a la página
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  // 2. Agregar nueva tarea
  const inputNuevaTarea = page.locator('.new-todo');
  await inputNuevaTarea.fill('Tarea para completar');
  await inputNuevaTarea.press('Enter');

  // 3. Seleccionar la tarea agregada
  const tarea = page.locator('.todo-list li', { hasText: 'Tarea para completar' });
  await expect(tarea).toBeVisible();

  // 4. Marcar como completada
  const checkbox = tarea.locator('.toggle');
  await checkbox.click();

  // 5. Verificar que tiene clase 'completed'
  await expect(tarea).toHaveClass(/completed/);
});