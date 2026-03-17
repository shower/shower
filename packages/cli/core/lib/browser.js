import { join } from 'node:path';
import { homedir, platform } from 'node:os';
import { styleText } from 'node:util';
import {
	Browser,
	BrowserTag,
	detectBrowserPlatform,
	install,
	resolveBuildId,
	getInstalledBrowsers,
} from '@puppeteer/browsers';
import inquirer from 'inquirer';

function getCacheDir() {
	if (platform() === 'win32') {
		return join(process.env.LOCALAPPDATA || join(homedir(), 'AppData', 'Local'), 'shower');
	}

	return join(homedir(), '.cache', 'shower');
}

function shortenPath(fullPath) {
	const home = homedir();

	if (fullPath.startsWith(home)) {
		return '~' + fullPath.slice(home.length);
	}

	return fullPath;
}

const CACHE_DIR = getCacheDir();

async function getInstalledChrome() {
	const installed = await getInstalledBrowsers({ cacheDir: CACHE_DIR });

	return installed
		.filter((b) => b.browser === Browser.CHROME)
		.sort((a, b) => b.buildId.localeCompare(a.buildId, undefined, { numeric: true }))[0];
}

async function downloadChrome() {
	const platform = detectBrowserPlatform();
	const buildId = await resolveBuildId(Browser.CHROME, platform, BrowserTag.STABLE);

	process.stdout.write(
		styleText('yellow', `◌ Downloading PDF engine…\n`)
	);

	const installed = await install({
		browser: Browser.CHROME,
		buildId,
		cacheDir: CACHE_DIR,
		downloadProgressCallback: makeProgressCallback(),
	});

	process.stdout.write(
		`\x1b[1A\x1b[2K${styleText('green', `✔ PDF engine downloaded`)}\n`
	);

	return installed;
}

function makeProgressCallback() {
	let lastPercent = -1;

	return (downloadedBytes, totalBytes) => {
		const percent = Math.round((downloadedBytes / totalBytes) * 100);

		if (percent !== lastPercent) {
			lastPercent = percent;
			process.stdout.write(`\x1b[1A\x1b[2K`);
			process.stdout.write(
				styleText('yellow', `◌ Downloading PDF engine… ${percent}%\n`)
			);
		}
	};
}

export async function ensureBrowser() {
	const installed = await getInstalledChrome();

	if (installed) {
		return installed.executablePath;
	}

	process.stdout.write(
		`PDF engine is required for PDF export\n` +
		`It will be downloaded to ${styleText('bold', shortenPath(CACHE_DIR))} (~200 MB)\n\n`
	);

	const { confirm } = await inquirer.prompt({
		name: 'confirm',
		type: 'confirm',
		default: true,
		message: 'Download PDF engine?',
	});

	if (!confirm) {
		process.exit(0);
	}

	process.stdout.write('\n');

	const browser = await downloadChrome();

	return browser.executablePath;
}
