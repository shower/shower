module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			compile: {
				files: {
					'styles/screen.css': 'styles/screen.scss'
				}
			}
		},
		autoprefixer: {
			prefix: {
				src: 'styles/screen.css'
			}
		},
		csso: {
			minify: {
				files: {
					'styles/screen.css' : 'styles/screen.css'
				},
				options: {
					banner: '/**\n * <%= pkg.description %>\n * <%= pkg.name %> v<%= pkg.version %>, <%= pkg.homepage %>\n * Copyright © 2010–<%= grunt.template.today("yyyy") %> Vadim Makeev, http://pepelsbey.net\n * Licensed under MIT license: github.com/shower/shower/wiki/MIT-License\n */\n'
				}
			}
		},
		watch: {
			styles: {
				files: 'styles/*.scss',
				tasks: ['sass', 'autoprefixer', 'csso']
			}
		},
		bump: {
			options: {
				files: ['package.json', 'bower.json'],
				commitFiles: ['package.json', 'bower.json'],
				pushTo: 'origin'
			}
		}
	});

	grunt.registerTask('default', ['sass', 'autoprefixer', 'csso']);

};
