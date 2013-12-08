module.exports = function(grunt) {

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
		dalek: {
			test: {
				src: 'tests/keys.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-dalek');

	grunt.registerTask('default', ['uglify', 'dalek']);

};