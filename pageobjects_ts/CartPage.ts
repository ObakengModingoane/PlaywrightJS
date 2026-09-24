import { Page, Locator } from '@playwright/test';

export class CartPage {

    page: Page;
    cartProductName: Locator;
    checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartProductName = page.locator(".cart h3");
        this.checkoutButton = page.locator("text=Checkout");
    }

    async navigateToCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = CartPage;