import { mkdtemp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { styleText } from 'node:util';
import { execSync } from 'node:child_process';
import pages from 'gh-pages';

import { handler as bundle } from './bundle.js';

function getGitHubPagesUrl(cwd) {
	try {
		const remoteUrl = execSync('git config --get remote.origin.url', {
			cwd,
			encoding: 'utf-8',
			stdio: 'pipe',
		}).trim();

		// Handle SSH: git@github.com:user/repo.git
		const sshMatch = remoteUrl.match(/git@github\.com:([^/]+)\/(.+?)(?:\.git)?$/);
		if (sshMatch) {
			const [, user, repo] = sshMatch;
			return `https://${user}.github.io/${repo}/`;
		}

		// Handle HTTPS: https://github.com/user/repo.git
		const httpsMatch = remoteUrl.match(/https?:\/\/github\.com\/([^/]+)\/(.+?)(?:\.git)?$/);
		if (httpsMatch) {
			const [, user, repo] = httpsMatch;
			return `https://${user}.github.io/${repo}/`;
		}
	} catch {
		// Not a git repo or no remote configured
	}

	return null;
}

function publishPages(basePath, options) {
	return new Promise((resolve, reject) => {
		pages.publish(basePath, options, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

async function handler ({ cwd, files }) {
	const bundlePath = await mkdtemp(join(tmpdir(), 'shower-'));

	try {
		await bundle({ cwd, output: bundlePath, files });
		await publishPages(bundlePath, {
			dotfiles: false,
		});
	} finally {
		await rm(bundlePath, { recursive: true, force: true });
	}

	return { url: getGitHubPagesUrl(cwd) };
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

function messages (_options, result) {
	const url = result?.url;

	return {
		start: 'Publishing slides',
		end: url
			? `Slides are published to ${styleText('blue', url)}`
			: 'Slides are published'
	};
}

export { handler, builder, messages };
