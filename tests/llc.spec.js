const {test, expect} = require('@playwright/test');

test('should display the correct title', async ({ page }) => {
  await page.goto('https://google.com');
  await expect(page).toHaveTitle('Google');

  //getByRole is a locator that allows you to find elements by their ARIA role. 
  //In this case, we are looking for a button with the name 'Submit'.
  await page.getByRole("button",{name: 'Submit'}).click();

  //getByPlaceholder is a locator that allows you to find elements by their placeholder text.
  //In this case, we are looking for an input field with the placeholder 'Search'.
  await page.getByPlaceholder('Search').fill('Playwright');

  //getByLabel is a locator that allows you to find form elements by their associated label text.
  //In this case, we are looking for an input field with the label 'Gender'.
  await page.getByLabel('Gender').fill('Male');

  //getByText is a locator that allows you to find elements by their visible text content.
  //In this case, we are looking for an element that contains the text 'Welcome to Playwright'.
  await page.getByText('Welcome to Playwright').click();

  //method locator chain is used to chain multiple locators together to narrow down the search for an element.
  //In this case, we are looking for a button with the name 'Submit' that is inside a form with the id 'loginForm'.
  await page.locator("app-card").filter({hastext: 'ZARA COAT 3'}).isVisible();
  await page.locator("app-card").filter({hastext: 'ZARA COAT 3'}).getByRole("button").click();

});