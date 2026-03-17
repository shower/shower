import { cpSync, globSync, mkdirSync, readFileSync, writeFileSync, readdirSync, lstatSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);

function resolvePackageDir(pkg) {
	return dirname(require.resolve(`${pkg}/package.json`));
}

function copyWithGlobs(srcDir, destDir, patterns) {
	const resolvedDest = resolve(destDir);
	const resolvedSrc = resolve(srcDir);

	for (const file of globSync(patterns, { cwd: srcDir })) {
		const srcPath = join(resolvedSrc, file);
		const destPath = join(resolvedDest, file);

		// Skip directories — we only copy files; parent dirs are created via mkdirSync
		if (lstatSync(srcPath).isDirectory()) continue;

		// Skip if source is inside the destination (or is the destination itself)
		if (srcPath === resolvedDest || srcPath.startsWith(resolvedDest + sep)) continue;

		mkdirSync(dirname(destPath), { recursive: true });
		cpSync(srcPath, destPath);
	}
}

function rewriteHtmlPaths(dir) {
	const entries = readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		if (entry.isDirectory()) continue;
		if (!entry.name.endsWith('.html')) continue;

		const fullPath = join(dir, entry.name);
		let content = readFileSync(fullPath, 'utf-8');

		content = content.replace(
			/(<link\s+rel="stylesheet"\s+href=")(node_modules\/@shower\/)([^/]*)\/(.*\.css"\s*\/?>)/g,
			'$1shower/themes/$3/$4'
		);

		content = content.replace(
			/(<script[\s][^>]*src=")(node_modules\/@shower\/core\/dist\/)(index\.js")/g,
			'$1shower/$3'
		);

		writeFileSync(fullPath, content);
	}
}

async function copyThemeFiles(theme, destDir) {
	const themeDir = resolvePackageDir(`@shower/${theme}`);
	const themeDest = join(destDir, 'shower', 'themes', theme);
	const { default: { files: patterns = [] } } = await import(`@shower/${theme}/package.json`, { with: { type: 'json' } });

	for (const file of globSync(patterns, { cwd: themeDir })) {
		const src = join(themeDir, file);
		if (lstatSync(src).isDirectory()) continue;

		const dest = join(themeDest, file);
		mkdirSync(dirname(dest), { recursive: true });
		cpSync(src, dest);
	}
}

function getThemes(pkg) {
	const deps = { ...pkg.dependencies, ...pkg.devDependencies };

	return Object.keys(deps)
		.filter((name) => name.startsWith('@shower/') && name !== '@shower/core' && name !== '@shower/cli')
		.map((name) => name.replace('@shower/', ''));
}

async function copySlidesFiles(srcDir, destDir, files) {
	mkdirSync(destDir, { recursive: true });

	const pkgPath = join(srcDir, 'package.json');
	const { default: pkg } = await import(pathToFileURL(pkgPath), { with: { type: 'json' } });

	if (!files) {
		files = pkg.files;
	}

	if (!files) {
		throw new Error('No "files" field in package.json. List the files to bundle.');
	}

	copyWithGlobs(srcDir, destDir, files);

	rewriteHtmlPaths(destDir);

	// Copy @shower/core dist
	const coreDir = resolvePackageDir('@shower/core');
	const coreDest = join(destDir, 'shower');
	mkdirSync(coreDest, { recursive: true });
	cpSync(join(coreDir, 'dist', 'index.js'), join(coreDest, 'index.js'));

	// Copy theme files
	for (const theme of getThemes(pkg)) {
		await copyThemeFiles(theme, destDir);
	}
}

export { copySlidesFiles };
