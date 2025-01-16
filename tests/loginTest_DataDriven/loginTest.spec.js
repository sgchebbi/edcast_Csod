import { test, expect } from '@playwright/test';
import { login_locators } from './loginTestLocators';
import { login_data } from './loginTestData';

test.describe('login test suite @smoke', () => {
  test('Verify login test', async ({ page }) => {
    await test.step('Given I navigate to login_page', async () => {
      await page.goto(login_data.login_pageUrl);
    });

    await test.step('And enter user name and password', async () => {
      await page.locator(login_locators.username_loc).fill(login_data.username);
      await page.locator(login_locators.password_loc).fill(login_data.password);
    });

    await test.step('When I click on submit button', async () => {
      await page.locator(login_locators.submit_loc).click();
    });

    await test.step('Then I should verify url contains /logged-in-successfully/', async () => {
      await expect(page).toHaveURL(login_data.user_logged_in_successfully_Url);
      await expect(page).toHaveURL(/.*logged-in-successfully/);
    });
  });


let i = 1;

for (const {username, password} of login_data.username_Password_Data)
{

    test(`${i++} Validate Users Not Able To Login With Following Data ${username},${password} `, async ({ page }) => {
        await test.step('Given I navigate to login_page', async () => {
          await page.goto(login_data.login_pageUrl);
        });
    
        await test.step('And enter user name and password', async () => {
          await page.locator(login_locators.username_loc).fill(username);
          await page.locator(login_locators.password_loc).fill(password);
        });
    
        await test.step('When I click on submit button', async () => {
          await page.locator(login_locators.submit_loc).click();
        });
    
        await test.step('Then I should verify User Not LoggedIn. /practice-test-login/', async () => {
          await expect(page).not.toHaveURL(login_data.user_logged_in_successfully_Url);
          await expect(page).toHaveURL(login_data.user_not_logged_in);
        });
      });
       
}


});