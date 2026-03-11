import vfs from 'vinyl-fs';
import merge from 'merge-stream';
import rename from 'gulp-rename';
import replace from 'gulp-replace';

const defaultFiles = [
	'**',
	'!node_modules{,/**}',
	'!bundled{,/**}',
	'!package.json',
	'!package-lock.json'
];

function getThemeFiles (theme) {
	return vfs.src([
		'**', '!package.json'
	], {
		cwd: `node_modules/@shower/${theme}`
	})
		.pipe(rename((path) => {
			path.dirname = `shower/themes/${theme}/${path.dirname}`;
		}));
}

function loadPresentationFiles (files = defaultFiles) {
	const presentations = vfs.src(files)
		.pipe(replace(
			/(<link\s+rel="stylesheet"\s+href=")(node_modules\/@shower\/)([^/]*)\/(.*\.css"\s*\/?>)/g,
			'$1shower/themes/$3/$4', { skipBinary: true }
		))
		.pipe(replace(
			/(<script src=")(node_modules\/@shower\/core\/dist\/)(index.js"><\/script>)/g,
			'$1shower/$3', { skipBinary: true }
		));

	const core = vfs.src([
		'index.js'
	], {
		cwd: 'node_modules/@shower/core/dist'
	})
		.pipe(rename((path) => {
			path.dirname = 'shower/' + path.dirname;
		}));

	return merge(presentations, core, getThemeFiles('material'), getThemeFiles('ribbon'));
}

export { loadPresentationFiles };
