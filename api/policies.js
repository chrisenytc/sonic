'use strict';

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
        index: 'auth',
        login: true,
        create: 'auth',
        update: 'auth',
        regenerateToken: 'auth',
        remove: 'auth'
    },

    /*
     * Policie => BucketCtrl
     */

    BucketCtrl: {
        index: 'auth',
        create: 'auth',
        remove: 'auth'
    },

    /*
     * Policie => AssetCtrl
     */

    AssetCtrl: {
        index: 'auth',
        create: 'auth',
        remove: 'auth'
    }
};
