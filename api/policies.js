'use strict';

/*
 * Module Dependencies
 */

var multer = require('multer'),
    join = require('path').join,
    File = require(join(__dirname, 'services', 'fileService.js'));

module.exports = {

    /*
     * Policie => HomeCtrl
     */

    HomeCtrl: {
        '*': true
    },

    /*
     * Policie => UserCtrl
     */

    UserCtrl: {
        '*': true
    },

    /*
     * Policie => BucketCtrl
     */

    BucketCtrl: {
        '*': true
    },

    /*
     * Policie => AssetCtrl
     */

    AssetCtrl: {
        index: true,
        create: multer({
            dest: join(__dirname, '..', 'uploads'),
            limits: {
                files: 1
            }
        }),
        remove: true
    }
};
