'use strict';

/* eslint-disable no-console */
const { parse } = require('url');
const { EventEmitter } = require('events');
const { Server } = require('http');
const { execSync } = require('child_process');
const handler = require('serve-handler');
const sauceConnect = require('sauce-connect-launcher');
const { port } = require('./func-constants');

EventEmitter.defaultMaxListeners = 0;

const server = new Server(async (request, response) => {
    const { echo } = parse(request.url, true).query;
    if (echo) {
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'X-XSS-Protection': 0,
        });

        response.end(echo);
    } else {
        handler(request, response, {
            public: 'dist',
            directoryListing: false,
        });
    }
});

let sauceProcess;

module.exports = {
    asyncHookTimeout: 60000,
    isSauce: true,

    'chrome-local': {
        isSauce: false,
    },

    before(done) {
        execSync('npm run build');

        server.listen(port, () => {
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
