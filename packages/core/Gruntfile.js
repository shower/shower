module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		uglify: {
			options: {
				mangle: true,
				banner: '/**\n * Shower HTML presentation engine: github.com/shower/shower\n * @copyright 2010–<%= grunt.template.today("yyyy") %> Vadim Makeev, pepelsbey.net\n * @license MIT license: github.com/shower/shower/wiki/MIT-License\n */\n'
			},
			build: {
				src: 'shower.js',
				dest: 'shower.min.js'
			}
		},
		connect: {
			ribbon: {
				options: {
					port: 7497
				}
			}
		},
		dalek: {
			options: {
				browser: ['chrome']
			},
			src: [
				'tests/*.js'
			]
		},
		bump: {
			options: {
				files: ['package.json', 'bower.json'],
				commitFiles: ['package.json', 'bower.json'],
				pushTo: 'origin'
			}
		}
	});

	grunt.registerTask('default', ['uglify']);
	grunt.registerTask('test', ['connect', 'dalek']);

};