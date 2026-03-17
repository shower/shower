import { rm } from 'node:fs/promises';
import { styleText } from 'node:util';
import path from 'node:path';

import { copyPresentationFiles } from '../lib/presentation.js';

async function handler ({ cwd, output, files }) {
	if (!path.isAbsolute(output)) {
		output = path.join(cwd, output);
	}

	await rm(output, { recursive: true, force: true });
	await copyPresentationFiles(cwd, output, files);
}

function builder (yargs) {
	return yargs
		.options({
			output: {
				alias: 'o',
				type: 'string',
				default: 'bundled',
				describe: 'In which folder will the bundled presentation be written'
			},
			files: {
				alias: 'f',
				array: true,
				type: 'string',
				describe: 'List of files that will get the build'
			}
		});
}

function messages ({ output }) {
	return {
		start: 'Project bundling in progress',
		end: `Project bundled in ${styleText('bold', output)} dir`
	};
}

export { handler, builder, messages };
