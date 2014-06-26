'use strict';

/*
 * Module Dependencies
 */

var util = require('util'),
    _ = require('underscore');

module.exports = function (app) {
    //Root Application
    var ApplicationController = app.getLib('appController'),
        User = app.getModel('User');

    function UserController() {
        ApplicationController.call(this);
    }

    util.inherits(UserController, ApplicationController);

    /*
     * Route => GET /api/users
     */

    UserController.prototype.index = function index(req, res, next) {
        User.find({}).exec(function (err, users) {
            if (err) {
                return next(err);
            }
            if (!users) {
                return next(new Error('No Users!'));
            }
            return res.sendResponse(200, users);
        });
    };

    /*
     * Route => POST /api/users/login
     */

    UserController.prototype.login = function login(req, res, next) {
        User.findOne({
            username: req.body.username
        }).exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(new Error('User not found!'));
            }
            if (!user.checkPassword(req.body.password)) {
                return next(new Error('Invalid password!'));
            }
            return res.sendResponse(200, {
                accessToken: user.accessToken
            });
        });
    };

    /*
     * Route => POST /api/users
     */

    UserController.prototype.create = function create(req, res, next) {
        //Create
        var userData = {};
        //Populate
        userData.username = req.body.username;
        userData.password = req.body.password;
        //Create Instance
        var user = new User(userData);
        //Save
        user.save(function (err) {
            if (err) {
                return next(err);
            }
            //Send message
            res.sendResponse(200, {
                msg: 'User created successfully!',
                user: {
                    _id: user._id,
                    username: user.username,
                    accessToken: user.accessToken
                }
            });
        });
    };

    /*
     * Route => PUT /api/users/:id
     */

    UserController.prototype.update = function update(req, res, next) {
        //Update
        User.findOne({
            _id: req.params.id
        }).exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next('User not found!');
            }
            //Create
            var userData = {};
            //Populate
            if (req.body.hasOwnProperty('username') && req.body.username !== '') {
                userData.username = req.body.username;
            }
            if (req.body.hasOwnProperty('password') && req.body.password !== '') {
                userData.password = req.body.password;
            }
            if (!userData) {
                return next('You made ​​no changes!');
            }
            //Extend
            _.extend(user, userData);
            //Save
            user.save(function (err) {
                if (err) {
                    return next(err);
                }
                //Send message
                res.sendResponse(200, {
                    msg: 'User ' + user.username + ' updated successfully!'
                });
            });
        });
    };

    /*
     * Route => PUT /api/users/:id/regenerate
     */

    UserController.prototype.regenerateToken = function regenerateToken(req, res, next) {
        //Update
        User.findOne({
            _id: req.params.id
        }).exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next('User not found!');
            }
            //Generate new token
            var token = app.getService('utilsService').uniqueToken();
            user.accessToken = token;
            //Save
            user.save(function (err) {
                if (err) {
                    return next(err);
                }
                //Send message
                res.sendResponse(200, {
                    msg: 'Access token regenerated successfully!',
                    accessToken: token
                });
            });
        });
    };

    /*
     * Route => DELETE /api/users/:id
     */

    UserController.prototype.remove = function remove(req, res, next) {
        User.remove({
            _id: req.params.id
        }).exec(function (err) {
            if (err) {
                return next(err);
            }
            //Send message
            res.sendResponse(200, {
                msg: 'User removed successfully!'
            });
        });
    };

    return UserController;
};
