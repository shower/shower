import { createWriteStream } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { styleText } from 'node:util';
import { ZipArchive } from 'archiver';

import { handler as bundle } from './bundle.js';

async function handler ({ cwd, output, files }) {
	const bundlePath = await mkdtemp(join(tmpdir(), 'shower-'));

	try {
		await bundle({ cwd, output: bundlePath, files });

		await new Promise((resolve, reject) => {
			const archive = new ZipArchive({ zlib: { level: 9 } });
			const stream = createWriteStream(join(cwd, output));

			stream.on('close', resolve);
			stream.on('error', reject);
			archive.on('error', reject);

			archive.pipe(stream);
			archive.directory(bundlePath, false);
			archive.finalize();
		});
	} finally {
		await rm(bundlePath, { recursive: true, force: true });
	}
}

function builder (yargs) {
	return yargs
		.options({
			output: {
				alias: 'o',
				type: 'string',
				default: 'slides.zip',
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
		start: 'Archiving slides',
		end: `Slides are archived to ${styleText('bold', output)}`
	};
}

export { handler, builder, messages };
