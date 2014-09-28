'use strict';

/*
 * Module Dependencies
 */

var util = require('util'),
    join = require('path').join;

module.exports = function(app) {
    //Root Application
    var ApplicationController = app.getLib('appController'),
        Bucket = app.getModel('Bucket'),
        Asset = app.getModel('Asset'),
        File = app.getService('fileService'),
        BPath = join(__dirname, '..', '..', 'buckets');

    function BucketController() {
        ApplicationController.call(this);
    }

    util.inherits(BucketController, ApplicationController);

    /*
     * Route => GET /api/buckets
     */

    BucketController.prototype.index = function index(req, res, next) {
        Bucket.find({}).exec(function(err, buckets) {
            if (err) {
                return next(err);
            }
            if (!buckets) {
                return next(new Error('No Buckets!'));
            }
            return res.sendResponse(200, buckets);
        });
    };

    /*
     * Route => GET /api/buckets/:id
     */

    BucketController.prototype.show = function show(req, res, next) {
        Asset.find({
            bucket: req.params.id
        }).distinct('name').exec(function(err, assets) {
            if (err) {
                return next(err);
            }
            if (!assets) {
                return next(new Error('No Assets!'));
            }
            return res.sendResponse(200, assets);
        });
    };

    /*
     * Route => GET /api/buckets/:id/versions
     */

    BucketController.prototype.list = function list(req, res, next) {
        Asset.find({
            name: req.query.name,
            bucket: req.params.id
        }).distinct('version').exec(function(err, versions) {
            if (err) {
                return next(err);
            }
            if (!versions) {
                return next(new Error('No versions!'));
            }
            return res.sendResponse(200, versions);
        });
    };


    /*
     * Route => POST /api/buckets
     */

    BucketController.prototype.create = function create(req, res, next) {
        //Create
        var bucketData = {};
        //Populate
        bucketData.name = req.body.name;
        if (req.hasOwnProperty('user')) {
            bucketData.owner = req.user._id;
        } else {
            bucketData.owner = null;
        }
        //Create Instance
        var bucket = new Bucket(bucketData);
        //Save
        bucket.save(function(err) {
            if (err) {
                return next(err);
            }
            File.exists(join(BPath, bucket._id.toString()), function(exists) {
                if (!exists) {
                    File.mkdir(join(BPath, bucket._id.toString()), function(err) {
                        if (err) {
                            return next(err);
                        }
                        //Send message
                        res.sendResponse(200, {
                            msg: 'Bucket created successfully!',
                            bucket: bucket
                        });
                    });
                }
            });
        });
    };

    /*
     * Route => DELETE /api/buckets/:id
     */

    BucketController.prototype.remove = function remove(req, res, next) {
        File.exists(join(BPath, req.params.id), function(exists) {
            if (exists) {
                File.rm(join(BPath, req.params.id));
                File.exists(join(BPath, req.params.id), function(exists) {
                    if (!exists) {
                        Bucket.remove({
                            _id: req.params.id
                        }).exec(function(err) {
                            if (err) {
                                return next(err);
                            }
                            //Send message
                            res.sendResponse(200, {
                                msg: 'Bucket removed successfully!'
                            });
                        });
                    }
                });
            }
        });
    };

    return BucketController;
};
