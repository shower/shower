require('chai').should();
var Promise = require('pinkie-promise');
var selenium = require('selenium-standalone');
var seleniumServer;

exports.config = {
    specs: [
        // TODO: use wildcard when all tests will be migrated
        './tests/functional/*/test.js'
    ],

    capabilities: [{
        browserName: 'chrome'
    }],

    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel: 'silent',

    baseUrl: 'file://' + __dirname + '/tests/functional',

    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,

    // Default request retries count
    connectionRetryCount: 3,

    framework: 'mocha',

    // reporters: ['dot', 'allure'],

    mochaOpts: {
        ui: 'bdd'
    },

    onPrepare: function (config, capabilities) {
        //TODO: use selenium-standalone service when it will be available
        return new Promise(function(resolve, reject) {
            selenium.start(function(err, process) {
                if(err) {
                    return reject(err);
                }
                seleniumServer = process;
                resolve(process);
            });
        });
    },

    onComplete: function(exitCode) {
        seleniumServer.kill();
    }
}
