import { copyFile, readFile, writeFile, readdir, mkdir, rm, cp } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { execSync } from 'node:child_process';

const root = import.meta.dirname;
const packages = resolve(root, '../packages');
const dist = resolve(root, 'dist');

async function listFiles(dir) {
	const entries = await readdir(dir, { withFileTypes: true, recursive: true });
	return entries
		.filter((entry) => entry.isFile())
		.map((entry) => join(entry.parentPath, entry.name));
}

async function copyTree(srcDir, destDir, { exclude = [], replacements = [] } = {}) {
	const files = await listFiles(srcDir);

	for (const srcPath of files) {
		const relPath = srcPath.slice(srcDir.length + 1);

		if (exclude.some((ex) => relPath === ex || relPath.startsWith(ex + '/'))) {
			continue;
		}

		const destPath = join(destDir, relPath);
		await mkdir(dirname(destPath), { recursive: true });

		const buffer = await readFile(srcPath);
		const isBinary = buffer.includes(0x00);

		if (!isBinary && replacements.length > 0) {
			let content = buffer.toString();
			for (const [search, replace] of replacements) {
				content = content.replaceAll(search, replace);
			}
			await writeFile(destPath, content);
		} else {
			await writeFile(destPath, buffer);
		}
	}
}

// Clean
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

// Shower presentation files with rewritten paths
await copyTree(join(packages, 'shower'), dist, {
	exclude: [
		'package.json', 'node_modules',
		'slides', 'slides.zip', 'CHANGELOG.md',
	],
	replacements: [
		['node_modules/@shower/ribbon', 'shower/themes/ribbon'],
		['node_modules/@shower/core/dist', 'shower'],
	],
});

// Core engine
await mkdir(join(dist, 'shower'), { recursive: true });
await copyFile(
	join(packages, 'core/dist/index.js'),
	join(dist, 'shower/index.js'),
);

// Themes
for (const theme of ['material', 'ribbon']) {
	await copyTree(join(packages, theme), join(dist, 'shower/themes', theme), {
		exclude: [
			'package.json', 'node_modules',
			'CHANGELOG.md', 'source',
		],
		replacements: [
			['../core/dist', '../..'],
		],
	});
}

// ZIP archive
execSync('zip -rq shower.zip . -x shower.zip', { cwd: dist });

// Site assets
await cp(join(root, 'icons'), join(dist, 'icons'), { recursive: true });
await copyFile(join(root, 'manifest.json'), join(dist, 'manifest.json'));

// Inject PWA meta tags into HTML
const metaTags = [
	'<link rel="canonical" href="https://shwr.me/">',
	'<link rel="me" href="https://mastodon.social/@shower_me">',
	'<link rel="manifest" href="/manifest.json">',
	'<link rel="icon" type="image/png" sizes="16x16" href="/icons/16.png">',
	'<link rel="icon" type="image/png" sizes="32x32" href="/icons/32.png">',
	'<link rel="icon" type="image/png" sizes="160x160" href="/icons/160.png">',
	'<link rel="icon" type="image/svg+xml" sizes="any" href="/icons/any.svg">',
	'<link rel="apple-touch-icon" href="/icons/228.png">',
].join('\n\t');

const htmlFiles = (await listFiles(dist)).filter((f) => f.endsWith('.html'));
for (const htmlPath of htmlFiles) {
	let content = await readFile(htmlPath, 'utf-8');
	content = content.replace(
		/(<meta name="viewport" content=".*?">)/,
		`$1\n\t${metaTags}`,
	);
	await writeFile(htmlPath, content);
}

console.log('Build complete: dist/');
