import { styleText } from 'node:util';
import vfs from 'vinyl-fs';
import zip from 'gulp-zip';

import { loadPresentationFiles } from '../lib/presentation.js';

function handler ({ output, files }) {
	const stream = loadPresentationFiles(files)
		.pipe(zip(output))
		.pipe(vfs.dest('.'));

	return new Promise((resolve, reject) => {
		stream
			.on('end', resolve)
			.on('error', reject);
	});
}

function builder (yargs) {
	return yargs
		.options({
			output: {
				alias: 'o',
				type: 'string',
				default: 'presentation.zip',
				describe: 'Archive name'
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
		start: 'The project is being archived',
		end: `Created archive ${styleText('bold', output)} with presentation`
	};
}

export { handler, builder, messages };
