class PaymentDetailsPage {
    constructor(page) {
        this.page = page;
        this.creditCardNumber = page.locator("[value='4542 9931 9292 2293']");
        this.expiryDate = page.locator(".ddl");
        this.cvvCode = page.locator("(//input[@type='text'])[2]");
        this.nameOnCard = page.locator("(//input[@type='text'])[3]");
        this.selectCountry = page.locator("[placeholder*='Select Country']");
        this.dropDownCountResults = page.locator(".ta-results");
        this.placeOrderButton = page.locator(".action__submit");
    }

    async enterPersonalInformationDetails(creditCardNumber, expiryDateDay, expiryDateMonth, cvvCode, nameOnCard) {
        await this.creditCardNumber.fill(creditCardNumber);
        await this.expiryDate.first().pressSequentially(expiryDateDay);
        await this.expiryDate.last().pressSequentially(expiryDateMonth);
        await this.cvvCode.fill(cvvCode);
        await this.nameOnCard.fill(nameOnCard);
    }

    async enterShippingInformationAndPlaceOrder(selectCountryText) {
        await this.selectCountry.pressSequentially(selectCountryText, {delay: 150});
        const dropdownOptions = this.dropDownCountResults;
        await dropdownOptions.waitFor();
        const optionsCount = await dropdownOptions.locator("button").count();
        for(let i = 0; i < optionsCount; i++){
            if( await dropdownOptions.locator("button").nth(i).textContent() === " India"){
                await dropdownOptions.locator("button").nth(i).click();
                break;
            }
        }       
    }

    async navigateToThankYouPage() {
        await this.placeOrderButton.click();
    }

}

module.exports = PaymentDetailsPage;