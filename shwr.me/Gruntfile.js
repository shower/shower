module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		copy: {
			tree: {
				files: [{
					expand: true,
					cwd: 'node_modules/shower/',
					src: ['**', '!package.json'],
					dest: 'temp/'
				},{
					expand: true,
					cwd: 'node_modules/shower-core/',
					src: ['**', '!package.json'],
					dest: 'temp/shower/'
				},{
					expand: true,
					cwd: 'node_modules/shower-ribbon/',
					src: ['**', '!package.json'],
					dest: 'temp/shower/themes/ribbon/'
				},{
					expand: true,
					cwd: 'node_modules/shower-bright/',
					src: ['**', '!package.json'],
					dest: 'temp/shower/themes/bright/'
				}]
			}
		},
		replace: {
			core: {
				src: 'temp/index.html',
				overwrite: true,
				replacements: [{
					from: 'node_modules/shower-ribbon', to: 'shower/themes/ribbon'
				},{
					from: 'node_modules/shower-core', to: 'shower'
				}]
			},
			themes: {
				src: 'temp/shower/themes/*/index.html',
				overwrite: true,
				replacements: [{
					from: '../shower-core', to: '../..'
				}]
			},
			counter: {
				src: 'temp/index.html',
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
					archive: 'temp/shower.zip'
				},
				files: [{
					expand: true,
					cwd: 'temp/',
					src: [
						'**',
						'!node_modules/**'
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
					src: 'temp/',
					dest: 'shwr.me/',
					host: 'pepelsbey@shwr.me'
				}
			}
		},
		clean: ['temp']
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