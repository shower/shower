'use strict';

const {
    TRAVIS_JOB_NUMBER: job,
    npm_package_config_port: port,
} = process.env;

module.exports = {
    src_folders: 'test/func',
    globals_path: 'test/chromedriver.js',
    live_output: true,

    selenium: {
        start_process: false,
    },

    test_settings: {
        default: {
            launch_url: `http://localhost:${port}/tests`,
            selenium_host: 'ondemand.saucelabs.com',
            selenium_port: 80,
            username: process.env.SAUCE_USERNAME,
            access_key: process.env.SAUCE_ACCESS_KEY,
            desiredCapabilities: {
                version: 'latest',
                build: `build-${job}`,
                'tunnel-identifier': job,
            },
            skip_testcases_on_fail: false,
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
                platform: 'windows 10',
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
