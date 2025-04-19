import { test } from '@playwright/test';

import { TaskPage } from '../pages/TaskPage';

test('Agregar y completar Tarea usando Page Object Model', async ({ page }) => {
    const taskPage = new TaskPage(page);
    
    await taskPage.goto();

    const firstTaskText = 'Mi Primer Tarea';
    
    await taskPage.addTask(firstTaskText);
    await taskPage.addTask('Mi Segunda Tarea');

    await taskPage.completeTask(firstTaskText);
});

