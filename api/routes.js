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

    'put /api/users': {
        controller: 'UserCtrl',
        action: 'update'
    },

    /*
     * Route => PUT /api/users/regenerate
     */

    'put /api/users/regenerate': {
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
     * Route => GET /api/buckets/:id
     */

    'get /api/buckets/:id': {
        controller: 'BucketCtrl',
        action: 'show'
    },

    /*
     * Route => GET /api/buckets/:id/versions
     */

    'get /api/buckets/:id/versions': {
        controller: 'BucketCtrl',
        action: 'list'
    },

    /*
     * Route => GET /api/buckets
     */

    'get /api/buckets': {
        controller: 'BucketCtrl',
        action: 'index'
    },

    /**********************************/
    /* Assets                         */
    /**********************************/

    /*
     * Route => POST /api/assets/upload
     */

    'post /api/assets/upload': {
        controller: 'AssetCtrl',
        action: 'create'
    },

    /*
     * Route => DELETE /api/assets/:bucketId/:id
     */

    'delete /api/assets/:bucketId/:id': {
        controller: 'AssetCtrl',
        action: 'remove'
    },

    /*
     * Route => GET /api/assets/:bucketId/files
     */

    'get /api/assets/:bucketId/files': {
        controller: 'AssetCtrl',
        action: 'list'
    },

    /*
     * Route => GET /api/assets
     */

    'get /api/assets': {
        controller: 'AssetCtrl',
        action: 'index'
    },
};
