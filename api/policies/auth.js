'use strict';

/*
 * Module Dependencies
 */

var join = require('path').join,
    User = require(join(__dirname, '..', 'models', 'User.js')),
    Config = require(join(__dirname, '..', 'config', process.env.NODE_ENV || 'development', 'auth.js'));

module.exports = function (req, res, next) {
    if (req.query.hasOwnProperty('access_token') && req.query.access_token.length > 0) {
        if (req.query.access_token === Config.defaultToken) {
            return next();
        } else {
            User.findOne({
                accessToken: req.query.access_token
            }).exec(function (err, user) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.sendResponse(401, {
                        error: 'Bad Authentication. You do not have permission to access the API!'
                    });
                }
                req.user = user;
                req.profile = user;
                return next();
            });
        }
    } else {
        return res.sendResponse(401, {
            error: 'Bad Authentication. You do not have permission to access the API!'
        });
    }
};
