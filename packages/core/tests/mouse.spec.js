import { test, expect } from './helpers.js';

test.describe('mouse', () => {
	// Mouse inactivity timeout is 5000ms by default, so these tests need extra time.
	test.describe.configure({ timeout: 15000 });

	test('doesn\'t add `pointless` class initially in `full` mode', async ({ page, fixture }) => {
		await fixture('full', '#1');
		await expect(page.locator('.shower')).not.toHaveClass(/pointless/);
	});

	test('adds `pointless` class after mouse inactivity in `full` mode', async ({ page, fixture }) => {
		await fixture('full', '#1');

		// Move mouse to trigger the inactivity timer
		await page.mouse.move(100, 100);

		// The default mouseInactivityTimeout is 5000ms;
		// use auto-retrying assertion with enough headroom
		await expect(page.locator('.shower')).toHaveClass(/pointless/, { timeout: 7000 });
	});

	test('removes `pointless` class when mouse moves', async ({ page, fixture }) => {
		await fixture('full', '#1');

		await page.mouse.move(100, 100);
		await expect(page.locator('.shower')).toHaveClass(/pointless/, { timeout: 7000 });

		// Moving mouse again should immediately remove the class
		await page.mouse.move(200, 200);
		await expect(page.locator('.shower')).not.toHaveClass(/pointless/);
	});

	test('removes `pointless` class when switching to `list` mode', async ({ page, fixture }) => {
		await fixture('full', '#1');

		await page.mouse.move(100, 100);
		await expect(page.locator('.shower')).toHaveClass(/pointless/, { timeout: 7000 });

		await page.keyboard.press('Escape');
		await expect(page.locator('.shower')).toHaveClass(/list/);
		await expect(page.locator('.shower')).not.toHaveClass(/pointless/);
	});

	test('doesn\'t add `pointless` class in `list` mode', async ({ page, fixture }) => {
		await fixture('list', '#1');

		await page.mouse.move(100, 100);
		await page.mouse.move(200, 200);

		// Wait beyond the inactivity timeout to confirm class is never added
		await page.waitForTimeout(5500);
		await expect(page.locator('.shower')).not.toHaveClass(/pointless/);
	});
});
