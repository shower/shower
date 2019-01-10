'use strict';

const { EventEmitter } = require('events');
const { Server } = require('http');
const handler = require('serve-handler');
const childProcess = require('child_process');
const sauceConnect = require('sauce-connect-launcher');

EventEmitter.defaultMaxListeners = 0;

const port = Number(process.env.npm_package_config_port);
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

        server.listen(port, () => {
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
