module.exports = function(grunt) {

	grunt.initConfig({
		compress: {
			template: {
				options: {
					archive: 'template.zip'
				},
				files: [{
					expand: true,
					cwd: 'template/',
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
			},
			shower: {
				options: {
					archive: 'shower.zip'
				},
				files: [{
					expand: true,
					cwd: 'shower/',
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
			},
			ribbon: {
				options: {
					archive: 'ribbon.zip'
				},
				files: [{
					expand: true,
					cwd: 'ribbon/',
					src: [
						'**',
						'!node_modules/**',
						'!Contributing.md',
						'!Gruntfile.js',
						'!package.json',
						'!index.pdf'
					]
				}]
			},
			bright: {
				options: {
					archive: 'bright.zip'
				},
				files: [{
					expand: true,
					cwd: 'bright/',
					src: [
						'**',
						'!node_modules/**',
						'!Contributing.md',
						'!Gruntfile.js',
						'!package.json',
						'!index.pdf'
					]
				}]
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.registerTask('default', ['compress']);

};