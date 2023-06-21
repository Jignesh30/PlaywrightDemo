const verify = require("../../main/web/verify");
const locatorsPlutoCard = require("../../objectRepository/myExpensesModule/myExpensesLocators");
const cli = require("../../main/web/mouse");
const lib = require("../../main/web/base");


class myExpensesFunctionsModule {
    constructor() { }

    async enterEmailId(page, validEmailAddress) {
        //enter email Id 
        await lib.fillText(page, locatorsPlutoCard.emailAddressTextBox, validEmailAddress);

    };

    async clickOnTheContinueButton(page) {
        // click on the continue button
        await cli.clickOnButton(page, locatorsPlutoCard.continueButton);
    };

    async verifyTheEmailText(page, verifyCheckYourEmail) {
        // verify the text of checkEmail address
        await verify.verifyTextIsEqualTo(page, locatorsPlutoCard.checkEmailText, verifyCheckYourEmail);
    };

    async clickOnTheTryAnotherMethodLinkAndVerifyTheText(page) {
        // click on the try another method link and verify text
        await verify.verifyElementIsVisible(page, locatorsPlutoCard.tryAnotherMethodHyperLink);
        await page.locator(locatorsPlutoCard.tryAnotherMethodHyperLink).isVisible();
        await cli.clickOnButton(page, locatorsPlutoCard.tryAnotherMethodHyperLink);
    };

    async verifySendEmailCode(page) {
        // click on the emailCode send button
        await verify.verifyElementIsVisible(page, locatorsPlutoCard.emailCodeButton);
        await page.locator(locatorsPlutoCard.emailCodeButton).isVisible();
        await cli.clickOnButton(page, locatorsPlutoCard.emailCodeButton);
    };

    async enterOtp(page, enterNum1, enterNum2, enterNum3, enterNum4, enterNum5, enterNum6) {
        await lib.fillText(page, locatorsPlutoCard.otpTextBox1, enterNum1)
        await lib.fillText(page, locatorsPlutoCard.otpTextBox2, enterNum2);
        await lib.fillText(page, locatorsPlutoCard.otpTextBox3, enterNum3);
        await lib.fillText(page, locatorsPlutoCard.otpTextBox4, enterNum4);
        await lib.fillText(page, locatorsPlutoCard.otpTextBox5, enterNum5);
        await lib.fillText(page, locatorsPlutoCard.otpTextBox6, enterNum6)
    };

    async whenNeedOfTheTwoTimesOtp(page, enterNum1, enterNum2, enterNum3, enterNum4, enterNum5, enterNum6) {
        const errorMessageSelector = locatorsPlutoCard.errorMessageAfterOtpFailed;
        try {
            await page.waitForSelector(errorMessageSelector, { state: 'visible', timeout: 3000 });
            await lib.fillText(page, locatorsPlutoCard.otpTextBox1, enterNum1);
            await lib.fillText(page, locatorsPlutoCard.otpTextBox2, enterNum2);
            await lib.fillText(page, locatorsPlutoCard.otpTextBox3, enterNum3);
            await lib.fillText(page, locatorsPlutoCard.otpTextBox4, enterNum4);
            await lib.fillText(page, locatorsPlutoCard.otpTextBox5, enterNum5);
            await lib.fillText(page, locatorsPlutoCard.otpTextBox6, enterNum6);
        } catch (error) {
            console.error("Error message is not visible");
            return; // Stop further execution if error message is not visible
        }
    };


    async clickOnTheCloseButtonOfTheWelcomePage(page) {
        //  click on the close button under welcome page 
        if (locatorsPlutoCard.closeTheWelcomePage.isVisible) {
            await cli.clickOnButton(page, locatorsPlutoCard.closeTheWelcomePage)
        }
    };

    async verifyReimbursementsText(page, enterReimbursementsText) {
        //  verify the reimbursement title Text and click on the reimbursement
        await verify.verifyElementIsVisible(page, locatorsPlutoCard.reimbursements)
        await cli.clickOnButton(page, locatorsPlutoCard.reimbursements);
        await verify.verifyTextIsEqualTo(page, locatorsPlutoCard.myReimbursementsPageTitleText, enterReimbursementsText);
    };

    async clickOnTheNewExpensesButton(page, enterReimbursementsText, enterExpensesDetailsText) {
        //  verify the reimbursement title Text  and expenses text.
        await verify.verifyElementIsVisible(page, locatorsPlutoCard.myExpensesText)
        await cli.clickOnButton(page, locatorsPlutoCard.myExpensesText);
        await verify.verifyTextIsEqualTo(page, locatorsPlutoCard.myReimbursementsPageTitleText, enterReimbursementsText);
        await cli.clickOnButton(page, locatorsPlutoCard.newExpensesButton);
        await verify.verifyTextIsEqualTo(page, locatorsPlutoCard.expensesDetailsTitleText, enterExpensesDetailsText);
    };

