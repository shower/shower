import { test as base, expect } from '@playwright/test';

const FIXTURES_PATH = '/tests/fixtures';

export { expect };

export const test = base.extend({
	fixture: async ({ page }, use) => {
		await use((name, hash = '') => {
			const url = `${FIXTURES_PATH}/${name}.html${hash}`;
			return page.goto(url);
		});
	},
});
