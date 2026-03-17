import { rm } from 'node:fs/promises';
import { styleText } from 'node:util';
import path from 'node:path';

import { copySlidesFiles } from '../lib/slides.js';

async function handler ({ cwd, output, files }) {
	if (!path.isAbsolute(output)) {
		output = path.join(cwd, output);
	}

	await rm(output, { recursive: true, force: true });
	await copySlidesFiles(cwd, output, files);
}

function builder (yargs) {
	return yargs
		.options({
			output: {
				alias: 'o',
				type: 'string',
				default: 'slides',
				describe: 'In which folder will the bundled slides be written'
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
		start: 'Bundling slides',
		end: `Slides are bundled to ${styleText('bold', output)}`
	};
}

export { handler, builder, messages };