    async clickOnTheDownloadButton(page) {
        //  click on the download button
        await cli.clickOnButton(page, locatorsPlutoCard.downLoadButton);
    };

    async enterMerchantNameAndMerchantText(page, merchantText) {
        //Creating Random Name
        const startMerchantName = "aUser";
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomMerchantName = '';
        for (let i = 0; i < 7; i++) {
            randomMerchantName += chars.charAt(Math.floor(Math.random() * chars.length));
        };
        const fixedMerchantName = startMerchantName + randomMerchantName;
        var locatorForName = await addRandomXpathForTestInNewAddedExpenses(page, fixedMerchantName)
        await verify.verifyTextIsEqualTo(page, locatorsPlutoCard.merchantText, merchantText);
        await lib.fillText(page, locatorsPlutoCard.merchantNameTextBox, fixedMerchantName)
        const fixedString = fixedMerchantName + "+" + locatorForName;
        return fixedString;
    };

    async addRandomXpathForTestInNewAddedExpenses(page, name) {
        // generated new expenses
        console.log(name)
        let generatedNewExpensesXpath = '//*[contains(text(),"' + name + '")]';
        console.log(generatedNewExpensesXpath);
        return generatedNewExpensesXpath;
    };

    async enterAmountAndAmountText(page, amountText, enterAmount) {
        // enter the amount field
        await verify.verifyTextIsEqualTo(page, locatorsPlutoCard.amountText, amountText);
        await lib.fillText(page, locatorsPlutoCard.enterAmountTextBox, enterAmount);
    };

    async verifyCurrencyTextAndSelectSpecificCurrency(page, enterCurrencyText) {
        // enter the currency and text verify
        await verify.verifyTextIsEqualTo(page, locatorsPlutoCard.currencyText, enterCurrencyText)
        await cli.clickOnButton(page, locatorsPlutoCard.currencyDropDown);
        await cli.clickOnButton(page, locatorsPlutoCard.selectTheUAE);
    };

    async verifySelectNewCategory(page) {
        // choose (add category)
        await cli.clickOnButton(page, locatorsPlutoCard.chooseTheCategory);
        await cli.clickOnButton(page, locatorsPlutoCard.addCategory);
    };

    async clickOnTheTheTodayDate(page) {
        // click on the today date 
        await cli.clickOnButton(page, locatorsPlutoCard.todayDate);
    };

    async verifyTheApprovalGroups(page) {
        // approval groups is disabled on Ui
        await verify.verifyElementIsDisabled(page, locatorsPlutoCard.approvalGroupFelid)
    };

    async verifyEnterMessageAndClickOnTheSubmitButton(page, enterMessage, expenseSubmittedMessage) {
        // click on the submit button and enter additional message
        await lib.fillText(page, locatorsPlutoCard.addMessage, enterMessage);
        await cli.clickOnButton(page, locatorsPlutoCard.submitExpensesButton);
        await page.waitForSelector(locatorsPlutoCard.successFullMessage);
        await verify.verifyTextIsEqualTo(page, locatorsPlutoCard.successFullMessage, expenseSubmittedMessage);
    };

    async verifyEnterYesterDayDate(page) {
        //  click on the yesterday date 
        await cli.clickOnButton(page, locatorsPlutoCard.addYesterDayDate);
    };

    async verifyTheNewExpenseButtonIsVisible(page) {
        // verify the expenses button 
        await verify.verifyElementIsVisible(page, locatorsPlutoCard.newExpensesButton)
    };

    async verifyTheSearchBoxIsVisible(page) {
        // verify the text box is visible 
        await verify.verifyElementIsVisible(page, locatorsPlutoCard.searchInputBox)
    };

    async verifyTheFilterButton(page) {
        // verify the filter button is visible 
        await verify.verifyElementIsVisible(page, locatorsPlutoCard.filterButton)
    };

    async verifyVisibleTheALlButton(page) {
        //Visible  on the all tab section
        await verify.verifyElementIsVisible(page, locatorsPlutoCard.allButton);
    };

    async verifyTheDraftSectionIsVisible(page) {
        // verify the visible draft section 
        await verify.verifyElementIsVisible(page, locatorsPlutoCard.draftSection);
    };

    async verifyTheVisibleSubmittedSection(page) {
        // verify  on the submitted section
        await cli.clickOnButton(page, locatorsPlutoCard.submittedSection);
    };

    async verifyTheVisibleApprovedSection(page) {
        // verify approved  the visible on UI
        await cli.clickOnButton(page, locatorsPlutoCard.approvedSection);
    };

    async verifyTheVisibleRejectTab(page) {
        // verify the rejected tab is visible on UI
        await verify.verifyElementIsVisible(page, locatorsPlutoCard.rejectedSection);
    };

    async verifyTheVisibleTheReimbursedSection(page) {
        // verify the visible on UI ReimbursedSection
        await verify.verifyElementIsVisible(page, locatorsPlutoCard.ReimbursedSection);
    };

}

module.exports = myExpensesFunctionsModule 