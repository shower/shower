'use strict';

const { Server } = require('http');
const handler = require('serve-handler');

const server = new Server((request, response) => {
    handler(request, response, {
        public: 'dist',
        directoryListing: false,
    });
});

module.exports = {
    before: done => {
        process.setMaxListeners(0);
        server.listen(process.env.npm_package_config_port, done);
    },
    after: done => {
        server.close(done);
    },
};
