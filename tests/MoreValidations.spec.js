import {test, expect} from '@playwright/test';

test('Popup validations', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  //await page.goto('https://google.com');
  //await page.goBack();
  //await page.goForward();

  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();

  //How to handle java popups/dialog in playwright
  page.on("dialog", dialog => dialog.accept());
  await page.locator("#confirmbtn").click;

  //How to use hover
  await page.locator("#mousehover").hover();


});