import { test, expect } from './helpers.js';

test.describe('core', () => {
	test('uses `list` mode in lack of any', async ({ page, fixture }) => {
		await fixture('none');
		await expect(page.locator('.shower')).toHaveClass(/list/);
	});

	test('stays in `list` mode if `list` is present', async ({ page, fixture }) => {
		await fixture('list');
		await expect(page.locator('.shower')).toHaveClass(/list/);
	});

	test('stays in `full` mode if `full` is present', async ({ page, fixture }) => {
		await fixture('full');
		await expect(page.locator('.shower')).toHaveClass(/full/);
	});

	test('goes to `full` mode when a slide is clicked', async ({ page, fixture }) => {
		await fixture('list');
		await page.locator('[id="1"]').click();
		await expect(page.locator('.shower')).toHaveClass(/full/);
	});

	test('doesn\'t go to `full` mode on slide click if default is prevented', async ({ page, fixture }) => {
		await fixture('list-default-prevented');
		await page.locator('#default-prevented-button').click();
		await expect(page.locator('.shower')).toHaveClass(/list/);
		await expect(page.locator('#default-prevented-slide')).not.toHaveClass(/active/);
	});

	test('adds IDs to all slides unless already set', async ({ page, fixture }) => {
		await fixture('list-id');
		await expect(page.locator('[id="1"]')).toBeAttached();
		await expect(page.locator('[id="2"]')).not.toBeAttached();
		await expect(page.locator('#id')).toBeAttached();
		await expect(page.locator('[id="3"]')).toBeAttached();
	});

	test('skips slides with `hidden` attribute', async ({ page, fixture }) => {
		await fixture('list-hidden');
		await expect(page.locator('[id="1"]')).toBeAttached();
		await expect(page.locator('[id="2"]')).toBeAttached();
		await expect(page.locator('[id="3"]')).not.toBeAttached();
	});

	test('doesn\'t set any slide states on init', async ({ page, fixture }) => {
		await fixture('list');
		await expect(page.locator('.active')).toHaveCount(0);
		await expect(page.locator('.visited')).toHaveCount(0);
	});

	test('sets `active` state to a current slide only (not `visited`)', async ({ page, fixture }) => {
		await fixture('list-id', '#id');
		await expect(page.locator('[id="1"]')).not.toHaveClass(/active/);
		await expect(page.locator('[id="1"]')).not.toHaveClass(/visited/);
		await expect(page.locator('#id')).toHaveClass(/active/);
		await expect(page.locator('#id')).not.toHaveClass(/visited/);
		await expect(page.locator('[id="3"]')).not.toHaveClass(/active/);
		await expect(page.locator('[id="3"]')).not.toHaveClass(/visited/);
	});
});
