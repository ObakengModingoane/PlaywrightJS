const {test, expect} = require('@playwright/test');

//importing the page class 
const POManager = require('../page_objects/POManager.js');

test.only("E2E Testing", async ({page})=>{
    //Creating an instance of the Page Object Manager class
    const poManager = new POManager(page);

    //Send url
    const url = "https://rahulshettyacademy.com/client/#/auth/login";
    
    //Login details
    const username = "modingoane@gmail.com";
    const password = "Learning08@";

    //Product to buy
    const productName = "ZARA COAT 3";

    //Payment details
    const creditCardNumber = "4542 9292 2293 9931";
    const expiryDateDay = "10";
    const expiryDateMonth = "20";
    const cvvCode = "123";
    const nameOnCard = "Obakeng";
    const selectCountryText = "ind";

    //login using Object Methods and Properties
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo(url);
    await loginPage.validLogin(username, password);
    await expect(loginPage.products.first()).toBeVisible();

    //display the dashboard and add product to cart
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProduct(productName);
    await dashboardPage.navigateToCart();

    //Cart page
    const cartPage = poManager.getCartPage();
    await cartPage.cartProductName.first().waitFor();
    await expect(cartPage.cartProductName).toContainText(productName);
    //Click on the checkout button on Cart page
    await cartPage.navigateToCheckout();

    //Payment details page
    const paymentDetailsPage = poManager.getPaymentDetailsPage();
    await paymentDetailsPage.enterPersonalInformationDetails(creditCardNumber, expiryDateDay, expiryDateMonth, cvvCode, nameOnCard);
    await paymentDetailsPage.enterShippingInformationAndPlaceOrder(selectCountryText);
    await paymentDetailsPage.navigateToThankYouPage();

    //Thank you for order page
    const thankYouPage = poManager.getThankYouPage();
    await expect(thankYouPage.orderMessage).toContainText(" Thankyou for the order.");
    const oderNumber = await thankYouPage.extractOrderNumber();
    console.log("This is the order ID " + oderNumber);
    await thankYouPage.navigateToOrdersPage();
    await thankYouPage.waitForTableToLoad.waitFor();

    //Myorders page
    const myOrdersPage = poManager.getMyOrdersPage();
    await myOrdersPage.searchForTheOrderNumber(oderNumber);
    const orderIdDetails = await myOrdersPage.myOrderID.textContent();
    expect(oderNumber.includes(orderIdDetails)).toBeTruthy();

    //await page.pause();

});

