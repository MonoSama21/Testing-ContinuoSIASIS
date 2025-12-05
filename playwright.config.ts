import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './src/test',
  outputDir: './target/generated-test-sources',
  fullyParallel: true,
  timeout: 60000,
  reporter: [
		['list', { printSteps: true }],
		['html', { outputFolder: './target/playwright-reports' }]
	],
  use: {
    trace: 'on',
    actionTimeout: 60000,
    navigationTimeout: 60000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});
