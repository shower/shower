import chalk from 'chalk';
import puppeteer from 'puppeteer-core';
import { getPlatform } from 'chrome-launcher/dist/utils.js';
import * as chromeFinder from 'chrome-launcher/dist/chrome-finder.js';

function evalCalcExpression (value) {
	const expression = value
		.replace(/calc/g, '')
		.replace(/px/g, '');

	return eval(expression) + 'px';
}

async function handler ({ cwd, output }) {
	const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || (await (chromeFinder)[getPlatform()]())[0];
	if (!executablePath) {
		throw new Error('Chrome / Chromium is not installed or environment variable PUPPETEER_EXECUTABLE_PATH is not set');
	}
	let browser = await puppeteer.launch({ executablePath });
	let page = await browser.newPage();

	await page.goto(`file://${cwd}/index.html`);

	const [width, height] = await page.evaluate(async () => {
		const container = document.querySelector('.shower'); // eslint-disable-line no-undef

		const styles = window.getComputedStyle(container); // eslint-disable-line no-undef

		return [
			styles.getPropertyValue('--slide-width'),
			styles.getPropertyValue('--slide-height')
		];
	});

	await page.pdf({
		path: output,
		width: evalCalcExpression(width),
		height: evalCalcExpression(height)
	});

	browser.close();
}

function builder (yargs) {
	return yargs
		.options({
			output: {
				alias: 'o',
				type: 'string',
				default: 'index.pdf',
				describe: 'File name'
			}
		});
}

function messages ({ output }) {
	return {
		start: 'Creating PDF in progress',
		end: chalk`PDF built in {bold ${output}}`
	};
}

export { handler, builder, messages };
