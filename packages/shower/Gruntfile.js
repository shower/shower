module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		bump: {
			options: {
				files: ['package.json', 'bower.json'],
				commitFiles: ['package.json', 'bower.json'],
				pushTo: 'origin'
			}
		},
		copy: {
			prepare: {
				files: [{
					src: [
						'**',
						'!node_modules/**',
						'!bower_components/**',
						'!Contributing.md',
						'!Gruntfile.js',
						'!License.md',
						'!Readme.md',
						'!bower.json',
						'!package.json'
					],
					dest: 'temp/'
				},{
					expand: true,
					cwd: 'node_modules/shower-core/',
					src: [
						'**',
						'!package.json',
						'!Readme.md'
					],
					dest: 'temp/shower/'
				},{
					expand: true,
					cwd: 'node_modules/shower-ribbon/',
					src: [
						'**',
						'!package.json',
						'!Readme.md'
					],
					dest: 'temp/shower/themes/ribbon/'
				},{
					expand: true,
					cwd: 'node_modules/shower-bright/',
					src: [
						'**',
						'!package.json',
						'!Readme.md'
					],
					dest: 'temp/shower/themes/bright/'
				}]
			}
		},
		replace: {
			core: {
				src: 'temp/index.html',
				overwrite: true,
				replacements: [{
					from: /(node_modules|bower_components)\/shower-core/g,
					to: 'shower'
				},{
					from: /(node_modules|bower_components)\/shower-(ribbon|bright)/g,
					to: 'shower/themes/$2'
				}]
			},
			themes: {
				src: 'temp/shower/themes/*/index.html',
				overwrite: true,
				replacements: [{
					from: '../shower-core', to: '../..'
				}]
			}
		},
		'gh-pages': {
			options: {
				base: 'temp'
			},
			src: ['**']
		},
		clean: ['temp']
	});

	grunt.registerTask('publish', [
		'copy',
		'replace',
		'gh-pages',
		'clean'
	]);

};