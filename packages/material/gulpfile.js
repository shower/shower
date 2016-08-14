const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const gulp = require('gulp');
const header = require('gulp-header');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const sync = require('browser-sync').create();

// Server

gulp.task('default', ['styles'], () => {
	sync.init({
		ui: false,
		notify: false,
		server: {
			baseDir: '.'
		}
	});

	gulp.watch('styles/**/*.scss', ['styles']);
	gulp.watch('index.html').on('change', sync.reload);
});

// Styles

const ratios = ['16/10', '4/3'];
const pkg = require('./package.json');
const banner = `/**
 * ${ pkg.description }
 * ${ pkg.name } v${ pkg.version }, ${ pkg.homepage }
 * @copyright 2010–${ new Date().getFullYear() } ${ pkg.author.name }, ${ pkg.author.url }
 * @license ${ pkg.license }
 */
`;

gulp.task('styles', () => {
	ratios.forEach((ratio) => {
		return gulp.src('styles/screen.scss')
			.pipe(replace('[RATIO]', ratio))
			.pipe(sass().on('error', sass.logError))
			.pipe(postcss([
				autoprefixer({
					browsers: [
						'> 1%',
						'last 2 versions',
						'Firefox ESR',
						'iOS >= 8',
					]
				}),
				csso
			]))
			.pipe(header(banner, { pkg: pkg }))
			.pipe(rename((path) => {
				path.basename += `-${ ratio.replace('/', 'x') }`;
			}))
			.pipe(gulp.dest('styles'))
			.pipe(sync.stream());
	});
});
