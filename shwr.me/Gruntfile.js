module.exports = function(grunt) {

	grunt.initConfig({
		excludes: [
			'**',
			'!**/node_modules/**',
			'!**/package.json',
			'!**/Gruntfile.js',
			'!**/Contributing.md',
			'!**/index.pdf',
			'!**/tests/**'
		],
		copy: {
			duplicate: {
				expand: true,
				cwd: 'template/',
				src: '<%= excludes %>',
				dest: 'temporary/'
			}
		},
		compress: [
			'template',
			'shower',
			'ribbon',
			'bright'
		].reduce(function(result, module) {
			result[module] = {
				options: {
					archive: 'temporary/' + module + '.zip'
				},
				files: [{
					expand: true,
					cwd: module + '/',
					src: '<%= excludes %>'
				}]
			};

			return result;
		}, {}),
		replace: {
			counter: {
				src: 'temporary/index.html',
				overwrite: true,
				replacements: [{
					from: '</body>',
					to: '\t<%= grunt.file.read("counter.html") %>\n</body>'
				}]
			}
		},
		exec: {
			deploy: {
				cmd: 'rsync -rz temporary/ pepelsbey@shwr.me:shwr.me/'
			}
		},
		clean: ['temporary']
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-exec');

	grunt.registerTask('default', ['copy', 'compress', 'replace', 'exec', 'clean']);

};