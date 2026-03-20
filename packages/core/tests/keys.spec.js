import { test, expect } from './helpers.js';

test.describe('keys', () => {
	// --- Forward ---

	test('activates the first slide in `list` mode if Right Arrow key is pressed', async ({ page, fixture }) => {
		await fixture('list');
		await page.keyboard.press('ArrowRight');
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	test('moves forward when Right Arrow key is pressed', async ({ page, fixture }) => {
		await fixture('list-id', '#1');

		await page.keyboard.press('ArrowRight');
		await expect(page.locator('[id="1"]')).toHaveClass(/visited/);
		await expect(page.locator('[id="1"]')).not.toHaveClass(/active/);
		await expect(page.locator('#id')).toHaveClass(/active/);
		await expect(page.locator('#id')).not.toHaveClass(/visited/);

		await page.keyboard.press('ArrowRight');
		await expect(page.locator('#id')).toHaveClass(/visited/);
		await expect(page.locator('#id')).not.toHaveClass(/active/);
		await expect(page.locator('[id="3"]')).toHaveClass(/active/);
		await expect(page.locator('[id="3"]')).not.toHaveClass(/visited/);
	});

	test('moves forward when Down Arrow key is pressed', async ({ page, fixture }) => {
		await fixture('list', '#1');
		await page.keyboard.press('ArrowDown');
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
	});

	test('moves forward when Page Down key is pressed', async ({ page, fixture }) => {
		await fixture('list', '#1');
		await page.keyboard.press('PageDown');
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
	});

	test('moves forward when J key is pressed', async ({ page, fixture }) => {
		await fixture('list', '#1');
		await page.keyboard.press('j');
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
	});

	test('moves forward when L key is pressed', async ({ page, fixture }) => {
		await fixture('list', '#1');
		await page.keyboard.press('l');
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
	});

	test('moves forward when N key is pressed', async ({ page, fixture }) => {
		await fixture('list', '#1');
		await page.keyboard.press('n');
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
	});

	test('moves forward when Enter key is pressed', async ({ page, fixture }) => {
		await fixture('list', '#1');
		await page.keyboard.press('Enter');
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
	});

	test('moves forward when Space key is pressed in `full` mode', async ({ page, fixture }) => {
		await fixture('full', '#1');
		await page.keyboard.press('Space');
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
	});

	test('doesn\'t move forward when Space key is pressed in `list` mode', async ({ page, fixture }) => {
		await fixture('list', '#1');
		await page.keyboard.press('Space');
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	// --- Backward ---

	test('moves backward when Left Arrow key is pressed', async ({ page, fixture }) => {
		await fixture('list-id', '#3');

		await page.keyboard.press('ArrowLeft');
		await expect(page.locator('[id="3"]')).toHaveClass(/visited/);
		await expect(page.locator('[id="3"]')).not.toHaveClass(/active/);
		await expect(page.locator('#id')).toHaveClass(/active/);
		await expect(page.locator('#id')).not.toHaveClass(/visited/);

		await page.keyboard.press('ArrowLeft');
		await expect(page.locator('#id')).toHaveClass(/visited/);
		await expect(page.locator('#id')).not.toHaveClass(/active/);
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
		await expect(page.locator('[id="1"]')).not.toHaveClass(/visited/);
	});

	test('moves backward when Up Arrow key is pressed', async ({ page, fixture }) => {
		await fixture('list', '#2');
		await page.keyboard.press('ArrowUp');
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	test('moves backward when Page Up key is pressed', async ({ page, fixture }) => {
		await fixture('list', '#2');
		await page.keyboard.press('PageUp');
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	test('moves backward when Backspace key is pressed', async ({ page, fixture }) => {
		await fixture('list', '#2');
		await page.keyboard.press('Backspace');
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	test('moves backward when K key is pressed', async ({ page, fixture }) => {
		await fixture('list', '#2');
		await page.keyboard.press('k');
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	test('moves backward when H key is pressed', async ({ page, fixture }) => {
		await fixture('list', '#2');
		await page.keyboard.press('h');
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	test('moves backward when P key is pressed', async ({ page, fixture }) => {
		await fixture('list', '#2');
		await page.keyboard.press('p');
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	test('moves backward when Shift+Enter keys are pressed in `list` mode', async ({ page, fixture }) => {
		await fixture('list', '#2');
		await page.keyboard.press('Shift+Enter');
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	test('moves backward when Shift+Enter keys are pressed in `full` mode', async ({ page, fixture }) => {
		await fixture('full', '#2');
		await page.keyboard.press('Shift+Enter');
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	test('doesn\'t move backward when Shift+Space keys are pressed in `list` mode', async ({ page, fixture }) => {
		await fixture('list', '#2');
		await page.keyboard.press('Shift+Space');
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
	});

	test('moves backward when Shift+Space keys are pressed in `full` mode', async ({ page, fixture }) => {
		await fixture('full', '#2');
		await page.keyboard.press('Shift+Space');
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	// --- Jump ---

	test('goes to first slide when Home key is pressed', async ({ page, fixture }) => {
		await fixture('list', '#3');
		await page.keyboard.press('Home');
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	test('goes to last slide when End key is pressed', async ({ page, fixture }) => {
		await fixture('list', '#1');
		await page.keyboard.press('End');
		await expect(page.locator('[id="3"]')).toHaveClass(/active/);
	});

	// --- Boundary ---

	test('does not move past the last slide', async ({ page, fixture }) => {
		await fixture('list', '#3');
		await page.keyboard.press('ArrowRight');
		await expect(page.locator('[id="3"]')).toHaveClass(/active/);
	});

	test('does not move before the first slide', async ({ page, fixture }) => {
		await fixture('list', '#1');
		await page.keyboard.press('ArrowLeft');
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});

	test('goes back to previous slide with one press after multiple forward presses past the last slide', async ({ page, fixture }) => {
		await fixture('full', '#3');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await expect(page.locator('[id="3"]')).toHaveClass(/active/);

		await page.keyboard.press('ArrowLeft');
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
	});

	test('goes back to previous slide with one press after multiple forward presses past the last slide in `list` mode', async ({ page, fixture }) => {
		await fixture('list', '#3');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await expect(page.locator('[id="3"]')).toHaveClass(/active/);

		await page.keyboard.press('ArrowLeft');
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
	});

	test('goes back to previous slide with one press after multiple forward presses past the last slide with inner steps', async ({ page, fixture }) => {
		await fixture('full-next', '#3');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.press('ArrowRight');
		await expect(page.locator('[id="3"]')).toHaveClass(/active/);

		await page.keyboard.press('ArrowLeft');
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
	});

	// --- State classes ---

	test('changes slides states when moving forward and backward', async ({ page, fixture }) => {
		await fixture('list-id', '#1');

		await page.keyboard.press('ArrowRight');
		await expect(page.locator('[id="1"]')).toHaveClass(/visited/);
		await expect(page.locator('[id="1"]')).not.toHaveClass(/active/);
		await expect(page.locator('#id')).toHaveClass(/active/);
		await expect(page.locator('#id')).not.toHaveClass(/visited/);

		await page.keyboard.press('ArrowLeft');
		await expect(page.locator('#id')).toHaveClass(/visited/);
		await expect(page.locator('#id')).not.toHaveClass(/active/);
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
		await expect(page.locator('[id="1"]')).toHaveClass(/visited/);
	});

	// --- Interactive element filter ---

	test('doesn\'t navigate when focus is on an interactive element', async ({ page, fixture }) => {
		await fixture('list-default-prevented', '#1');
		await page.locator('#default-prevented-button').focus();
		await page.keyboard.press('ArrowRight');
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
		await expect(page.locator('[id="1"]')).not.toHaveClass(/visited/);
	});

	// --- Mode change ---

	test('starts presentation from the current slide when Shift+F5 keys are pressed', async ({ page, fixture }) => {
		await fixture('list', '#2');
		await page.keyboard.press('Shift+F5');
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
		await expect(page.locator('.shower')).toHaveClass(/full/);
	});

	test('starts presentation from the first slide when Meta+Shift+Enter keys are pressed', async ({ page, fixture }) => {
		await fixture('list', '#2');
		await page.evaluate(() => {
			document.body.dispatchEvent(
				new KeyboardEvent('keydown', {
					bubbles: true,
					key: 'Enter',
					shiftKey: true,
					metaKey: true,
				}),
			);
		});
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
		await expect(page.locator('.shower')).toHaveClass(/full/);
	});

	test('starts presentation from the current slide when Meta+Enter keys are pressed', async ({ page, fixture }) => {
		await fixture('list', '#2');
		await page.evaluate(() => {
			document.body.dispatchEvent(
				new KeyboardEvent('keydown', {
					bubbles: true,
					key: 'Enter',
					metaKey: true,
				}),
			);
		});
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
		await expect(page.locator('.shower')).toHaveClass(/full/);
	});

	test('starts presentation from the current slide when Meta+Alt+P keys are pressed', async ({ page, fixture }) => {
		await fixture('list', '#2');
		await page.evaluate(() => {
			document.body.dispatchEvent(
				new KeyboardEvent('keydown', {
					bubbles: true,
					key: 'p',
					metaKey: true,
					altKey: true,
				}),
			);
		});
		await expect(page.locator('[id="2"]')).toHaveClass(/active/);
		await expect(page.locator('.shower')).toHaveClass(/full/);
	});

	test('stops presentation when Escape key is pressed', async ({ page, fixture }) => {
		await fixture('full', '#1');
		await page.keyboard.press('Escape');
		await expect(page.locator('.shower')).toHaveClass(/list/);
	});

	// --- Shift force-navigation (skips .next steps) ---

	test('Shift+ArrowRight skips all inner steps and moves to next slide', async ({ page, fixture }) => {
		await fixture('full-next', '#2');
		const slide = page.locator('[id="2"]');

		await page.keyboard.press('Shift+ArrowRight');
		await expect(page.locator('[id="3"]')).toHaveClass(/active/);
		await expect(slide.locator('.a.next')).not.toHaveClass(/active/);
		await expect(slide.locator('.b.next')).not.toHaveClass(/active/);
		await expect(slide.locator('.c.next')).not.toHaveClass(/active/);
	});

	test('Shift+ArrowLeft skips all inner steps and moves to previous slide', async ({ page, fixture }) => {
		await fixture('full-next', '#2');
		const slide = page.locator('[id="2"]');

		// first step into the next items
		await page.keyboard.press('ArrowRight');
		await expect(slide.locator('.a.next')).toHaveClass(/active/);

		// Shift+Left should force-move to previous slide, not undo a step
		await page.keyboard.press('Shift+ArrowLeft');
		await expect(page.locator('[id="1"]')).toHaveClass(/active/);
	});
});
