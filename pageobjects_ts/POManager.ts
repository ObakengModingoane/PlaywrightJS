//importing the page class 
import { Page, Locator } from '@playwright/test';
import {LoginPage} from '../pageobjects_ts/LoginPage';
import {DashboardPage} from '../pageobjects_ts/DashboardPage';
import {CartPage} from '../pageobjects_ts/CartPage';
import {PaymentDetailsPage} from '../pageobjects_ts/PaymentDetailsPage';
import {ThankYouPage} from '../pageobjects_ts/ThankYouPage';
import {MyOrdersPage} from '../pageobjects_ts/MyOrdersPage';

export class POManager { 

    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage; 
    paymentDetailsPage: PaymentDetailsPage;
    thankYouPage: ThankYouPage;
    myOrdersPage: MyOrdersPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page, this.loginPage.products);
        this.cartPage = new CartPage(this.page);
        this.paymentDetailsPage = new PaymentDetailsPage(this.page);
        this.thankYouPage = new ThankYouPage(this.page);
        this.myOrdersPage = new MyOrdersPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getPaymentDetailsPage() {
        return this.paymentDetailsPage;
    }

    getThankYouPage() {
        return this.thankYouPage;
    }

    getMyOrdersPage() {
        return this.myOrdersPage;
    }

}