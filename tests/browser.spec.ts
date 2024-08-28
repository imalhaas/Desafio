import { test, expect } from '@playwright/test';


test('fill in the fields and click the Start challenge button', async ({ page }) => {

  await page.goto('http://localhost:5173/'); 

  
  await page.fill('input[type="text"]', 'Lucas');
  await page.fill('input[type="tel"]', '123');
  await page.fill('input[type="email"]', 'lucasdecassia9@hotmail.com');

  
  await page.click('button:has-text("Start Challenge")');

  
  await expect(page.locator('button:has-text("Start Challenge")')).toBeDisabled();

});


