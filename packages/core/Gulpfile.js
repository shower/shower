'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const insert = require('gulp-insert');
const jscs = require('gulp-jscs');
const mocha = require('gulp-mocha-phantomjs');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const webdriver = require('gulp-webdriver');

const pkg = require('./package.json');
const now = new Date().getFullYear();
const banner = `/**
 * ${pkg.description}
 * ${pkg.name} v${pkg.version}, ${pkg.homepage}
 * @copyright 2010-${now} ${pkg.author.name}, ${pkg.author.url}
 * @license ${pkg.license}
 */
`;

gulp.task('lint', () => {
    return gulp.src('lib/*.js')
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('concat:lib', () => {
    return gulp.src([
        // Module system.
        'node_modules/ym/modules.js',

        // Core.
        'lib/init.js',
        'lib/shower.js',
        'lib/*/*.js',

        // Plugins.
        'node_modules/shower-*/shower-*.js',
    ])
    .pipe(concat('shower.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('concat:test', () => {
    return gulp.src('tests/unit/test.*.js')
        .pipe(concat('tests.js'))
        .pipe(gulp.dest('tests/unit'));
});

gulp.task('minify', [ 'concat:lib' ], () => {
    return gulp.src('shower.js')
        .pipe(uglify({ mangle: false }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(insert.prepend(banner))
        .pipe(gulp.dest('.'));
});

gulp.task('webdriver', () => {
    return gulp.src('wdio.conf.js')
        .pipe(webdriver());
});

gulp.task('mocha', () => {
    return gulp.src('tests/unit/index.html')
        .pipe(mocha());
});

gulp.task('dev', [
    'lint',
    'concat:lib',
]);

gulp.task('build', [
    'lint',
    'concat:lib',
    'minify',
]);

gulp.task('test', [
    'lint',
    'test:unit',
    'test:func',
]);

gulp.task('test:func', [
    'webdriver',
]);

gulp.task('test:unit', [
    'concat:test',
    'mocha',
]);

gulp.task('default', [
    'build',
]);
