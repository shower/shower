'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const insert = require('gulp-insert');
const lintspaces = require('gulp-lintspaces');
const mocha = require('gulp-mocha-phantomjs');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const pkg = require('./package.json');
const now = new Date().getFullYear();
const banner = `/**
 * ${pkg.description}
 * ${pkg.name} v${pkg.version}, ${pkg.homepage}
 * @copyright 2010-${now} ${pkg.author.name}, ${pkg.author.url}
 * @license ${pkg.license}
 */
`;

gulp.task('lint:ec', () => {
    const sources = [
        '!.DS_Store',
        '!{.git,node_modules}/**',
        '!{dist,tests_output}/**',
        '**',
    ];

    const options = {
        editorconfig: '.editorconfig',
        ignores: [
            'js-comments',
            'html-comments',
        ],
    };

    return gulp.src(sources, { dot: true })
        .pipe(lintspaces(options))
        .pipe(lintspaces.reporter());
});

gulp.task('lint:js', () => {
    return gulp.src('lib/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('concat:lib', () => {
    return gulp.src([
        // Module system.
        'node_modules/ym/modules.js',

        // Core.
        'lib/init.js',
        'lib/shower.js',
        'lib/**/*.js',

        // Plugins.
        'node_modules/shower-*/shower-*.js',
    ])
    .pipe(concat('shower.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('concat:test', () => {
    return gulp.src('tests/unit/**/*.js')
        .pipe(concat('shower.test.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('minify', [ 'concat:lib' ], () => {
    return gulp.src('dist/shower.js')
        .pipe(uglify({ mangle: false }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(insert.prepend(banner))
        .pipe(gulp.dest('dist'));
});

gulp.task('mocha', [ 'concat:test' ], () => {
    return gulp.src('tests/unit/unit.html')
        .pipe(mocha());
});

gulp.task('lint', [
    'lint:ec',
    'lint:js',
]);

gulp.task('dev', [
    'lint',
    'concat:lib',
]);

gulp.task('build', [
    'lint',
    'minify',
]);

gulp.task('unit', [
    'lint',
    'mocha',
]);

gulp.task('default', [
    'build',
]);
