'use strict';

/*
 * Module Dependencies
 */

var util = require('util');

module.exports = function (app) {
    //Root Application
    var ApplicationController = app.getLib('appController');

    function HomeController() {
        ApplicationController.call(this);
    }

    util.inherits(HomeController, ApplicationController);

    /*
     * Route => GET /
     */

    HomeController.prototype.index = function index(req, res) {
        return res.sendResponse(200, {
            welcome: 'Welcome to Sonic!'
        });
    };

    return HomeController;
};
