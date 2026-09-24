import {test, expect, request} from '@playwright/test';

const loginPayload = {userEmail:"modingoane@gmail.com", userPassword:"Learning08@"};
let token;

test.beforeAll( async () => {
    const apiContext = await request.newContext();

    //Store the response after hitting the API on loginResponse
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        }
    )

    expect(loginResponse.ok()).toBeTruthy();

    //Get the API response and store it on an object 
    const loginResponseJson = await loginResponse.json();

    //Access the API response properties using Json 
    token = loginResponseJson.token;
    console.log(token);


});

test.beforeEach( async () => {

});


test('Client Test', async ({page})=> {
    //Variables 
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";

    //setting token to localStorage after extracting it
    page.addInitScript( value => {
        window.localStorage.setItem('token', value);
    }, token);

    //Login using Web API
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");

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
});
