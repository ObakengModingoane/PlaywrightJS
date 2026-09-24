import { Page, Locator } from '@playwright/test';

export class MyOrdersPage {

    page: Page;
    tableRow: Locator;
    orderIdFromTable: Locator;
    myOrderID: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tableRow = page.locator("tbody tr");
        this.orderIdFromTable = page.locator(".col-text");
        this.myOrderID = page.locator(".col-text");
    }

    async searchForTheOrderNumber(oderNumber: any) {
        const rows = this.tableRow;

        for (let i = 0; i < await rows.count(); i++){
            const rowOrderNumber = await rows.nth(i).locator("th").textContent();
            if (oderNumber.includes(rowOrderNumber)){
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

}