import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { promisify } from 'node:util';
import vfs from 'vinyl-fs';
import pages from 'gh-pages';

import { loadPresentationFiles } from '../lib/presentation.js';

async function handler ({ files }) {
	const tempDirPath = await mkdtemp(join(tmpdir(), 'shower-'));

	try {
		await new Promise((resolve, reject) => {
			const stream = loadPresentationFiles(files)
				.pipe(vfs.dest(tempDirPath));

			stream
				.on('end', resolve)
				.on('error', reject);
		});

		await promisify(pages.publish)(tempDirPath);
	} finally {
		await rm(tempDirPath, { recursive: true, force: true });
	}
}

function builder (yargs) {
	return yargs
		.options({
			files: {
				alias: 'f',
				array: true,
				type: 'string',
				describe: 'List of files that will get the build'
			}
		});
}

function messages () {
	return {
		end: 'Project published'
	};
}

export { handler, builder, messages };
