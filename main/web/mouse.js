//ClickOnElement single element
export async function clickOnButton(page, element) {
    await page.locator(element).click();
}

module.exports = {
    clickOnButton,
};
