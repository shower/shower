import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: 'tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'list',

	use: {
		baseURL: 'http://localhost:8483',
		trace: 'on-first-retry',
	},

	projects: [
		{
			name: 'unit',
			testMatch: 'parse-timing.spec.js',
		},
		{
			name: 'chromium',
			testIgnore: 'parse-timing.spec.js',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'firefox',
			testIgnore: 'parse-timing.spec.js',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'webkit',
			testIgnore: 'parse-timing.spec.js',
			use: { ...devices['Desktop Safari'] },
		},
	],

	webServer: {
		command: 'node tests/server.js 8483',
		url: 'http://localhost:8483/tests/fixtures/list.html',
		reuseExistingServer: !process.env.CI,
	},
});
