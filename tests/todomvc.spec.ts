import { expect, test } from '@playwright/test';

test('TodoMVC - Create new Task', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');

    const inputAddTask = page.locator('.new-todo');
    const firstTaskText = 'Mi Primer Tarea';

    await inputAddTask.fill(firstTaskText);

    await inputAddTask.press('Enter')

    const taskList = page.locator('.todo-list li');

    await expect(taskList).toHaveCount(1);
    await expect(taskList.first()).toHaveText(firstTaskText);
});
  