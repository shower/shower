module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jscs: {
            src: 'lib/*/*.js',
            options: {
                config: '.jscs.json'
            }
        },
        concat: {
            basic: {
                src: [
                    // Module system.
                    'node_modules/ym/modules.js',

                    // Core.
                    'lib/init.js',
                    'lib/shower.js',
                    'lib/*/*.js',

                    // Plugins.
                    'node_modules/shower-*/shower-*.js'
                ],
                dest: 'shower.js'
            },
            tests: {
                src: ['tests/unit/test.*.js'],
                dest: 'tests/unit/tests.js'
            }
        },
        mocha: {
            all: ['tests/unit/*.html']
        },
        uglify: {
            options: {
                mangle: true,
                banner: '/**\n * <%= pkg.description %>\n * <%= pkg.name %> v<%= pkg.version %>, <%= pkg.homepage %>\n * @copyright 2010–<%= grunt.template.today("yyyy") %> <%= pkg.author.name %>, <%= pkg.author.url %>\n * @license <%= pkg.license %>\n */\n'
            },
            build: {
                src: 'shower.js',
                dest: 'shower.min.js'
            }
        },
        webdriver: {
            test: {
                configFile: './wdio.conf.js'
            }
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                commitFiles: ['package.json', 'bower.json'],
                pushTo: 'origin'
            }
        }
    });

    grunt.registerTask('default', [
        'jscs',
        'concat:basic',
        'uglify'
    ]);

    grunt.registerTask('dev', [
        'jscs',
        'concat:basic'
    ]);

    grunt.registerTask('test', [
        'test:unit',
        'test:func'
    ]);

    grunt.registerTask('test:func', [
        'jscs',
        'concat:basic',
        'uglify',
        'webdriver'
    ]);

    grunt.registerTask('test:unit', [
        'jscs',
        'concat',
        'uglify',
        'mocha'
    ]);
};
