import { test, expect } from './helpers.js';

const TIMING = 1100;

test.describe('timer', () => {
	test('does not activate on page load in `list` mode', async ({ page, fixture }) => {
		await fixture('list-timer', '#2');
		await page.waitForTimeout(TIMING);
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
	});

	test('does not activate when moving forwards in `list` mode', async ({ page, fixture }) => {
		await fixture('list-timer', '#1');
		await page.keyboard.press('ArrowRight');
		await page.waitForTimeout(TIMING);
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
	});

	test('does not activate when moving backwards in `list` mode', async ({ page, fixture }) => {
		await fixture('list-timer', '#3');
		await page.keyboard.press('ArrowLeft');
		await page.waitForTimeout(TIMING);
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
	});

	test('activates on page load', async ({ page, fixture }) => {
		await fixture('full-timer', '#2');
		await expect(page.locator('[id="3"]')).toHaveClass(/active/);
	});

	test('activates when moving forwards', async ({ page, fixture }) => {
		await fixture('full-timer', '#1');
		await page.keyboard.press('ArrowRight');
		await expect(page.locator('[id="3"]')).toHaveClass(/active/);
	});

	test('activates when moving backwards', async ({ page, fixture }) => {
		await fixture('full-timer', '#3');
		await page.keyboard.press('ArrowLeft');
		await expect(page.locator('[id="3"]')).toHaveClass(/active/);
	});

	test('works only once', async ({ page, fixture }) => {
		await fixture('full-timer', '#2');
		await expect(page.locator('[id="3"]')).toHaveClass(/active/);

		await page.keyboard.press('ArrowLeft');
		await expect(page.locator('[id="2"]')).toHaveClass(/visited/);
		await page.waitForTimeout(TIMING);
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
	});

	test('gets cancelled by key press', async ({ page, fixture }) => {
		await fixture('full-timer', '#2');
		await page.evaluate(() => {
			document.body.dispatchEvent(
				new KeyboardEvent('keydown', {
					bubbles: true,
					key: 'a',
				}),
			);
		});
		await page.keyboard.press('a');
		await page.waitForTimeout(TIMING);
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
	});

	test('[nested steps] activates on page load', async ({ page, fixture }) => {
		await fixture('full-timer-next', '#2');
		const slide = page.locator('[id="2"]');

		await expect(slide.locator('.a.next')).toHaveClass(/active/);
		await expect(slide.locator('.b.next')).toHaveClass(/active/);
		await expect(slide.locator('.c.next')).toHaveClass(/active/);
		await expect(page.locator('[id="3"]')).toHaveClass(/active/);
	});

	test('[nested steps] gets cancelled by key press', async ({ page, fixture }) => {
		await fixture('full-timer-next', '#2');
		const slide = page.locator('[id="2"]');
		await page.evaluate(() => {
			document.body.dispatchEvent(
				new KeyboardEvent('keydown', {
					bubbles: true,
					key: 'a',
				}),
			);
		});
		await page.keyboard.press('a');
		await page.waitForTimeout(TIMING);
		await expect(slide.locator('.a.next')).not.toHaveClass(/active/);
	});
});
