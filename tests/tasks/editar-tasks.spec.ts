import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
});

test('Editar tarea existente', async ({ page}) => {
   
    //1. Agregar una tarea
    const inputNuevaTarea = page.locator('.new-todo');
    //2. Escribir nueva tarea
    await inputNuevaTarea. fill('Tarea para editar');
    //3. Agregar tarea
    await inputNuevaTarea.press('Enter')
    
    //4. Verificar que la tarea se haya agregado correctamente
    const tarea = page.locator('.todo-list li', {hasText: 'Tarea para editar'});
    await expect(tarea).toBeVisible();
    
    //5.Hacer doble click para editar la tarea
    await tarea.dblclick();
    //6. Seleccionar el campo de edición
    const inputEdicion = page.locator('.edit');
    //7. Escribir nueva tarea
    await inputEdicion.fill('Tarea editada');
    //8. Presionar enter patra guardar los cambios
    await inputEdicion.press('Enter');
    
    //9. Verificar que la taraea se haya editado correctamente
    const tareaEditada = page.locator('.todo-list li', { hasText: 'Tarea editada' });
    await expect(tareaEditada).toBeVisible();
    //10. Verificar que la tarea original ya no este viisible
    await expect(tarea).not.toBeVisible();
})