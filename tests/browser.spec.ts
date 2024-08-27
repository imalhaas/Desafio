import { test, expect } from '@playwright/test';


test('fill in the fields and click the Start challenge button', async ({ page }) => {
  // Navigates to the form page
  await page.goto('http://localhost:5173/'); 

  // Fill in the form fields
  await page.fill('input[type="text"]', 'Lucas');
  await page.fill('input[type="tel"]', '123');
  await page.fill('input[type="email"]', 'lucasdecassia9@hotmail.com');

  // Click the button to start the challenge
  await page.click('button:has-text("Start Challenge")');

  // Check if button is disabled after click
  await expect(page.locator('button:has-text("Start Challenge")')).toBeDisabled();

});


