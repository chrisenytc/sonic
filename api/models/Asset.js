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
        set: slugify
    },

    version: {
        type: String,
        require: true
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

//Exports model
module.exports = mongoose.model('Asset', AssetSchema);
