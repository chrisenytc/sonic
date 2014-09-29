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

var fs = require('fs'),
    Banner = fs.readFileSync(__dirname + '/banner.txt', 'utf-8');

require('colors');

module.exports = function () {
    console.log();
    console.log(Banner.yellow.bold);
    console.log();
    console.log(' --------------------------------------------------------------------'.white);
    console.log('  A super fast content delivery network (CDN) for node.js');
    console.log();
    console.log('  Repo => '.bold.white + 'https://github.com/enytc/sonic'.yellow);
    console.log();
    console.log('  Powered by => '.bold.white + 'EnyTC Corporation'.yellow);
    console.log();
    console.log(' --------------------------------------------------------------------'.white);
    console.log();
};
