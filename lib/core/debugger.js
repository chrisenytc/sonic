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

require('colors');

module.exports = function(msg, type) {
    var env = process.env.NODE_ENV || 'development',
        date = new Date();
    if ('test' !== env) {
        switch (type) {
            case 'error':
                console.log('\n [ ' + env.bold.red + ' ]' + ' -----> '.red + msg.bold.red + ' ==> '.red + date.getMilliseconds() + 'ms');
                break;
            case 'warning':
                console.log('\n [ ' + env.bold.yellow + ' ]' + ' ----->  '.yellow + msg.yellow + ' ==> '.yellow + date.getMilliseconds() + 'ms');
                break;
            case 'info':
                console.log(' [ ' + env.bold.cyan + ' ]' + ' ----->  '.cyan + msg.bold.cyan + ' ==> '.cyan + date.getMilliseconds() + 'ms');
                break;
            case 'success':
                console.log(' [ ' + env.bold.green + ' ]' + ' ----->  '.green + msg.green + ' ==> '.green + date.getMilliseconds() + 'ms');
                break;
        }
    }
};
