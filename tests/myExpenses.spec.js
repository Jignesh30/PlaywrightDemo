import { test, mouse, expect } from "@playwright/test";
import { use } from "../playwright.config";
const myExpenses = require("../objectRepository/myExpensesModule/myExpensesFunctions");
const locatorsPlutoCard = require("../objectRepository/myExpensesModule/myExpensesLocators");
const mouseActions = require("../main/web/mouse");
const verify = require("../main/web/verify");
const base = require("../main/web/base");
const testData = require("../dataSource/testData/data");
const myExpensesModule = new myExpenses();

test.beforeEach(async ({ page }) => {
    // Navigating to te URl
    await page.goto(use.baseURL);
    await myExpensesModule.enterEmailId(page, testData.clerkRole);
    await myExpensesModule.clickOnTheContinueButton(page);
    await myExpensesModule.verifyTheEmailText(page, "Check your email");
    await myExpensesModule.clickOnTheTryAnotherMethodLinkAndVerifyTheText(page);
    await myExpensesModule.verifySendEmailCode(page);
    // Set test timeout
    test.setTimeout(720000000);
    await myExpensesModule.enterOtp(page, '4', '2', '4', '2', '4', '2');
    await myExpensesModule.whenNeedOfTheTwoTimesOtp(page, '4', '2', '4', '2', '4', '2');
    // Conditional code execution
    if (!testData.accountantRole) {
        console.log("The login with Accountant role")
    } else {
        await myExpensesModule.clickOnTheCloseButtonOfTheWelcomePage(page);
        await myExpensesModule.verifyReimbursementsText(page, 'My reimbursements');
    }
});

test('Add new expense (TodayDate)', async ({ page, context }) => {
    //U0F-136 
    await myExpensesModule.clickOnTheNewExpensesButton(page, 'My reimbursements', 'Expense details');
    await page.setInputFiles(locatorsPlutoCard.fileUpload, "dataSource//upload//receipts.jpeg");
    // handling new Tab 
    const [newTab] = await Promise.all([
        context.waitForEvent('page'),
        myExpensesModule.clickOnTheDownloadButton(page)
    ]);
    await newTab.close();
    const locatorValue = await myExpensesModule.enterMerchantNameAndMerchantText(page, "Merchant", 'effeABC');
    await myExpensesModule.enterAmountAndAmountText(page, 'Amount', '150000');
    await myExpensesModule.verifyCurrencyTextAndSelectSpecificCurrency(page, 'Currency')
    await myExpensesModule.verifySelectNewCategory(page);
    await myExpensesModule.clickOnTheTheTodayDate(page);
    await myExpensesModule.verifyTheApprovalGroups(page)
    await myExpensesModule.verifyEnterMessageAndClickOnTheSubmitButton(page, 'plutoCard', 'Expense submitted')
    console.log("Test completed");
});

test.skip('Add new expense (YesterDayDate)', async ({ page, context }) => {
    //U0F-136 
    await myExpensesModule.clickOnTheNewExpensesButton(page, 'My reimbursements', 'Expense details');
    await myExpensesModule.enterMerchantNameAndMerchantText(page, "Merchant", 'merchant2');
    await myExpensesModule.enterAmountAndAmountText(page, 'Amount', '15000');
    await myExpensesModule.verifyCurrencyTextAndSelectSpecificCurrency(page, 'Currency')
    await myExpensesModule.verifySelectNewCategory(page);
    await myExpensesModule.verifyEnterYesterDayDate(page);
    await myExpensesModule.verifyTheApprovalGroups(page);
    // await myExpensesModule.enterTheTag(page, 'UAE')
    await page.setInputFiles(locatorsPlutoCard.fileUpload, "dataSource//upload//download.png");
    // handling new Tab 
    const [newTab] = await Promise.all([
        context.waitForEvent('page'),
        myExpensesModule.clickOnTheDownloadButton(page)
    ]);
    await newTab.close();
    await myExpensesModule.verifyEnterMessageAndClickOnTheSubmitButton(page, 'plutoCard', 'Expense submitted')
    console.log("Test completed");
});

test.skip('Pluto Reimbursement -[Page]', async ({ page }) => {
    // u0f -166
    await myExpensesModule.verifyTheNewExpenseButtonIsVisible(page);
    await myExpensesModule.verifyTheSearchBoxIsVisible(page);
    await myExpensesModule.verifyTheFilterButton(page);
    await myExpensesModule.verifyVisibleTheALlButton(page);
    await myExpensesModule.verifyTheDraftSectionIsVisible(page);
    await myExpensesModule.verifyTheVisibleSubmittedSection(page);
    await myExpensesModule.verifyTheVisibleApprovedSection(page);
    await myExpensesModule.verifyTheVisibleRejectTab(page);
    await myExpensesModule.verifyTheVisibleTheReimbursedSection(page)
});