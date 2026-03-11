import gulp from 'gulp';
import merge from 'merge-stream';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import zip from 'gulp-zip';

const paths = {
	core: 'node_modules/@shower/core/dist',
	ribbon: 'node_modules/@shower/ribbon',
	material: 'node_modules/@shower/material',
	shower: 'node_modules/@shower/shower',
	dist: 'dist'
};

function processShower() {
	return gulp.src([
		'**',
		'!package.json',
		'!node_modules',
	], {
		cwd: paths.shower,
		encoding: false
	})
	.pipe(replace(
		paths.ribbon, 'shower/themes/ribbon/', { skipBinary: true }
	))
	.pipe(replace(
		paths.core, 'shower/', { skipBinary: true }
	));
}

function processCore() {
	return gulp.src(['index.js'], {
		cwd: paths.core,
		encoding: false
	})
	.pipe(rename((path) => {
		path.dirname = 'shower/' + path.dirname;
	}));
}

function processTheme(themePath, themeName) {
	return gulp.src([
		'**',
		'!package.json',
		'!node_modules',
	], {
		cwd: themePath,
		encoding: false
	})
	.pipe(rename((path) => {
		path.dirname = `shower/themes/${themeName}/` + path.dirname;
	}));
}

function processThemes() {
	const material = processTheme(paths.material, 'material');
	const ribbon = processTheme(paths.ribbon, 'ribbon');

	return merge(material, ribbon)
	.pipe(replace(
		paths.core, '../../', { skipBinary: true }
	));
}

gulp.task('themes', () => {
	const shower = processShower();
	const core = processCore();
	const themes = processThemes();

	return merge(shower, core, themes)
		.pipe(gulp.dest(paths.dist))
		.pipe(zip('shower.zip'))
		.pipe(gulp.dest(paths.dist));
});

gulp.task('assets', () => {
	const files = gulp.src([
		'icons{,/**}',
		'manifest.json',
	], {
		encoding: false
	});

	const html = gulp.src('dist/**/*.html')
		.pipe(replace(
			/(<meta name="viewport" content=".*">)/,
			`$1
	<link rel="manifest" href="/manifest.json">
	<link rel="icon" type="image/png" sizes="16x16" href="/icons/16.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/icons/32.png">
	<link rel="icon" type="image/png" sizes="160x160" href="/icons/160.png">
	<link rel="icon" type="image/svg+xml" sizes="any" href="/icons/any.svg">
	<link rel="apple-touch-icon" href="/icons/228.png">`, { skipBinary: true }
		));

	return merge(files, html)
	.pipe(gulp.dest(paths.dist));
});

gulp.task('build', gulp.series(
	'themes',
	'assets',
));
