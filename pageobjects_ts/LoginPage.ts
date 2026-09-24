//const {expect} = require('@playwright/test');
import { Page, Locator } from '@playwright/test';

export class LoginPage {

    page: Page;
    signInButton: Locator;
    username: Locator;
    password: Locator;
    products: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator("#login");
        this.username = page.locator("[type='email']");
        this.password = page.locator("#userPassword");
        this.products = page.locator(".card-body");
    }

    //website to login to 
    async goTo(url: string){
        await this.page.goto(url);
    }

    //login method 
    async validLogin(username: string, password: string){

        await this.username.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
    }

}

module.exports = LoginPage;