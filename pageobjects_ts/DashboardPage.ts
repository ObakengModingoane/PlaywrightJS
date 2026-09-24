import { Page, Locator } from '@playwright/test';

export class DashboardPage {

    page: Page;
    products: Locator;
    cart: Locator;

    constructor(page: Page, products: Locator) {
        this.page = page;
        this.products = products;
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProduct(productName: string){

        const count = await this.products.count();
        for( let i = 0; i < count; i++){
            if (await this.products.nth(i).locator("b").textContent() === productName){
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }

    }

    async navigateToCart(){
        //Click on the cart button and verify that the product is added to the cart
        await this.cart.click();
    }


}

module.exports = DashboardPage;

