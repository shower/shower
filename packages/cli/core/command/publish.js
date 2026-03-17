import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { promisify } from 'node:util';
import pages from 'gh-pages';

import { copyPresentationFiles } from '../lib/presentation.js';

async function handler ({ cwd, files }) {
	const tempDirPath = await mkdtemp(join(tmpdir(), 'shower-'));

	try {
		await copyPresentationFiles(cwd, tempDirPath, files);
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
