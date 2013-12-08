module.exports = function(grunt) {

	grunt.initConfig({
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
					banner: '/**\n * Ribbon theme for Shower HTML presentation engine: github.com/shower/shower\n * Copyright © 2010–<%= grunt.template.today("yyyy") %> Vadim Makeev, pepelsbey.net\n * Licensed under MIT license: github.com/shower/shower/wiki/MIT-License\n */\n'
				}
			}
		},
		watch: {
			styles: {
				files: 'styles/*.scss',
				tasks: ['sass', 'autoprefixer', 'csso']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-csso');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass', 'autoprefixer', 'csso']);

};