import { test, expect } from './helpers.js';

test.describe('touch', () => {
	test.use({ hasTouch: true });

	test('navigates to next slide when touching right half in `full` mode', async ({ page, fixture }) => {
		await fixture('full', '#1');
		const width = await page.evaluate(() => window.innerWidth);

		await page.touchscreen.tap(Math.round(width * 0.75), 300);
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
	});

	test('navigates to previous slide when touching left half in `full` mode', async ({ page, fixture }) => {
		await fixture('full', '#2');
		const width = await page.evaluate(() => window.innerWidth);

		await page.touchscreen.tap(Math.round(width * 0.25), 300);
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	test('doesn\'t navigate on touch in `list` mode', async ({ page, fixture }) => {
		await fixture('list', '#1');
		const width = await page.evaluate(() => window.innerWidth);

		await page.touchscreen.tap(Math.round(width * 0.75), 300);
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
		await expect(page.locator('[id="2"]')).not.toHaveClass(/active/);
	});

	test('doesn\'t navigate when touching an interactive element', async ({ page, fixture }) => {
		await fixture('list-default-prevented', '#1');

		const button = page.locator('#default-prevented-button');
		const box = await button.boundingBox();

		await page.touchscreen.tap(
			Math.round(box.x + box.width / 2),
			Math.round(box.y + box.height / 2),
		);

		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	test('exits full mode on three-finger touch', async ({ browserName, page, fixture }) => {
		test.skip(browserName === 'webkit', 'WebKit does not support the Touch constructor');

		await fixture('full', '#2');
		await expect(page.locator('.shower')).toHaveClass(/full/);

		// Dispatch synthetic 3-finger touchstart + touchend
		await page.evaluate(() => {
			const el = document.body;

			const makeTouches = (coords) =>
				coords.map((t, i) =>
					new Touch({
						identifier: i,
						target: el,
						clientX: t.x,
						clientY: t.y,
					}),
				);

			const startTouches = makeTouches([
				{ x: 200, y: 300 },
				{ x: 300, y: 300 },
				{ x: 400, y: 300 },
			]);

			el.dispatchEvent(
				new TouchEvent('touchstart', {
					bubbles: true,
					cancelable: true,
					touches: startTouches,
					targetTouches: startTouches,
					changedTouches: startTouches,
				}),
			);

			document.querySelector('.shower').dispatchEvent(
				new TouchEvent('touchend', {
					bubbles: true,
					cancelable: true,
					touches: [],
					targetTouches: [],
					changedTouches: startTouches,
				}),
			);
		});

		await expect(page.locator('.shower')).toHaveClass(/list/);
	});
});
