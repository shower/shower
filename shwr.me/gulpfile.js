var gulp = require('gulp'),
	merge = require('merge-stream'),
	rename = require('gulp-rename'),
	replace = require('gulp-replace');

gulp.task('default', function() {

	var shower = gulp.src([
			'node_modules/shower/**', '!package.json'
		])
		.pipe(replace(
			/(<link rel="stylesheet" href=")(node_modules\/shower-ribbon\/)(styles\/screen-16x10.css">)/g,
			'$1shower/themes/ribbon/$3', { skipBinary: true }
		))
		.pipe(replace(
			/(<script src=")(node_modules\/shower-core\/)(shower.min.js"><\/script>)/g,
			'$1shower/$3', { skipBinary: true }
		));

	var core = gulp.src([
			'shower.min.js'
		], {
			cwd: 'node_modules/shower-core'
		})
		.pipe(rename(function (path) {
			path.dirname = 'shower/' + path.dirname;
		}));

	var material = gulp.src([
			'**', '!package.json'
		], {
			cwd: 'node_modules/shower-material'
		})
		.pipe(rename(function (path) {
			path.dirname = 'shower/themes/material/' + path.dirname;
		}))

	var ribbon = gulp.src([
			'**', '!package.json'
		], {
			cwd: 'node_modules/shower-ribbon'
		})
		.pipe(rename(function (path) {
			path.dirname = 'shower/themes/ribbon/' + path.dirname;
		}));

	var themes = merge(material, ribbon)
		.pipe(replace(
			/(<script src=")(\/shower-core\/)(shower.min.js"><\/script>)/,
			'$1../../$3', { skipBinary: true }
		));

	return merge(shower, core, themes)
		.pipe(gulp.dest('dest'));

});
