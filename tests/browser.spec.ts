import { test, expect } from '@playwright/test';


test('fill in the fields and click the Start challenge button', async ({ page }) => {

  await page.goto('http://localhost:5173/'); 

  
  await page.fill('input[type="text"]', 'Lucas');
  await page.fill('input[type="tel"]', '123');
  await page.fill('input[type="email"]', 'lucasdecassia9@hotmail.com');

  
  await page.click('button:has-text("Start Challenge")');

  
  await expect(page.locator('button:has-text("Start Challenge")')).toBeDisabled();

  await page.click('button:has-text("Submit")');

  await expect(page.locator('text=Challenge completed success')).toBeVisible();

  await expect(page).toHaveURL('http://localhost:5173/candidate?name=Lucas&phone=123&email=lucasdecassia9@hotmail.com');

  await page.waitForTimeout(1000); // await 30s

  await page.click('button:has-text("Back to Challenge")');

  await expect(page).toHaveURL('http://localhost:5173/');


});


