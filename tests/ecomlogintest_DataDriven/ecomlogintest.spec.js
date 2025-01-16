import { test, expect } from '@playwright/test';
import { ecomlogin_locators } from './ecomloginTestLocators';
import { ecomlogin_data } from './ecomlogintestdata';

test.describe('login to Ecommerce Website @ecom',() => {
  
  test.beforeEach(async ({page}) => {
    
      await test.step('Given I navigate to login_page', async () => {
        await page.goto(ecomlogin_data.login_pageUrl);
        await page.pause();
      });
  
      await test.step('And I hover on My account', async () => {
        await page.getByRole('button',{name:ecomlogin_locators.my_account_loc}).hover();
      });

      await test.step('And I click on Login', async () => {
        await page.getByText(ecomlogin_locators.login_loc).click();
      });
  
  });
  
  
  test.only('Verify login test', async ({ page }) => {
    await test.step('And enter user name and password', async () => {
      await page.locator(ecomlogin_locators.username_loc).fill(ecomlogin_data.username);
      await page.locator(ecomlogin_locators.password_loc).fill(ecomlogin_data.password);
    });

    await test.step('When I click on submit button', async () => {
      await page.locator(ecomlogin_locators.submit_loc).click();
    });

    await test.step('Then I should verify url contains /route=account\/account/', async () => {
      await expect(page).toHaveURL(ecomlogin_data.user_logged_in_successfully_Url);
      await expect(page).toHaveURL(/.*route=account\/account/);
    });
  });


let i = 1;

for (const {username, password} of ecomlogin_data.username_Password_Data)
{

    test(`${i++} Validate Users Not Able To Login With Following Data ${username},${password} `, async ({ page }) => {
        await test.step('Given I navigate to login_page', async () => {
          await page.goto(ecomlogin_data.login_pageUrl);
        });
    
        await test.step('And enter user name and password', async () => {
          await page.locator(ecomlogin_locators.username_loc).fill(username);
          await page.locator(ecomlogin_locators.password_loc).fill(password);
        });
    
        await test.step('When I click on submit button', async () => {
          await page.locator(ecomlogin_locators.submit_loc).click();
        });
    
        await test.step('Then I should verify User Not LoggedIn. /practice-test-login/', async () => {
          await expect(page).not.toHaveURL(ecomlogin_data.user_logged_in_successfully_Url);
          await expect(page).toHaveURL(ecomlogin_data.user_not_logged_in);
        });
      });
       
}


});