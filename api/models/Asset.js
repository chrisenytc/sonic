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
AssetSchema.set('toObject', {
   virtuals: true
});

AssetSchema.methods.toJSON = function(options) {
  var document = this.toObject(options);
  document.link = document.link;
  delete(document.id);
  return document;
};

/*
 * Virtuals
 */

AssetSchema.virtual('link').get(function () {
    return join(config.url, 'bucket', this.bucket.toString(), this.name, this.version, this.fileName);
});

/*
 * Middlewares
 */


//Exports model
module.exports = mongoose.model('Asset', AssetSchema);
