'use strict';

const { env } = process;
const makeSauceEnv = desired => ({
    live_output: true,
    skip_testcases_on_fail: false,
    selenium: {
        host: 'ondemand.saucelabs.com',
        port: 80,
    },
    username: env.SAUCE_USERNAME,
    access_key: env.SAUCE_ACCESS_KEY,
    desiredCapabilities: {
        'tunnel-identifier': env.TRAVIS_JOB_NUMBER,
        ...desired,
    },
});

module.exports = {
    globals_path: 'test/func-harness.js',
    src_folders: 'test/func',
    output_folder: 'test/output',
    launch_url: `http://localhost:${env.npm_package_config_port}/tests`,

    test_settings: {
        'chrome-local': {
            webdriver: {
                start_process: true,
                server_path: 'node_modules/.bin/chromedriver',
                port: 9515,
            },
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                    args: ['headless'],
                },
            },
        },

        chrome: makeSauceEnv({
            browserName: 'chrome',
            platform: 'macOS 10.13',
        }),

        firefox: makeSauceEnv({
            browserName: 'firefox',
            platform: 'windows 10',
        }),

        safari: makeSauceEnv({
            browserName: 'safari',
            platform: 'macOS 10.13',
        }),

        edge: makeSauceEnv({
            browserName: 'microsoftedge',
            platform: 'windows 10',
        }),
    },
};
