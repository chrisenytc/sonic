'use strict';

/*
 * Module Dependencies
 */

var util = require('util'),
    _s = require('underscore.string'),
    join = require('path').join;

module.exports = function(app) {
    //Root Application
    var ApplicationController = app.getLib('appController'),
        Asset = app.getModel('Asset'),
        File = app.getService('fileService'),
        BPath = join(__dirname, '..', '..', 'buckets');

    function AssetController() {
        ApplicationController.call(this);
    }

    util.inherits(AssetController, ApplicationController);

    /*
     * Route => GET /api/assets
     */

    AssetController.prototype.index = function index(req, res, next) {
        Asset.find({}).exec(function(err, assets) {
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
     * Route => GET /api/assets/:bucketId/files
     */

    AssetController.prototype.list = function list(req, res, next) {
        Asset.find({
            name: req.query.name,
            version: req.query.version,
            bucket: req.params.bucketId
        }).exec(function(err, files) {
            if (err) {
                return next(err);
            }
            if (!files) {
                return next(new Error('No files!'));
            }
            return res.sendResponse(200, files);
        });
    };


    /*
     * Route => POST /api/assets/upload
     */

    AssetController.prototype.create = function create(req, res, next) {
        //Create
        var assetData = {};
        //Populate
        assetData.name = _s.slugify(req.body.name);
        assetData.fileName = req.files.assetFile.originalname;
        assetData.version = req.body.version;
        assetData.bucket = req.body.bucket;
        if (req.hasOwnProperty('user')) {
            assetData.owner = req.user._id;
        } else {
            assetData.owner = null;
        }
        //Find One
        Asset.findOne({
            name: assetData.name,
            fileName: assetData.fileName,
            version: assetData.version,
            bucket: assetData.bucket
        }).exec(function(err, asset) {
            if (err) {
                return next(err);
            }
            if (!asset) {
                //Create Instance
                var newAsset = new Asset(assetData);
                //Save
                newAsset.save(function(err) {
                    if (err) {
                        return next(err);
                    }
                    File.exists(join(BPath, assetData.bucket), function(bucketExists) {
                        if (!bucketExists) {
                            return next('The bucket ´' + assetData.bucket + '´ doesn\'t exists.');
                        }
                        File.exists(join(BPath, assetData.bucket, assetData.name, assetData.version, assetData.fileName), function(exists) {
                            if (exists) {
                                File.remove(join(BPath, assetData.bucket, assetData.name, assetData.version, assetData.fileName), function(err) {
                                    if (err) {
                                        return next(err);
                                    }
                                    File.move(req.files.assetFile.path, join(BPath, assetData.bucket, assetData.name, assetData.version, assetData.fileName), function(err) {
                                        if (err) {
                                            return next(err);
                                        }
                                        //Delete temp files
                                        File.rm(join(__dirname, '..', '..', 'uploads'));
                                        //Create temp
                                        File.mkdir(join(__dirname, '..', '..', 'uploads'));
                                        //Send message
                                        res.sendResponse(200, {
                                            msg: 'Asset replaced successfully!',
                                            asset: newAsset
                                        });
                                    });
                                });
                            } else {
                                File.exists(join(BPath, assetData.bucket, assetData.name), function(nameExists) {
                                    if (!nameExists) {
                                        File.mkdir(join(BPath, assetData.bucket, assetData.name));
                                    }
                                    File.exists(join(BPath, assetData.bucket, assetData.name, assetData.version), function(versionExists) {
                                        if (!versionExists) {
                                            File.mkdir(join(BPath, assetData.bucket, assetData.name, assetData.version));
                                        }
                                        File.exists(join(BPath, assetData.bucket, assetData.name), function(nameExists) {
                                            if (nameExists) {
                                                File.exists(join(BPath, assetData.bucket, assetData.name, assetData.version), function(versionExists) {
                                                    if (versionExists) {
                                                        File.move(req.files.assetFile.path, join(BPath, assetData.bucket, assetData.name, assetData.version, assetData.fileName), function(err) {
                                                            if (err) {
                                                                return next(err);
                                                            }
                                                            //Delete temp files
                                                            File.rm(join(__dirname, '..', '..', 'uploads'));
                                                            //Create temp
                                                            File.mkdir(join(__dirname, '..', '..', 'uploads'));
                                                            //Send message
                                                            res.sendResponse(200, {
                                                                msg: 'Asset created successfully!',
                                                                asset: newAsset
                                                            });
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    });
                                });
                            }
                        });
                    });
                });
            } else {
                //Save
                asset.save(function(err) {
                    if (err) {
                        return next(err);
                    }
                    File.exists(join(BPath, assetData.bucket), function(bucketExists) {
                        if (!bucketExists) {
                            return next('The bucket ´' + assetData.bucket + '´ doesn\'t exists.');
                        }
                        File.exists(join(BPath, assetData.bucket, assetData.name, assetData.version, assetData.fileName), function(exists) {
                            if (exists) {
                                File.remove(join(BPath, assetData.bucket, assetData.name, assetData.version, assetData.fileName), function(err) {
                                    if (err) {
                                        return next(err);
                                    }
                                    File.move(req.files.assetFile.path, join(BPath, assetData.bucket, assetData.name, assetData.version, assetData.fileName), function(err) {
                                        if (err) {
                                            return next(err);
                                        }
                                        //Delete temp files
                                        File.rm(join(__dirname, '..', '..', 'uploads'));
                                        //Create temp
                                        File.mkdir(join(__dirname, '..', '..', 'uploads'));
                                        //Send message
                                        res.sendResponse(200, {
                                            msg: 'Asset replaced successfully!',
                                            asset: asset
                                        });
                                    });
                                });
                            } else {
                                File.exists(join(BPath, assetData.bucket, assetData.name), function(nameExists) {
                                    if (!nameExists) {
                                        File.mkdir(join(BPath, assetData.bucket, assetData.name));
                                    }
                                    File.exists(join(BPath, assetData.bucket, assetData.name, assetData.version), function(versionExists) {
                                        if (!versionExists) {
                                            File.mkdir(join(BPath, assetData.bucket, assetData.name, assetData.version));
                                        }
                                        File.exists(join(BPath, assetData.bucket, assetData.name), function(nameExists) {
                                            if (nameExists) {
                                                File.exists(join(BPath, assetData.bucket, assetData.name, assetData.version), function(versionExists) {
                                                    if (versionExists) {
                                                        File.move(req.files.assetFile.path, join(BPath, assetData.bucket, assetData.name, assetData.version, assetData.fileName), function(err) {
                                                            if (err) {
                                                                return next(err);
                                                            }
                                                            //Delete temp files
                                                            File.rm(join(__dirname, '..', '..', 'uploads'));
                                                            //Create temp
                                                            File.mkdir(join(__dirname, '..', '..', 'uploads'));
                                                            //Send message
                                                            res.sendResponse(200, {
                                                                msg: 'Asset created successfully!',
                                                                asset: asset
                                                            });
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    });
                                });
                            }
                        });
                    });
                });
            }
        });
    };

    /*
     * Route => DELETE /api/assets/:bucketId/:id
     */

    AssetController.prototype.remove = function remove(req, res, next) {
        switch (req.query.opt) {
            case 'asset':
                Asset.findOne({
                    name: req.params.id,
                    bucket: req.params.bucketId
                }).exec(function(err, asset) {
                    if (err) {
                        return next(err);
                    }
                    if (!asset) {
                        return next(new Error('Asset not found!'));
                    }
                    File.exists(join(BPath, asset.bucket.toString(), asset.name), function(exists) {
                        if (exists) {
                            File.rm(join(BPath, asset.bucket.toString(), asset.name));
                            File.exists(join(BPath, asset.bucket.toString(), asset.name), function(exists) {
                                if (!exists) {
                                    Asset.remove({
                                        name: asset.name,
                                        bucket: asset.bucket
                                    }).exec(function(err) {
                                        if (err) {
                                            return next(err);
                                        }
                                        //Send message
                                        res.sendResponse(200, {
                                            msg: 'Asset removed successfully!'
                                        });
                                    });
                                }
                            });
                        }
                    });
                });
                break;
            case 'version':
                Asset.findOne({
                    name: req.query.name,
                    version: req.params.id,
                    bucket: req.params.bucketId
                }).exec(function(err, asset) {
                    if (err) {
                        return next(err);
                    }
                    if (!asset) {
                        return next(new Error('Asset not found!'));
                    }
                    File.exists(join(BPath, asset.bucket.toString(), asset.name, asset.version), function(exists) {
                        if (exists) {
                            File.rm(join(BPath, asset.bucket.toString(), asset.name, asset.version));
                            File.exists(join(BPath, asset.bucket.toString(), asset.name, asset.version), function(exists) {
                                if (!exists) {
                                    Asset.remove({
                                        name: req.query.name,
                                        version: asset.version,
                                        bucket: asset.bucket
                                    }).exec(function(err) {
                                        if (err) {
                                            return next(err);
                                        }
                                        //Send message
                                        res.sendResponse(200, {
                                            msg: 'Version removed successfully!'
                                        });
                                    });
                                }
                            });
                        }
                    });
                });
                break;
            case 'file':
                //Delete a file
                Asset.findOne({
                    _id: req.params.id
                }).exec(function(err, asset) {
                    if (err) {
                        return next(err);
                    }
                    if (!asset) {
                        return next(new Error('Asset not found!'));
                    }
                    File.exists(join(BPath, asset.bucket.toString(), asset.name, asset.version, asset.fileName), function(exists) {
                        if (exists) {
                            File.rm(join(BPath, asset.bucket.toString(), asset.name, asset.version, asset.fileName));
                            File.exists(join(BPath, asset.bucket.toString(), asset.name, asset.version, asset.fileName), function(exists) {
                                if (!exists) {
                                    Asset.remove({
                                        _id: req.params.id
                                    }).exec(function(err) {
                                        if (err) {
                                            return next(err);
                                        }
                                        //Send message
                                        res.sendResponse(200, {
                                            msg: 'File removed successfully!'
                                        });
                                    });
                                }
                            });
                        }
                    });
                });
                break;
            default:
                return next(new Error('Choose a valid delete option'));
                break;
        }
    };

    return AssetController;
};
