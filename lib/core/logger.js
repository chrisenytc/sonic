/*
 * sonic
 * https://github.com/enytc/sonic
 *
 * Copyright (c) 2014, EnyTC Corporation
 * Licensed under the BSD license.
 */

'use strict';

/**
 * Module Dependencies
 */

var prettyjson = require('prettyjson');
require('colors');

/**
@class Logger
 */

/*
 * Public Methods
 */

/**
 * Method responsible for manage sonic.js logging
 *
 * @example
 *
 *     logger(tokens, req, res);
 *
 * @method logger
 * @param {Object} tokens Express.logger tokens
 * @param {Object} req Middleware request
 * @param {Object} res Middleware response
 */

module.exports = function(tokens, req, res) {
    //Logger
    var protocol = req.protocol.toUpperCase().bold;
    var ip = tokens['remote-addr'](req, res);
    var method = req.method;
    var mili = tokens['response-time'](req, res).cyan + 'ms'.cyan;
    var routePath = tokens.url(req, res).green;
    var status = String(tokens.status(req, res));

    var showMethod = function() {
        //storage
        var result;
        //Check
        switch (req.method) {
            case 'GET':
                result = '[ ' + method.green + ' ]' + ' --> ' + ip.green;
                break;
            case 'POST':
                result = '[ ' + method.yellow + ' ]' + ' --> ' + ip.yellow;
                break;
            case 'PUT':
                result = '[ ' + method.cyan + ' ]' + ' --> ' + ip.cyan;
                break;
            case 'DELETE':
                result = '[ ' + method.red + ' ]' + ' --> ' + ip.red;
                break;
        }

        //return
        return result;
    };

    var showStatus = function() {
        //storage
        var result;
        //Check
        switch (status) {
            case '200':
                result = status.green + ' OK'.green;
                break;
            case '301':
                result = status.cyan + ' Moved Permanently'.cyan;
                break;
            case '302':
                result = status.cyan + ' Found'.cyan;
                break;
            case '304':
                result = status.cyan + ' Not Modified'.cyan;
                break;
            case '400':
                result = status.red + ' Bad Request'.red;
                break;
            case '401':
                result = status.yellow + ' Unauthorized'.yellow;
                break;
            case '403':
                result = status.yellow + ' Forbidden'.yellow;
                break;
            case '404':
                result = status.yellow + ' Not Found'.yellow;
                break;
            case '500':
                result = status.red + ' Internal Server Error'.red;
                break;
            case '503':
                result = status.red + ' Service Unavailable'.red;
                break;
            default:
                result = status.red;
                break;
        }

        //return
        return result;
    };

    //Logger
    console.log();
    console.log(' [ ' + protocol + ' ]' + ' ' + showMethod() + ' --> ' + mili + ' --> ' + showStatus() + ' --> ' + routePath);
    console.log();
    //Received data
    var env = process.env.NODE_ENV || 'development';
    //
    if ('development' === env) {
        console.log();
        console.log(' [ ' + 'Received'.green.bold + ' ] ==> ');
        console.log();
        console.log(prettyjson.render({
            ' body': req.body,
            ' params': req.params,
            ' query': req.query
        }));
    }

};
