import {test, expect} from '@playwright/test';

test ('Agregar nueva tarea', async ({page}) => {
    //1. ir a la pàgiana
    await page.goto('https://demo.playwright.dev/todomvc/#/');

    //2. Seleccionar el campo de texto para agregar una tarea
    const inputNuevaTarea = page.locator('.new-todo');

    //3. Escribir una tarea
    await inputNuevaTarea.fill('Productos de limpieza');

    //4.Agregar tarea
    await inputNuevaTarea.press('Enter')
    
      //6. Verificar tarea agregada.
    const tarea= page.locator('.todo-list li', { hasText:'Productos de limpieza'});

    //7. Verificar que la tarea se haya agregado correctamente
    await expect(tarea).toBeVisible();

    //8. Hacer click a tarea para marcarla como completada
    const checkbox = tarea.locator('.toggle'); // checkbox para marcar completada
    await checkbox.click();
    
    //9 verificar que la tarea tenga la clase 'completed' que indica que esta completada
    await expect (tarea).toHaveClass('completed');
});
