module.exports = function(grunt) {

	grunt.initConfig({
		compress: [
			'template',
			'shower',
			'ribbon',
			'bright'
		].reduce(function(result, module) {
			result[module] = {
				options: {
					archive: module + '.zip'
				},
				files: [{
					expand: true,
					cwd: module + '/',
					src: [
						'**',
						'!node_modules/**',
						'!**/Contributing.md',
						'!**/Gruntfile.js',
						'!**/package.json',
						'!**/index.pdf',
						'!**/tests/**'
					]
				}]
			};

			return result;
		}, {})
	});

	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.registerTask('default', ['compress']);

};