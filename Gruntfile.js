module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				mangle: true,
				banner: '/**\n * Shower HTML presentation engine: github.com/shower/shower\n * @copyright 2010–<%= grunt.template.today("yyyy") %> Vadim Makeev, pepelsbey.net\n * @license MIT license: github.com/shower/shower/wiki/MIT-License\n */\n'
			},
			build: {
				src: '<%= pkg.name %>.js',
				dest: '<%= pkg.name %>.min.js'
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