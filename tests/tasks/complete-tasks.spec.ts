import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
});

test('Marcar tarea como completada', async ({ page }) => {

  // 1. Agregar nueva tarea
  const inputNuevaTarea = page.locator('.new-todo');
  await inputNuevaTarea.fill('Tarea para completar');
  await inputNuevaTarea.press('Enter');

  // 2. Seleccionar la tarea agregada
  const tarea = page.locator('.todo-list li', { hasText: 'Tarea para completar' });
  await expect(tarea).toBeVisible();

  // 3. Marcar como completada
  const checkbox = tarea.locator('.toggle');
  await checkbox.click();

  // 4. Verificar que tiene clase 'completed'
  await expect(tarea).toHaveClass(/completed/);
});