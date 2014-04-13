module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		copy: {
			tree: {
				files: [{
					expand: true,
					cwd: 'node_modules/shower/',
					src: ['**', '!package.json'],
					dest: 'temporary/'
				},{
					expand: true,
					cwd: 'node_modules/shower-core/',
					src: ['**', '!package.json'],
					dest: 'temporary/shower/'
				},{
					expand: true,
					cwd: 'node_modules/shower-ribbon/',
					src: ['**', '!package.json'],
					dest: 'temporary/shower/themes/ribbon/'
				},{
					expand: true,
					cwd: 'node_modules/shower-bright/',
					src: ['**', '!package.json'],
					dest: 'temporary/shower/themes/bright/'
				}]
			}
		},
		replace: {
			core: {
				src: 'temporary/index.html',
				overwrite: true,
				replacements: [{
					from: 'node_modules/shower-ribbon', to: 'shower/themes/ribbon'
				},{
					from: 'node_modules/shower-core', to: 'shower'
				}]
			},
			themes: {
				src: 'temporary/shower/themes/*/index.html',
				overwrite: true,
				replacements: [{
					from: '../shower-core', to: '../..'
				}]
			},
			counter: {
				src: 'temporary/index.html',
				overwrite: true,
				replacements: [{
					from: '</body>',
					to: '\t<%= grunt.file.read("counter.html") %>\n</body>'
				}]
			}
		},
		compress: {
			shower: {
				options: {
					archive: 'temporary/shower.zip'
				},
				files: [{
					expand: true,
					cwd: 'temporary/',
					src: [
						'**',
						'!node_modules/**'
					],
					dest: '.'
				}]
			},
			npm: {
				options: {
					archive: 'temporary/shower-pkg.zip'
				},
				files: [{
					expand: true,
					cwd: '../shower/',
					src: [
						'**',
						'!node_modules/**',
						'!.editorconfig',
						'!.gitignore',
						'!Gruntfile.js',
						'!.npmignore',
						'!Contributing.md'
					],
					dest: '.'
				}]
			}
		},
		rsync: {
			options: {
				args: [
					'--delete',
					'--times',
					'--omit-dir-times',
					'--compress'
				],
				exclude: [
					'.DS_Store',
					'License.md',
					'Readme.md'
				],
				recursive: true
			},
			deploy: {
				options: {
					src: 'temporary/',
					dest: 'shwr.me/',
					host: 'pepelsbey@shwr.me'
				}
			}
		},
		clean: ['temporary']
	});

	grunt.registerTask('default', [
		'copy',
		'replace:core',
		'replace:themes',
		'compress',
		'replace:counter',
		'rsync',
		'clean'
	]);

};