import { test, expect } from './helpers.js';

test.describe('a11y', () => {
	test('initially doesn\'t add `application` role in list mode', async ({ page, fixture }) => {
		await fixture('list');
		await expect(page.locator('.shower')).not.toHaveAttribute('role', 'application');
	});

	test('removes `application` role when switched to `list` mode', async ({ page, fixture }) => {
		await fixture('full');
		await page.keyboard.press('Escape');
		await expect(page.locator('.shower')).not.toHaveAttribute('role', 'application');
	});

	test('initially adds `application` role in full screen mode', async ({ page, fixture }) => {
		await fixture('full');
		await expect(page.locator('.shower')).toHaveAttribute('role', 'application');
	});

	test('adds `application` role when switched to `full` mode', async ({ page, fixture }) => {
		await fixture('list');
		await page.locator('[id="1"]').click();
		await expect(page.locator('.shower')).toHaveAttribute('role', 'application');
	});

	test('initially sets live region in `list` mode', async ({ page, fixture }) => {
		await fixture('list', '#3');
		await expect(page.locator('.region h2')).toContainText('3');
	});

	test('initially sets live region in `full` mode', async ({ page, fixture }) => {
		await fixture('full', '#2');
		await expect(page.locator('.region h2')).toContainText('2');
	});

	test('updates live region when moving forwards in `list` mode', async ({ page, fixture }) => {
		await fixture('list', '#1');
		await expect(page.locator('.region h2')).toContainText('1');
		await page.keyboard.press('ArrowRight');
		await expect(page.locator('.region h2')).toContainText('2');
		await page.keyboard.press('ArrowRight');
		await expect(page.locator('.region h2')).toContainText('3');
	});

	test('updates live region when moving backwards in `list` mode', async ({ page, fixture }) => {
		await fixture('list', '#3');
		await expect(page.locator('.region h2')).toContainText('3');
		await page.keyboard.press('ArrowLeft');
		await expect(page.locator('.region h2')).toContainText('2');
		await page.keyboard.press('ArrowLeft');
		await expect(page.locator('.region h2')).toContainText('1');
	});

	test('updates live region when moving forwards in `full` mode', async ({ page, fixture }) => {
		await fixture('full', '#1');
		await expect(page.locator('.region h2')).toContainText('1');
		await page.keyboard.press('ArrowRight');
		await expect(page.locator('.region h2')).toContainText('2');
		await page.keyboard.press('ArrowRight');
		await expect(page.locator('.region h2')).toContainText('3');
	});

	test('updates live region when moving backwards in `full` mode', async ({ page, fixture }) => {
		await fixture('full', '#3');
		await expect(page.locator('.region h2')).toContainText('3');
		await page.keyboard.press('ArrowLeft');
		await expect(page.locator('.region h2')).toContainText('2');
		await page.keyboard.press('ArrowLeft');
		await expect(page.locator('.region h2')).toContainText('1');
	});
});
