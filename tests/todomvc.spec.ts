import { expect, Locator, test } from '@playwright/test';

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

test('TodoMVC - Create multiple Tasks', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');

    const inputAddTask = page.locator('.new-todo');

    const firstTaskText = 'Mi Primer Tarea';
    const secondTaskText = 'Mi Segunda Tarea';
    const thirdTaskText = 'Mi Tercera Tarea';

    await addTask(inputAddTask, firstTaskText);
    await addTask(inputAddTask, secondTaskText);
    await addTask(inputAddTask, thirdTaskText);

    const taskList = page.locator('ul.todo-list li');

    await expect(taskList).toHaveCount(3);

    await expect(taskList.nth(0)).toHaveText(firstTaskText);
    await expect(taskList.nth(1)).toHaveText(secondTaskText);
    await expect(taskList.nth(2)).toHaveText(thirdTaskText);
});

test('TodoMVC - Create multiple Tasks, Complete', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');

    const inputAddTask = page.locator('.new-todo');

    const firstTaskText = 'Mi Primer Tarea';
    const secondTaskText = 'Mi Segunda Tarea';
    const thirdTaskText = 'Mi Tercera Tarea';

    await addTask(inputAddTask, firstTaskText);
    await addTask(inputAddTask, secondTaskText);
    await addTask(inputAddTask, thirdTaskText);

    const checkboxList = page.locator('ul.todo-list li input[type="checkbox"]');
    
    await checkboxList.last().click();
    
    await expect(checkboxList).toHaveCount(3);

    await expect(checkboxList.nth(0)).not.toBeChecked();
    await expect(checkboxList.nth(1)).not.toBeChecked();
    await expect(checkboxList.last()).toBeChecked();
});

test('TodoMVC - Create multiple Tasks, Complete Second One', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');

    const inputAddTask = page.locator('.new-todo');

    const firstTaskText = 'Mi Primer Tarea';
    const secondTaskText = 'Mi Segunda Tarea';
    const thirdTaskText = 'Mi Tercera Tarea';

    await addTask(inputAddTask, firstTaskText);
    await addTask(inputAddTask, secondTaskText);
    await addTask(inputAddTask, thirdTaskText);

    const views = page.locator('ul.todo-list li .view');

    const checkboxSecondTask = await getCheckboxByTaskName(views, secondTaskText);
    await checkboxSecondTask.click();

    const checkboxThirdTask = await getCheckboxByTaskName(views, thirdTaskText);

    const checkboxFirstTask = await getCheckboxByTaskName(views, firstTaskText);
    
    await expect(checkboxSecondTask).toBeChecked();
    await expect(checkboxThirdTask).not.toBeChecked();
    await expect(checkboxFirstTask).not.toBeChecked();
});

test('TodoMVC - Create multiple Tasks, Complete & Filter', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');

    const inputAddTask = page.locator('.new-todo');

    const firstTaskText = 'Mi Primer Tarea';
    const secondTaskText = 'Mi Segunda Tarea';
    const thirdTaskText = 'Mi Tercera Tarea';

    await addTask(inputAddTask, firstTaskText);
    await addTask(inputAddTask, secondTaskText);
    await addTask(inputAddTask, thirdTaskText);

    const checkboxList = page.locator('ul.todo-list li input.toggle');
    
    await checkboxList.last().click();
    
    const filters = page.locator('.filters');
    const activefilter = filters.getByRole('link', { name: 'Active' });

    await activefilter.click();

    await expect(checkboxList).toHaveCount(2);
});


async function addTask(input: Locator, text: string) {
    await input.fill(text);
    await input.press('Enter');
}

async function getCheckboxByTaskName(views: Locator, taskName: string) {
    const viewTask = views.filter({ hasText: taskName });
    const checkbox = viewTask.locator('input[type="checkbox"]');
    return checkbox;
}