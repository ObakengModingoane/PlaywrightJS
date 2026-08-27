const {test, expect} = require('@playwright/test');

test('First Playwright test', async ({browser})=>{
    // Test code goes here
    //URL for testing - https://rahulshettyacademy.com/loginpagePractise/
    const context = await browser.newContext();
    const page = await context.newPage();
    //Go to the URL
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    //Extract the title of the page and print it in the console
    console.log(await page.title());

    //Fill the username and password fields and click on the sign in button
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("Learning@");
    await page.locator("#signInBtn").click();

    //On failure of login, the error message is displayed. We will capture that error message and print it in the console   
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

});

test('Second Playwright test', async ({page})=>{
    // Test code goes here
    //URL for testing - https://rahulshettyacademy.com/client/#/auth/login
    //Register a user
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login'); 
    await page.locator("a.text-reset").click();
    await page.locator("#firstName").fill("Obakeng");
    await page.locator("#lastName").fill("Magwaza");
    await page.locator("[type='email']").fill("modingoane@gmail.com");
    await page.locator("#userMobile").fill("1123456789");
    await page.locator("#userPassword").fill("Learning@08");
    await page.locator("#confirmPassword").fill("Learning@08");
    await page.locator("[type='checkbox']").check();
    await page.locator("[type='submit']").click();

    //Login with the registered user
    await page.locator("[type='email']").fill("modingoane@gmail.com");
    await page.locator("#userPassword").fill("Learning@08");
    await page.locator("[type='submit']").click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

});

test.only("E2E Testing", async ({page})=>{
    //Variables 
    const email = "modingoane@gmail.com";
    const password = "Learning08@";
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";

    //Navigate to the URL
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    //Login with the registered user
    await page.locator("[type='email']").fill(email);
    await page.locator("#userPassword").fill(password);
    await page.locator("#login").click();

    //Count the products on the page and print the count in the console
    await expect(products.first()).toBeVisible();
    //const titles = await page.locator(".card-body b").allTextContents();
    //console.log(titles);

    const count = await products.count();
    for( let i = 0; i < count; i++){
        // Your code here
        if (await products.nth(i).locator("b").textContent() === productName){
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    //Click on the cart button and verify that the product is added to the cart
    await page.locator("[routerlink*='cart']").click();
    await page.locator(".cart h3").first().waitFor();
    await expect(page.locator(".cart h3")).toContainText(productName);

    //Click on the checkout button
    await page.locator("text=Checkout").click();

    //Enter payment details and apply the promo code
    await page.locator("[value='4542 9931 9292 2293']").fill("4542 9292 2293 9931");
    await page.locator(".ddl").first().pressSequentially("10");
    await page.locator(".ddl").last().pressSequentially("20");
    await page.locator("(//input[@type='text'])[2]").fill("123");
    await page.locator("(//input[@type='text'])[3]").fill("Obakeng");
    //await page.locator("[name='coupon']").fill("10");
    //await page.locator("[type='submit']").click();

    await page.locator("[placeholder*='Select Country']").pressSequentially("ind", {delay: 150});
    const dropdownOptions = page.locator(".ta-results");
    await dropdownOptions.waitFor();
    const optionsCount = await dropdownOptions.locator("button").count();
    for(let i = 0; i < optionsCount; i++){
        if(await dropdownOptions.locator("button").nth(i).textContent() === " India"){
            await dropdownOptions.locator("button").nth(i).click();
            break;
        }
    }
    
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toContainText(" Thankyou for the order.");
    const oderNumber = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++){
        const rowOrderNumber = await rows.nth(i).locator("th").textContent();
        if (oderNumber.includes(rowOrderNumber)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(oderNumber.includes(orderIdDetails)).toBeTruthy();

    await page.pause();



});

