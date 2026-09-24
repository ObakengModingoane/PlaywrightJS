//importing the page class 
const LoginPage = require('../page_objects/LoginPage.js');
const DashboardPage = require('../page_objects/DashboardPage.js');
const CartPage = require('../page_objects/CartPage.js')
const PaymentDetailsPage = require('../page_objects/PaymentDetailsPage.js')
const ThankYouPage = require('../page_objects/ThankYouPage.js')
const MyOrdersPage = require('../page_objects/MyOrdersPage.js')

class POManager {
    constructor(page) {
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

module.exports = POManager;