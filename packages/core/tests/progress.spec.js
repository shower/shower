import { test, expect } from './helpers.js';

test.describe('progress', () => {
	test('is shown in `full` mode', async ({ page, fixture }) => {
		await fixture('full');
		await expect(page.locator('.progress')).toHaveCSS('display', 'block');
	});

	test('is hidden in `list` mode', async ({ page, fixture }) => {
		await fixture('list');
		await expect(page.locator('.progress')).toHaveCSS('display', 'none');
	});

	test('updates progress on page load (class)', async ({ page, fixture }) => {
		await fixture('full', '#2');
		await expect(page.locator('.progress')).toHaveAttribute('aria-valuenow', '50');
	});

	test('updates progress on page load (query)', async ({ page, fixture }) => {
		await fixture('list', '?full#2');
		await expect(page.locator('.progress')).toHaveAttribute('aria-valuenow', '50');
	});

	test('updates progress when moving forward', async ({ page, fixture }) => {
		await fixture('full');
		await expect(page.locator('.progress')).toHaveAttribute('aria-valuenow', '0');
		await page.keyboard.press('ArrowRight');
		await expect(page.locator('.progress')).toHaveAttribute('aria-valuenow', '50');
		await page.keyboard.press('ArrowRight');
		await expect(page.locator('.progress')).toHaveAttribute('aria-valuenow', '100');
	});

	test('updates progress when moving backwards', async ({ page, fixture }) => {
		await fixture('full', '#3');
		await expect(page.locator('.progress')).toHaveAttribute('aria-valuenow', '100');
		await page.keyboard.press('ArrowLeft');
		await expect(page.locator('.progress')).toHaveAttribute('aria-valuenow', '50');
		await page.keyboard.press('ArrowLeft');
		await expect(page.locator('.progress')).toHaveAttribute('aria-valuenow', '0');
	});
});
