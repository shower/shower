module.exports = function(grunt) {

	grunt.initConfig({
		copy: {
			duplicate: {
				expand: true,
				cwd: 'template/',
				src: '**',
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
					src: [
						module + '/**',
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
				cmd: 'rsync -rz\
					--exclude ".DS_Store"\
					--exclude ".git*"\
					--exclude "Contributing.md"\
					--exclude "License.md"\
					--exclude "Readme.md"\
					--exclude "node_modules"\
					--exclude "tests"\
					--exclude "Gruntfile.js"\
					--exclude "package.json"\
					temporary/ pepelsbey@shwr.me:shwr.me/temp/'
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