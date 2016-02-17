'use strict';

var autoprefixer = require('gulp-autoprefixer'),
	cssmin = require('gulp-cleancss'),
	gulp = require('gulp'),
	header = require('gulp-header'),
	sass = require('gulp-sass'),
	sync = require('browser-sync').create();

// Banner

var pkg = require('./package.json');
var banner = `/**
 * ${ pkg.description }
 * ${ pkg.name } v${ pkg.version }, ${ pkg.homepage }
 * @copyright 2010–${ new Date().getFullYear() } ${ pkg.author.name }, ${ pkg.author.url }
 * @license ${ pkg.license }
 */
`;

// Server

gulp.task('default', ['styles'], function() {
	sync.init({
		ui: false,
		notify: false,
		server: {
			baseDir: '.',
			routes: {
				'/shower-core': '../shower-core'
			}
		}
	});

	gulp.watch('styles/**/*.scss', ['styles']);
	gulp.watch('index.html').on('change', sync.reload);
});

// Styles

gulp.task('styles', function () {
	return gulp.src('styles/screen-*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssmin())
		.pipe(header(banner, { pkg: pkg }))
		.pipe(gulp.dest('styles'))
		.pipe(sync.stream());
});
