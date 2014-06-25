'use strict';

module.exports = {

    /**********************************/
    /* Home                           */
    /**********************************/

    /*
     * Route => GET /api/
     */

    'get /': {
        controller: 'HomeCtrl',
        action: 'index'
    },

    /**********************************/
    /* Users                          */
    /**********************************/

    /*
     * Route => POST /api/users
     */

    'post /api/users': {
        controller: 'UserCtrl',
        action: 'create'
    },

    /*
     * Route => POST /api/users/login
     */

    'post /api/users/login': {
        controller: 'UserCtrl',
        action: 'login'
    },

    /*
     * Route => PUT /api/users
     */

    'put /api/users/:id': {
        controller: 'UserCtrl',
        action: 'update'
    },

    /*
     * Route => PUT /api/users/:id/regenerate
     */

    'put /api/users/:id/regenerate': {
        controller: 'UserCtrl',
        action: 'regenerateToken'
    },

    /*
     * Route => DELETE /api/users/:id
     */

    'delete /api/users/:id': {
        controller: 'UserCtrl',
        action: 'remove'
    },

    /*
     * Route => GET /api/users
     */

    'get /api/users': {
        controller: 'UserCtrl',
        action: 'index'
    },

    /**********************************/
    /* Buckets                        */
    /**********************************/

    /*
     * Route => POST /api/buckets
     */

    'post /api/buckets': {
        controller: 'BucketCtrl',
        action: 'create'
    },

    /*
     * Route => DELETE /api/buckets/:id
     */

    'delete /api/buckets/:id': {
        controller: 'BucketCtrl',
        action: 'remove'
    },

    /*
     * Route => GET /api/buckets
     */

    'get /api/buckets': {
        controller: 'BucketCtrl',
        action: 'index'
    },
};
