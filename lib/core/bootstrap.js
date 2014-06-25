/*
 * sonic
 * https://github.com/enytc/sonic
 *
 * Copyright (c) 2014, EnyTC Corporation
 * Licensed under the BSD license.
 */

'use strict';

/*
 * Module Dependencies
 */

var Sonic = require('./sonic.js'),
    sonic = new Sonic(),
    http = require('http'),
    debug = require('./debugger.js'),
    banner = require('./banner.js');

exports.run = function () {
    //Banner
    banner();
    //Load configs
    sonic.loadConfigs();
    //Load dependencies
    sonic.loader();
    //Start server
    var App = sonic.configureServer(),
        Server = http.createServer(App).listen(sonic.getConfig('app').port, function () {
            debug('Server running on port '.green + ' [ ' + String(sonic.getConfig('app').port).bold + ' ]', 'success');
        });
};
