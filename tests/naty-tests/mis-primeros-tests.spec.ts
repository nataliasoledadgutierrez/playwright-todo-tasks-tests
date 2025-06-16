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
    
});
