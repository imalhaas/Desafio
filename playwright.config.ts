import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173,
  },
  testDir: 'tests',
  testMatch: /(.+.)?(test|spec).[jt]s/,
  
  use: {
    headless: false,
    video: 'on', 
    screenshot: 'on', 
    launchOptions: {
      slowMo: 1000, 
    },
  },
};


export default config;
