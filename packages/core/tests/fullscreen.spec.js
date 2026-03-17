import { test, expect } from './helpers.js';

test.describe('fullscreen', () => {
	test('enters native fullscreen when F key is pressed', async ({ page, fixture }) => {
		await fixture('list', '#1');

		const fullscreenRequested = await page.evaluate(() => {
			let called = false;
			document.documentElement.requestFullscreen = () => {
				called = true;
				return Promise.resolve();
			};
			return new Promise((resolve) => {
				document.querySelector('.shower').dispatchEvent(
					new KeyboardEvent('keydown', {
						bubbles: true,
						key: 'f',
					}),
				);
				setTimeout(() => resolve(called), 50);
			});
		});

		expect(fullscreenRequested).toBe(true);
	});

	test('exits native fullscreen when F key is pressed while in fullscreen', async ({ page, fixture }) => {
		await fixture('list', '#1');

		const fullscreenExited = await page.evaluate(() => {
			let exitCalled = false;

			// Simulate being in fullscreen
			Object.defineProperty(document, 'fullscreenElement', {
				get: () => document.documentElement,
				configurable: true,
			});

			document.exitFullscreen = () => {
				exitCalled = true;
				return Promise.resolve();
			};

			document.querySelector('.shower').dispatchEvent(
				new KeyboardEvent('keydown', {
					bubbles: true,
					key: 'f',
				}),
			);

			return exitCalled;
		});

		expect(fullscreenExited).toBe(true);
	});

	test('does not toggle fullscreen when F key is pressed with Ctrl modifier', async ({ page, fixture }) => {
		await fixture('list', '#1');

		const fullscreenRequested = await page.evaluate(() => {
			let called = false;
			document.documentElement.requestFullscreen = () => {
				called = true;
				return Promise.resolve();
			};
			document.querySelector('.shower').dispatchEvent(
				new KeyboardEvent('keydown', {
					bubbles: true,
					key: 'f',
					ctrlKey: true,
				}),
			);
			return called;
		});

		expect(fullscreenRequested).toBe(false);
	});

	test('does not toggle fullscreen when F key is pressed with Meta modifier', async ({ page, fixture }) => {
		await fixture('list', '#1');

		const fullscreenRequested = await page.evaluate(() => {
			let called = false;
			document.documentElement.requestFullscreen = () => {
				called = true;
				return Promise.resolve();
			};
			document.querySelector('.shower').dispatchEvent(
				new KeyboardEvent('keydown', {
					bubbles: true,
					key: 'f',
					metaKey: true,
				}),
			);
			return called;
		});

		expect(fullscreenRequested).toBe(false);
	});

	test('does not toggle fullscreen when F key is pressed with Alt modifier', async ({ page, fixture }) => {
		await fixture('list', '#1');

		const fullscreenRequested = await page.evaluate(() => {
			let called = false;
			document.documentElement.requestFullscreen = () => {
				called = true;
				return Promise.resolve();
			};
			document.querySelector('.shower').dispatchEvent(
				new KeyboardEvent('keydown', {
					bubbles: true,
					key: 'f',
					altKey: true,
				}),
			);
			return called;
		});

		expect(fullscreenRequested).toBe(false);
	});

	test('does not toggle fullscreen when focus is on an interactive element', async ({ page, fixture }) => {
		await fixture('list-default-prevented', '#1');

		const fullscreenRequested = await page.evaluate(() => {
			let called = false;
			document.documentElement.requestFullscreen = () => {
				called = true;
				return Promise.resolve();
			};

			const button = document.getElementById('default-prevented-button');
			button.focus();
			button.dispatchEvent(
				new KeyboardEvent('keydown', {
					bubbles: true,
					key: 'f',
				}),
			);
			return called;
		});

		expect(fullscreenRequested).toBe(false);
	});

	test('works with uppercase F key', async ({ page, fixture }) => {
		await fixture('list', '#1');

		const fullscreenRequested = await page.evaluate(() => {
			let called = false;
			document.documentElement.requestFullscreen = () => {
				called = true;
				return Promise.resolve();
			};
			document.querySelector('.shower').dispatchEvent(
				new KeyboardEvent('keydown', {
					bubbles: true,
					key: 'F',
				}),
			);
			return called;
		});

		expect(fullscreenRequested).toBe(true);
	});

	test('works in full mode', async ({ page, fixture }) => {
		await fixture('full', '#1');

		const fullscreenRequested = await page.evaluate(() => {
			let called = false;
			document.documentElement.requestFullscreen = () => {
				called = true;
				return Promise.resolve();
			};
			document.querySelector('.shower').dispatchEvent(
				new KeyboardEvent('keydown', {
					bubbles: true,
					key: 'f',
				}),
			);
			return called;
		});

		expect(fullscreenRequested).toBe(true);
	});
});
