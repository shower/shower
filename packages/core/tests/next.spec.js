import { test, expect } from './helpers.js';

test.describe('next', () => {
	test('does not work in list mode (forwards)', async ({ page, fixture }) => {
		await fixture('list-next', '#2');
		await page.keyboard.press('ArrowRight');
		await expect(page.locator('[id="3"]')).toHaveClass(/active/);
	});

	test('does not work in list mode (backwards)', async ({ page, fixture }) => {
		await fixture('full-next', '#2');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('Escape');
		await page.keyboard.press('ArrowLeft');
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	test('moves forwards', async ({ page, fixture }) => {
		await fixture('full-next', '#2');
		const slide = page.locator('[id="2"]');

		await page.keyboard.press('ArrowRight');
		await expect(slide.locator('.a.next')).toHaveClass(/active/);

		await page.keyboard.press('ArrowRight');
		await expect(slide.locator('.a.next')).toHaveClass(/visited/);
		await expect(slide.locator('.b.next')).toHaveClass(/active/);

		await page.keyboard.press('ArrowRight');
		await expect(slide.locator('.a.next')).toHaveClass(/visited/);
		await expect(slide.locator('.b.next')).toHaveClass(/visited/);
		await expect(slide.locator('.c.next')).toHaveClass(/active/);

		await page.keyboard.press('ArrowRight');
		await expect(slide.locator('.c.next')).toHaveClass(/visited/);
		await expect(page.locator('[id="3"]')).toHaveClass(/active/);
	});

	test('moves backwards', async ({ page, fixture }) => {
		await fixture('full-next', '#2');
		const slide = page.locator('[id="2"]');

		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowLeft');

		await expect(slide.locator('.a.next')).toHaveClass(/visited/);
		await expect(slide.locator('.a.next')).toHaveClass(/active/);
		await expect(slide.locator('.b.next')).not.toHaveClass(/visited/);
		await expect(slide.locator('.b.next')).not.toHaveClass(/active/);

		await page.keyboard.press('ArrowLeft');
		await expect(slide.locator('.a.next')).not.toHaveClass(/visited/);
		await expect(slide.locator('.a.next')).not.toHaveClass(/active/);
	});

	test('does not complete slide when moving backwards', async ({ page, fixture }) => {
		await fixture('full-next', '#2');
		const slide = page.locator('[id="2"]');

		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowLeft');

		await expect(slide).toHaveClass(/active/);
		await expect(page.locator('[id="1"]')).not.toHaveClass(/active/);

		await expect(slide.locator('.a.next')).toHaveClass(/visited/);
		await expect(slide.locator('.b.next')).toHaveClass(/visited/);
		await expect(slide.locator('.b.next')).toHaveClass(/active/);
		await expect(slide.locator('.c.next')).not.toHaveClass(/visited/);
		await expect(slide.locator('.c.next')).not.toHaveClass(/active/);
	});

	test('remembers progress when switching slides', async ({ page, fixture }) => {
		await fixture('full-next', '#2');
		const slide = page.locator('[id="2"]');

		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');

		await page.evaluate(() => { location.hash = '1'; });
		await page.evaluate(() => { location.hash = '2'; });

		await expect(slide.locator('.a.next')).toHaveClass(/visited/);
		await expect(slide.locator('.b.next')).toHaveClass(/active/);
	});

	test('does not step if once completed', async ({ page, fixture }) => {
		await fixture('full-next', '#2');
		const slide = page.locator('[id="2"]');

		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');

		await expect(page.locator('[id="3"]')).toHaveClass(/active/);

		await page.keyboard.press('ArrowLeft');
		await expect(slide).toHaveClass(/active/);
		await expect(slide.locator('.a.next')).toHaveClass(/visited/);
		await expect(slide.locator('.b.next')).toHaveClass(/visited/);
		await expect(slide.locator('.c.next')).toHaveClass(/visited/);

		await page.keyboard.press('ArrowLeft');
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);

		await page.keyboard.press('ArrowRight');
		await expect(slide).toHaveClass(/active/);
		await expect(slide.locator('.a.next')).toHaveClass(/visited/);
		await expect(slide.locator('.b.next')).toHaveClass(/visited/);
		await expect(slide.locator('.c.next')).toHaveClass(/visited/);

		await page.keyboard.press('ArrowRight');
		await expect(page.locator('[id="3"]')).toHaveClass(/active/);
	});
});
