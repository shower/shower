var gulp = require('gulp'),
	merge = require('merge-stream'),
	rename = require('gulp-rename'),
	replace = require('gulp-replace');

gulp.task('default', function() {

	var shower = gulp.src('node_modules/shower/**');

	var core = gulp.src('node_modules/shower-core/shower.min.js', { base: 'node_modules/shower-core' })
		.pipe(rename(function (path) {
			path.dirname = 'shower/' + path.dirname;
		}));

	var material = gulp.src('node_modules/shower-material/**')
		.pipe(rename(function (path) {
			path.dirname = 'shower/themes/material/' + path.dirname;
		}));

	var ribbon = gulp.src('node_modules/shower-ribbon/**')
		.pipe(rename(function (path) {
			path.dirname = 'shower/themes/ribbon/' + path.dirname;
		}));

	return merge(shower, core, material, ribbon)
		.pipe(gulp.dest('dest'));

});
