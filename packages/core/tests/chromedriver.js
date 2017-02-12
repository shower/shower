'use strict';
const chromedriver = require('chromedriver');

module.exports = {
    before: done => {
        chromedriver.start();
        done();
    },
    after: () => {
        chromedriver.stop();
    },
};
