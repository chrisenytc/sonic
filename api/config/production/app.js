'use strict';

module.exports = {
    applicationName: 'Sonic.js',
    description: 'A super fast content delivery network (CDN) for node.js',
    url: process.env.SONIC_URI || 'http://localhost:8081',
    poweredBy: 'Sonic.js',
    port: process.env.PORT || 8081,
    documentation_url: 'https://github.com/enytc/sonic-cli#documentation'
};
