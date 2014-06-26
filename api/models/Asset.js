'use strict';

/*
 * Module Dependencies
 */

var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    _s = require('underscore.string'),
    join = require('path').join,
    config = require(join(__dirname, '..', 'config', process.env.NODE_ENV || 'development', 'app.js')),
    Schema = mongoose.Schema;

/*
 * Setters
 */

function slugify(val) {
    return _s.slugify(val || '');
}

/*
 * Asset Schema
 */
var AssetSchema = new Schema({

    name: {
        type: String,
        require: true,
        set: slugify
    },

    fileName: {
        type: String
    },

    version: {
        type: String,
        require: true
    },

    bucket: {
        type: Schema.ObjectId,
        ref: 'Bucket'
    },

    owner: {
        type: Schema.ObjectId,
        ref: 'User'
    }

});

/*
 * Plugins
 */
AssetSchema.plugin(timestamps);

//Schema Configs
AssetSchema.set('toJSON', {
   virtuals: true
});

AssetSchema.set('toObject', {
   virtuals: true
});

/*
 * Virtuals
 */

AssetSchema.virtual('link').get(function () {
    return join(config.url, 'bucket', this.bucket.toString(), this.name, this.version, this.fileName);
});

/*
 * Middlewares
 */

AssetSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('name')) {
        Asset.findOne({
            name: this.name
        }, function (err, asset) {
            if (err) {
                return next(err);
            }
            if(!asset) {
                return next();
            }
            if(asset.name === this.name) {
                return next();
            }
            if (asset) {
                return next(new Error('This asset name already exists!'));
            }
            return next();
        });
    } else {
        return next();
    }
});

AssetSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('version')) {
        Asset.findOne({
            name: this.name,
            version: this.version
        }, function (err, asset) {
            if (err) {
                return next(err);
            }
            if(!asset) {
                return next();
            }
            if(asset.version === this.version) {
                return next();
            }
            if (asset) {
                return next(new Error('This asset version already exists!'));
            }
            return next();
        });
    } else {
        return next();
    }
});

//Exports model
var Asset = module.exports = mongoose.model('Asset', AssetSchema);
