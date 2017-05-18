'use strict';
const job = process.env.TRAVIS_JOB_NUMBER;

module.exports = {
    src_folders: 'tests/func',
    globals_path: 'tests/func_globals.js',

    selenium: {
        start_process: false,
    },

    test_settings: {
        default: {
            launch_url: 'http://localhost:8080/tests',
            selenium_host: 'ondemand.saucelabs.com',
            selenium_port: 80,
            username: process.env.SAUCE_USERNAME,
            access_key: process.env.SAUCE_ACCESS_KEY,
            desiredCapabilities: {
                version: 'latest',
                build: `build-${job}`,
                'tunnel-identifier': job,
            },
        },

        chrome: {
            desiredCapabilities: {
                browserName: 'chrome',
                platform: 'macOS 10.12',
            },
        },

        firefox: {
            desiredCapabilities: {
                browserName: 'firefox',
                platform: 'linux',
            },
        },

        safari: {
            desiredCapabilities: {
                browserName: 'safari',
                platform: 'macOS 10.12',
            },
        },

        edge: {
            desiredCapabilities: {
                browserName: 'microsoftedge',
                platform: 'windows 10',
            },
        },

        local: {
            selenium_host: 'localhost',
            selenium_port: 9515,
            default_path_prefix: '',
            desiredCapabilities: {
                browserName: 'chrome',
            },
        },
    },
};
