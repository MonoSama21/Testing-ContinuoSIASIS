import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './src/test',
  outputDir: './target/generated-test-sources',
  fullyParallel: true,
  reporter: [
		['list', { printSteps: true }],
		['html', { outputFolder: './target/playwright-reports' }]
	],
  use: {
    trace: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});
