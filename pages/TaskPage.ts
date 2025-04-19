import { Locator, Page } from '@playwright/test';

export class TaskPage {
    readonly page: Page;
    readonly inputAddTask: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.inputAddTask = this.page.locator('.new-todo');
    }

    async goto() {
        await this.page.goto('https://demo.playwright.dev/todomvc/');
    }

    async addTask(text: string) {
        await this.inputAddTask.fill(text);
        await this.inputAddTask.press('Enter');
    }

    async completeTask(taskName: string) {
        const views = this.page.locator('ul.todo-list li .view');
        const viewTask = views.filter({ hasText: taskName });
        const checkbox = viewTask.locator('input[type="checkbox"]');
        await checkbox.click();
    }
}