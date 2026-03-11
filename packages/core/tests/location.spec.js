import { test, expect } from './helpers.js';

test.describe('location', () => {
	test('activates slide on page load by number in `list` mode', async ({ page, fixture }) => {
		await fixture('list-id', '#3');
		await expect(page.locator('[id="3"]')).toHaveClass(/active/);
	});

	test('activates slide on page load by number in `full` mode', async ({ page, fixture }) => {
		await fixture('full-id', '#3');
		await expect(page.locator('[id="3"]')).toHaveClass(/active/);
	});

	test('activates slide on page load by id in `list` mode', async ({ page, fixture }) => {
		await fixture('list-id', '#id');
		await expect(page.locator('#id')).toHaveClass(/active/);
	});

	test('activates slide on page load by id in `full` mode', async ({ page, fixture }) => {
		await fixture('full-id', '#id');
		await expect(page.locator('#id')).toHaveClass(/active/);
	});

	test('activates first slide if hash is invalid in `list` mode', async ({ page, fixture }) => {
		await fixture('list-id', '#invalid');
		await expect(page).toHaveURL(/#1/);
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	test('activates first slide if hash is invalid in `full` mode', async ({ page, fixture }) => {
		await fixture('full-id', '#invalid');
		await expect(page).toHaveURL(/#1/);
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	test('activates first slide if hash is invalid: `full` query', async ({ page, fixture }) => {
		await fixture('list-id', '?full#invalid');
		await expect(page).toHaveURL(/#1/);
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	test('does not activate first slide if hash is missing in `list` mode', async ({ page, fixture }) => {
		await fixture('list-id');
		await expect(page.locator('[id="1"]')).not.toHaveClass(/active/);
	});

	test('activates first slide if hash is missing in `full` mode', async ({ page, fixture }) => {
		await fixture('full-id');
		await expect(page).toHaveURL(/#1/);
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	test('enters `full` mode when `?full` query is present on a `list` page', async ({ page, fixture }) => {
		await fixture('list', '?full');
		await expect(page.locator('.shower')).toHaveClass(/full/);
		await expect(page.locator('.shower')).not.toHaveClass(/list/);
	});

	test('updates hash when moving forwards', async ({ page, fixture }) => {
		await fixture('list-id', '#1');
		await page.keyboard.press('ArrowRight');
		await expect(page).toHaveURL(/#id/);
		await page.keyboard.press('ArrowRight');
		await expect(page).toHaveURL(/#3/);
	});

	test('updates hash when moving backwards', async ({ page, fixture }) => {
		await fixture('full-id', '#3');
		await page.keyboard.press('ArrowLeft');
		await expect(page).toHaveURL(/#id/);
		await page.keyboard.press('ArrowLeft');
		await expect(page).toHaveURL(/#1/);
	});

	test('updates slides when changing url', async ({ page, fixture }) => {
		await fixture('list-id', '#1');
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);

		await page.evaluate(() => { location.hash = '3'; });
		await expect(page.locator('[id="1"]')).toHaveClass(/visited/);
		await expect(page.locator('[id="3"]')).toHaveClass(/active/);

		await page.evaluate(() => { location.hash = 'id'; });
		await expect(page.locator('[id="3"]')).toHaveClass(/visited/);
		await expect(page.locator('#id')).toHaveClass(/active/);
	});

	test('updates slides when navigating through history', async ({ page, fixture }) => {
		await fixture('full-id', '#1');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');

		await page.goBack();
		await expect(page).toHaveURL(/#id/);
		await expect(page.locator('#id')).toHaveClass(/active/);
		await expect(page.locator('[id="3"]')).not.toHaveClass(/active/);

		await page.goBack();
		await expect(page).toHaveURL(/#1/);
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
		await expect(page.locator('#id')).not.toHaveClass(/active/);

		await page.goForward();
		await expect(page).toHaveURL(/#id/);
		await expect(page.locator('#id')).toHaveClass(/active/);
		await expect(page.locator('[id="1"]')).not.toHaveClass(/active/);

		await page.goForward();
		await expect(page).toHaveURL(/#3/);
		await expect(page.locator('[id="3"]')).toHaveClass(/active/);
		await expect(page.locator('#id')).not.toHaveClass(/active/);
	});

	test('exits `full` mode when navigating through history', async ({ page, fixture }) => {
		await fixture('list-id');
		await page.locator('[id="1"]').click();
		await expect(page.locator('.shower')).toHaveClass(/full/);

		await page.goBack();
		await expect(page.locator('.shower')).toHaveClass(/list/);
	});

	test('enters `full` mode when navigating through history', async ({ page, fixture }) => {
		await fixture('full');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('Escape');
		await expect(page.locator('.shower')).toHaveClass(/list/);

		await page.goBack();
		await expect(page.locator('.shower')).toHaveClass(/full/);
	});

	test('does not change slide if hash is invalid in `list` mode', async ({ page, fixture }) => {
		await fixture('list-id', '#id');
		await page.evaluate(() => { location.hash = 'invalid'; });
		await expect(page.locator('#id')).toHaveClass(/active/);
		await expect(page.locator('#id')).not.toHaveClass(/visited/);
	});

	test('does not change slide if hash is invalid in `full` mode', async ({ page, fixture }) => {
		await fixture('full-id', '#id');
		await page.evaluate(() => { location.hash = 'invalid'; });
		await expect(page.locator('#id')).toHaveClass(/active/);
		await expect(page.locator('#id')).not.toHaveClass(/visited/);
	});

	test('sets `full` query on page load (no hash)', async ({ page, fixture }) => {
		await fixture('full');
		await expect(page).toHaveURL(/\?full/);
	});

	test('sets `full` query on page load (valid hash)', async ({ page, fixture }) => {
		await fixture('full-id', '#id');
		await expect(page).toHaveURL(/\?full/);
	});

	test('sets `full` query on page load (invalid hash)', async ({ page, fixture }) => {
		await fixture('full-id', '#invalid');
		await expect(page).toHaveURL(/\?full/);
	});

	test('persists `full` query after refresh', async ({ page, fixture }) => {
		await fixture('list');
		await page.locator('[id="3"]').click();
		await page.reload();
		await expect(page.locator('.shower')).toHaveClass(/full/);
	});

	test('persists hash after refresh in `list` mode', async ({ page, fixture }) => {
		await fixture('list', '#3');
		await page.reload();
		await expect(page).toHaveURL(/#3/);
	});

	test('persists hash after refresh in `full` mode', async ({ page, fixture }) => {
		await fixture('full', '#3');
		await page.reload();
		await expect(page).toHaveURL(/#3/);
	});

	test('no extra history entries: `list` mode', async ({ page, fixture }) => {
		await fixture('none');
		const before = await page.evaluate(() => history.length);
		await fixture('list');
		const after = await page.evaluate(() => history.length);
		expect(after - before).toBe(1);
	});

	test('no extra history entries: `list` mode and slide hash', async ({ page, fixture }) => {
		await fixture('none');
		const before = await page.evaluate(() => history.length);
		await fixture('list-id', '#id');
		const after = await page.evaluate(() => history.length);
		expect(after - before).toBe(1);
	});

	test('no extra history entries: `full` query', async ({ page, fixture }) => {
		await fixture('none');
		const before = await page.evaluate(() => history.length);
		await fixture('list', '?full');
		const after = await page.evaluate(() => history.length);
		expect(after - before).toBe(1);
	});

	test('no extra history entries: `full` query and slide hash', async ({ page, fixture }) => {
		await fixture('none');
		const before = await page.evaluate(() => history.length);
		await fixture('list', '?full#1');
		const after = await page.evaluate(() => history.length);
		expect(after - before).toBe(1);
	});
});
