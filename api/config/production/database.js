'use strict';

module.exports = {
    enabled: true,
    uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/sonicdb'
};