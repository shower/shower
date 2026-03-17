import path from 'node:path';
import { styleText } from 'node:util';
import puppeteer from 'puppeteer-core';
import { ensureBrowser } from '../lib/browser.js';
import { runTask } from '../lib/task.js';

async function handler ({ cwd, output }) {
	if (!path.isAbsolute(output)) {
		output = path.join(cwd, output);
	}

	const executablePath = await ensureBrowser();

	await runTask('Printing slides', async () => {
		const browser = await puppeteer.launch({ executablePath });

		try {
			const page = await browser.newPage();

			await page.goto(`file://${cwd}/index.html`, {
				waitUntil: 'networkidle0',
			});

			const { width, height } = await page.evaluate(() => {
				const slide = document.querySelector('.slide');

				return {
					width: slide.offsetWidth,
					height: slide.offsetHeight,
				};
			});

			await page.pdf({
				path: output,
				width: `${width}px`,
				height: `${height}px`,
			});
		} finally {
			await browser.close();
		}
	});
}

function builder (yargs) {
	return yargs
		.options({
			output: {
				alias: 'o',
				type: 'string',
				default: 'slides.pdf',
				describe: 'File name'
			}
		});
}

function messages ({ output }) {
	return {
		end: `Slides are printed to ${styleText('bold', output)}`
	};
}

export { handler, builder, messages };
