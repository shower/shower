import { test, expect } from './helpers.js';

const mdash = '\u2014';

test.describe('title', () => {
	test('stays unchanged in `list` mode', async ({ page, fixture }) => {
		await fixture('list-title');
		await expect(page).toHaveTitle('title');
	});

	test('stays unchanged in `full` mode if slide title is missing', async ({ page, fixture }) => {
		await fixture('list-title', '#2');
		await expect(page).toHaveTitle('title');
	});

	test('gets prepended with current slide title in `full` mode', async ({ page, fixture }) => {
		await fixture('full-title');
		await expect(page).toHaveTitle(`1 ${mdash} title`);
	});

	test('gets stripped from HTML tags while prepending', async ({ page, fixture }) => {
		await fixture('full-title', '#3');
		await expect(page).toHaveTitle(`3 ${mdash} title`);
	});

	test('does not update when moving forwards in `list` mode', async ({ page, fixture }) => {
		await fixture('list-title', '#2');
		await expect(page).toHaveTitle('title');
		await page.keyboard.press('ArrowRight');
		await expect(page).toHaveTitle('title');
	});

	test('does not update when moving backwards in `list` mode', async ({ page, fixture }) => {
		await fixture('list-title', '#2');
		await expect(page).toHaveTitle('title');
		await page.keyboard.press('ArrowLeft');
		await expect(page).toHaveTitle('title');
	});

	test('updates when moving forwards in `full` mode', async ({ page, fixture }) => {
		await fixture('full-title');
		await expect(page).toHaveTitle(`1 ${mdash} title`);
		await page.keyboard.press('ArrowRight');
		await expect(page).toHaveTitle('title');
		await page.keyboard.press('ArrowRight');
		await expect(page).toHaveTitle(`3 ${mdash} title`);
	});

	test('updates when moving backwards in `full` mode', async ({ page, fixture }) => {
		await fixture('full-title', '#3');
		await expect(page).toHaveTitle(`3 ${mdash} title`);
		await page.keyboard.press('ArrowLeft');
		await expect(page).toHaveTitle('title');
		await page.keyboard.press('ArrowLeft');
		await expect(page).toHaveTitle(`1 ${mdash} title`);
	});

	test('updates when changing `list` to `full` mode', async ({ page, fixture }) => {
		await fixture('list-title');
		await expect(page).toHaveTitle('title');
		await page.locator('[id="1"]').click();
		await expect(page).toHaveTitle(`1 ${mdash} title`);
	});

	test('updates when changing `full` to `list` mode', async ({ page, fixture }) => {
		await fixture('full-title');
		await expect(page).toHaveTitle(`1 ${mdash} title`);
		await page.keyboard.press('Escape');
		await expect(page).toHaveTitle('title');
	});
});
