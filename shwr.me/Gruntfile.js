module.exports = function(grunt) {

	grunt.initConfig({
		compress: (function() {
			var modules = [
				'template',
				'shower',
				'ribbon',
				'bright'
			];

			var excludes = [
				'**',
				'!node_modules/**',
				'!**/Contributing.md',
				'!**/Gruntfile.js',
				'!**/package.json',
				'!**/index.pdf',
				'!**/tests/**'
			];

			var result = {}

			for (var i = 0, l = modules.length; i < l; i++) {
				result[modules[i]] = {
					options: {
						archive: modules[i] + '.zip'
					},
					files: [{
						expand: true,
						cwd: modules[i] + '/',
						src: excludes
					}]
				};
			}

			return result;
		})()
	});

	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.registerTask('default', ['compress']);

};