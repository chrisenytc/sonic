'use strict';

/*
 * Module Dependencies
 */

var util = require('util'),
    join = require('path').join;

module.exports = function (app) {
    //Root Application
    var ApplicationController = app.getLib('appController'),
        Bucket = app.getModel('Bucket'),
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
        Bucket.find({}).exec(function (err, buckets) {
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
     * Route => POST /api/buckets
     */

    BucketController.prototype.create = function create(req, res, next) {
        //Create
        var bucketData = {};
        //Populate
        bucketData.name = req.body.name;
        bucketData.owner = null;
        //Create Instance
        var bucket = new Bucket(bucketData);
        //Save
        bucket.save(function (err) {
            if (err) {
                return next(err);
            }
            File.exists(join(BPath, bucket._id.toString()), function (exists) {
                if (!exists) {
                    File.mkdir(join(BPath, bucket._id.toString()), function (err) {
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
        File.exists(join(BPath, req.params.id), function (exists) {
            if (exists) {
                File.rm(join(BPath, req.params.id));
                File.exists(join(BPath, req.params.id), function (exists) {
                    if (!exists) {
                        Bucket.remove({
                            _id: req.params.id
                        }).exec(function (err) {
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
