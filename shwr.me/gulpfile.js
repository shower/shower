const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const merge = require('merge-stream');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const rsync = require('gulp-rsync');
const sequence = require('run-sequence');
const zip = require('gulp-zip');

gulp.task('prepare', () => {

	const shower = gulp.src([
			'**', '!package.json'
		], {
			cwd: 'node_modules/shower'
		})
		.pipe(replace(
			/(<link rel="stylesheet" href=")(node_modules\/shower-ribbon\/)(styles\/screen-16x10.css">)/g,
			'$1shower/themes/ribbon/$3', { skipBinary: true }
		))
		.pipe(replace(
			/(<script src=")(node_modules\/shower-core\/)(shower.min.js"><\/script>)/g,
			'$1shower/$3', { skipBinary: true }
		));

	const core = gulp.src([
			'shower.min.js'
		], {
			cwd: 'node_modules/shower-core'
		})
		.pipe(rename( (path) => {
			path.dirname = 'shower/' + path.dirname;
		}));

	const material = gulp.src([
			'**', '!package.json'
		], {
			cwd: 'node_modules/shower-material'
		})
		.pipe(rename( (path) => {
			path.dirname = 'shower/themes/material/' + path.dirname;
		}))

	const ribbon = gulp.src([
			'**', '!package.json'
		], {
			cwd: 'node_modules/shower-ribbon'
		})
		.pipe(rename( (path) => {
			path.dirname = 'shower/themes/ribbon/' + path.dirname;
		}));

	const themes = merge(material, ribbon)
		.pipe(replace(
			/(<script src=")(\/shower-core\/)(shower.min.js"><\/script>)/,
			'$1../../$3', { skipBinary: true }
		));

	return merge(shower, core, themes)
		.pipe(gulp.dest('dest'))
		.pipe(zip('shower.zip'))
		.pipe(gulp.dest('dest'));

});

gulp.task('deploy', () => {

	return gulp.src('dest/**')
		.pipe(replace(
			/(<\/body>)/,
			'\t' + fs.readFileSync('counter.html', 'utf8') + '\n$1', { skipBinary: true }
		))
		.pipe(gulp.dest('dest'))
		.pipe(rsync({
			root: 'dest',
			hostname: 'shwr.me',
			destination: 'shwr.me',
			recursive: true,
			clean: true,
			incremental: true,
			silent: true
		}));

});

gulp.task('clean', () => {
	return del('dest/**');
});

gulp.task('default', (callback) => {
	sequence(
		'prepare',
		'deploy',
		'clean', callback
	)
});
