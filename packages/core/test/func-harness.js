'use strict';

/* eslint-disable no-console */
const { EventEmitter } = require('events');
const { Server } = require('http');
const handler = require('serve-handler');
const childProcess = require('child_process');
const sauceConnect = require('sauce-connect-launcher');

EventEmitter.defaultMaxListeners = 0;

const server = new Server((request, response) => {
    handler(request, response, {
        public: 'dist',
        directoryListing: false,
    });
});

let sauceProcess;

module.exports = {
    asyncHookTimeout: 60000,
    isSauce: true,

    'chrome-local': {
        isSauce: false,
    },

    before(done) {
        childProcess.execSync('npm run build');

        server.listen(() => {
            const { port } = server.address();
            console.log(`Started HTTP server on port ${port}.`);

            if (this.isSauce && !process.env.TRAVIS) {
                console.log('Starting Sauce Connect proxy...');
                sauceConnect((err, res) => {
                    if (err) {
                        console.error(err.message);
                    } else {
                        sauceProcess = res;
                        done();
                    }
                });
            } else {
                done();
            }
        });
    },

    beforeEach(browser, done) {
        const { port } = server.address();
        browser.globals.url = `http://localhost:${port}/tests`;
        done();
    },

    after(done) {
        server.close(() => {
            if (sauceProcess) {
                sauceProcess.close(done);
            } else {
                done();
            }
        });
    },
};
