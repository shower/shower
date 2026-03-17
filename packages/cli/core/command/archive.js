import { createWriteStream } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { styleText } from 'node:util';
import archiver from 'archiver';

import { copyPresentationFiles } from '../lib/presentation.js';

async function handler ({ cwd, output, files }) {
	const tempDirPath = await mkdtemp(join(tmpdir(), 'shower-archive-'));

	try {
		await copyPresentationFiles(cwd, tempDirPath, files);

		await new Promise((resolve, reject) => {
			const archive = archiver('zip', { zlib: { level: 9 } });
			const stream = createWriteStream(join(cwd, output));

			stream.on('close', resolve);
			archive.on('error', reject);

			archive.pipe(stream);
			archive.directory(tempDirPath, false);
			archive.finalize();
		});
	} finally {
		await rm(tempDirPath, { recursive: true, force: true });
	}
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
		end: `Created archive ${styleText('bold', output)} with presentation`
	};
}

export { handler, builder, messages };
