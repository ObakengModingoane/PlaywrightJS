class CartPage {
    constructor(page) {
        this.page = page;
        this.cartProductName = page.locator(".cart h3");
        this.checkoutButton = page.locator("text=Checkout");
    }

    async navigateToCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = CartPage;