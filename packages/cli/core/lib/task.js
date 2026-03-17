import { styleText } from 'node:util';

export async function runTask(title, fn) {
	process.stdout.write(styleText('yellow', `⏳ ${title}…\n`));
	try {
		await fn();
		process.stdout.write(`\x1b[1A\x1b[2K${styleText('green', `✔ ${title}`)}\n`);
	} catch (error) {
		process.stdout.write(`\x1b[1A\x1b[2K${styleText('red', `✖ ${title}`)}\n`);
		throw error;
	}
}
