var summerfile = require('summerfile'),
    path = require('path');

summerfile.Server(path.dirname(__filename), 8080, true);
