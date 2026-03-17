import { existsSync } from 'node:fs';
import { readFile, writeFile, rm, cp } from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { styleText } from 'node:util';
import { fileURLToPath } from 'node:url';

import inquirer from 'inquirer';

import { installDependencies } from '../lib/npm.js';
import { runTask } from '../lib/task.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function handler ({ cwd, directory: folderName = 'slides', yes: isDefault }) {
	// Let's check if such folder exists
	const directory = path.isAbsolute(folderName) ? folderName : path.join(cwd, folderName);

	if (existsSync(directory)) {
		const { isForce } = await inquirer.prompt({
			name: 'isForce',
			type: 'confirm',
			default: false,
			message: `The ${styleText('yellow', folderName)} dir already exists. Do you want to overwrite it?`
		});

		if (isForce) {
			await rm(directory, { recursive: true, force: true });
		} else {
			process.stdout.write(styleText('red', `\n Creating aborted\n`));

			return;
		}
	}

	const options = {
		template: 'presentation',
		year: (new Date()).getFullYear()
	};

	const defaultParams = {
		theme: 'ribbon',
		ratio: '16:9'
	};

	const params = [{
		name: 'theme',
		type: 'list',
		message: 'Select theme',
		choices: ['ribbon', 'material']
	}, {
		name: 'ratio',
		type: 'list',
		message: 'Select presentation ratio',
		choices: ['16:9', '4:3']
	}];

	if (isDefault) {
		Object.assign(options, defaultParams);
	} else {
		Object.assign(options, await inquirer.prompt(params));
	}

	options.ratio = options.ratio.replace(/:/, ' / ');

	process.stdout.write('\n');

	await runTask(`Creating project structure in "${folderName}" dir`, async () => {
		const templateDir = path.join(__dirname, '..', '..', 'templates', options.template);

		await cp(templateDir, directory, { recursive: true });

		// Apply template variables to index.html
		const indexPath = path.join(directory, 'index.html');
		let html = await readFile(indexPath, 'utf-8');
		html = html.replaceAll('<%= theme %>', options.theme);
		html = html.replaceAll('<%= ratio %>', options.ratio);
		html = html.replaceAll('<%= year %>', String(options.year));
		await writeFile(indexPath, html);
	});

	await runTask('Installing dependencies', () => Promise.all([
		installDependencies(directory, ['@shower/cli'], 'save-dev'),
		installDependencies(directory, ['@shower/core', `@shower/${options.theme}`])
	]));
}

function builder (yargs) {
	return yargs
		.options({
			yes: {
				alias: ['y'],
				default: false,
				type: 'boolean'
			}
		})
		.positional('directory', {
			default: 'slides',
			type: 'string'
		});
}

function messages ({ directory: folderName = 'slides' }) {
	return {
		end: `Project created in ${styleText('bold', folderName)} dir`
	};
}

export { handler, builder, messages };
