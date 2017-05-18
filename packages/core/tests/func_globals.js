'use strict';
const chromedriver = require('chromedriver');
const serve = require('serve');
let server;

module.exports = {
    before: done => {
        server = serve({ port: 8080 }, 'dist');
        chromedriver.start();
        done();
    },
    after: () => {
        server.stop();
        chromedriver.stop();
    },
};
