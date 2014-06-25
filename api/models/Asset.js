'use strict';

/*
 * Module Dependencies
 */

var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    _s = require('underscore.string'),
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
        unique: true,
        set: slugify
    },

    version: {
        type: String,
        unique: true,
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

/*
 * Middlewares
 */

AssetSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('name')) {
        Asset.findOne({
            name: this.name
        }, function(err, user) {
            if (err) {
                return next(err);
            }
            if (user) {
                return next(new Error('This asset name already exists!'));
            }
            return next();
        });
    } else {
        return next();
    }
});

AssetSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('version')) {
        Asset.findOne({
            version: this.version
        }, function(err, user) {
            if (err) {
                return next(err);
            }
            if (user) {
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
