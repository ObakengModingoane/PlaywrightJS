//const {expect} = require('@playwright/test');

class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("#login");
        this.username = page.locator("[type='email']");
        this.password = page.locator("#userPassword");
        this.products = page.locator(".card-body");
    }

    //website to login to 
    async goTo(url){
        await this.page.goto(url);
    }

    //login method 
    async validLogin(username, password){

        await this.username.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
    }

}

module.exports = LoginPage;