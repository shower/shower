'use strict';

const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({
		headless: true,
		ignoreHTTPSErrors: true,
		args: [
			'--disable-gpu',
			'--no-sandbox',
			'--disable-setuid-sandbox'
		],
	})
	const page = await browser.newPage()
	await page.goto(`file:${path.join(__dirname, 'index.html')}`)

	await page.setViewport({
		width: 1024,
		height: 576
	})

	const dimensions = await page.evaluate(() => {
		const slide = document.querySelector('.slide')
		return {
			width: slide.clientWidth,
			height: slide.clientHeight
		};
	});

	await page.pdf({
		path: 'prepared/index.pdf',
		width: `${dimensions.width}px`,
		height: `${dimensions.height}px`
	});

	await browser.close();
})()
