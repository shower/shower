import { cpSync, globSync, mkdirSync, readFileSync, writeFileSync, readdirSync, lstatSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';

const require = createRequire(import.meta.url);

function resolvePackageDir(pkg) {
	return dirname(require.resolve(`${pkg}/package.json`));
}

const defaultExcludes = ['node_modules', 'bundled', 'package.json', 'package-lock.json'];

function copyFiltered(srcDir, destDir, excludes) {
	const entries = readdirSync(srcDir, { withFileTypes: true });

	for (const entry of entries) {
		if (excludes.includes(entry.name)) continue;

		const srcPath = join(srcDir, entry.name);
		const destPath = join(destDir, entry.name);

		if (entry.isDirectory()) {
			mkdirSync(destPath, { recursive: true });
			cpSync(srcPath, destPath, { recursive: true });
		} else {
			cpSync(srcPath, destPath);
		}
	}
}

function matchGlob(filePath, pattern) {
	let regex = pattern
		.replace(/[.+^$|\\]/g, '\\$&')
		.replace(/\{([^}]+)\}/g, (_, group) => `(${group.split(',').join('|')})`)
		.replace(/\*\*/g, '\0')
		.replace(/\*/g, '[^/]*')
		.replace(/\0/g, '.*');

	return new RegExp(`^${regex}$`).test(filePath);
}

function copyWithGlobs(srcDir, destDir, patterns) {
	const includes = [];
	const excludes = [];
	const resolvedDest = resolve(destDir);
	const resolvedSrc = resolve(srcDir);

	for (const pattern of patterns) {
		if (pattern.startsWith('!')) {
			excludes.push(pattern.slice(1));
		} else {
			includes.push(pattern);
		}
	}

	const matched = new Set();

	for (const pattern of includes) {
		for (const file of globSync(pattern, { cwd: srcDir })) {
			matched.add(file);
		}
	}

	for (const file of [...matched]) {
		for (const exc of excludes) {
			if (matchGlob(file, exc)) {
				matched.delete(file);
			}
		}
	}

	for (const file of matched) {
		const srcPath = join(resolvedSrc, file);
		const destPath = join(resolvedDest, file);

		// Skip directories — we only copy files; parent dirs are created via mkdirSync
		if (lstatSync(srcPath).isDirectory()) continue;

		// Skip if source is inside the destination (or is the destination itself)
		if (srcPath === resolvedDest || srcPath.startsWith(resolvedDest + '/')) continue;

		mkdirSync(dirname(destPath), { recursive: true });
		cpSync(srcPath, destPath);
	}
}

function rewriteHtmlPaths(dir) {
	const entries = readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = join(dir, entry.name);

		if (entry.isDirectory()) {
			rewriteHtmlPaths(fullPath);
			continue;
		}

		if (!entry.name.endsWith('.html')) continue;

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

function copyThemeFiles(theme, destDir) {
	const themeDir = resolvePackageDir(`@shower/${theme}`);
	const themeDest = join(destDir, 'shower', 'themes', theme);
	mkdirSync(themeDest, { recursive: true });
	cpSync(themeDir, themeDest, {
		recursive: true,
		filter: (src) => !src.endsWith('package.json'),
	});
}

function copyPresentationFiles(srcDir, destDir, files) {
	mkdirSync(destDir, { recursive: true });

	if (files) {
		copyWithGlobs(srcDir, destDir, files);
	} else {
		copyFiltered(srcDir, destDir, defaultExcludes);
	}

	rewriteHtmlPaths(destDir);

	// Copy @shower/core dist
	const coreDir = resolvePackageDir('@shower/core');
	const coreDest = join(destDir, 'shower');
	mkdirSync(coreDest, { recursive: true });
	cpSync(join(coreDir, 'dist', 'index.js'), join(coreDest, 'index.js'));

	// Copy theme files
	copyThemeFiles('material', destDir);
	copyThemeFiles('ribbon', destDir);
}

export { copyPresentationFiles };
