import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { promisify, styleText } from 'node:util';
import { fileURLToPath } from 'node:url';

import { deleteAsync } from 'del';
import vfs from 'vinyl-fs';
import inquirer from 'inquirer';
import template from 'gulp-template';

import { installDependencies } from '../lib/npm.js';
import { runTask } from '../lib/task.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function handler ({ cwd, directory: folderName = 'slides', yes: isDefault }) {
	// Let's check if such folder exists
	const directory = path.isAbsolute(folderName) ? folderName : path.join(cwd, folderName);

	if (fs.existsSync(directory)) {
		const { isForce } = await inquirer.prompt({
			name: 'isForce',
			type: 'confirm',
			default: false,
			message: `The ${styleText('yellow', folderName)} dir already exists. Do you want to overwrite it?`
		});

		if (isForce) {
			await deleteAsync([directory]);
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
		await promisify(fs.mkdir)(directory);

		await new Promise((resolve, reject) => {
			const files = ['**', '**/.*'];

			vfs.src(files, {
				cwd: path.join(__dirname, '..', '..', 'templates', options.template)
			})
				.pipe(template(options))
				.pipe(vfs.dest(directory))
				.on('end', resolve)
				.on('error', reject);
		});
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
