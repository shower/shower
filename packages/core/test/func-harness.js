'use strict';

const { Server } = require('http');
const handler = require('serve-handler');

const port = Number(process.env.npm_package_config_port);
const server = new Server((request, response) => {
    handler(request, response, {
        public: 'dist',
        directoryListing: false,
    });
});

module.exports = {
    before: done => {
        process.setMaxListeners(0);
        server.listen(port, done);
    },
    after: done => {
        server.close(done);
    },
};
