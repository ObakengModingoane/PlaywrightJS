const { test, expect } = require('@playwright/test');

test('logs in to the client application', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    await page.locator("[type='email']").fill('modingoane@gmail.com');
    await page.locator('#userPassword').fill('Learning08@');
    await page.locator('#login').click();

    await expect(page.getByRole('heading', { name: 'ZARA COAT 3' })).toBeVisible();
}); 