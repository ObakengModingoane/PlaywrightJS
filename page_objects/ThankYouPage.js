class ThankYouPage {
    constructor(page) {
        this.page = page;
        this.orderMessage = page.locator(".hero-primary");
        this.orderID = page.locator(".em-spacer-1 .ng-star-inserted");
        this.ordersButton = page.locator("button[routerlink*='myorders']");
        this.waitForTableToLoad = page.locator("tbody");
    }

    async extractOrderNumber() {
        return await this.orderID.textContent();
    }

    async navigateToOrdersPage() {
        await this.ordersButton.click();
    }

}

module.exports = ThankYouPage;