'use strict';

const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const gulp = require('gulp');
const header = require('gulp-header');
const sass = require('gulp-sass');
const sync = require('browser-sync').create();

// Banner

const pkg = require('./package.json');
const banner = `/**
 * ${ pkg.description }
 * ${ pkg.name } v${ pkg.version }, ${ pkg.homepage }
 * @copyright 2010–${ new Date().getFullYear() } ${ pkg.author.name }, ${ pkg.author.url }
 * @license ${ pkg.license }
 */
`;

// Server

gulp.task('default', ['styles'], () => {
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

gulp.task('styles', () => {
	return gulp.src('styles/screen-*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(csso())
		.pipe(header(banner, { pkg: pkg }))
		.pipe(gulp.dest('styles'))
		.pipe(sync.stream());
});
