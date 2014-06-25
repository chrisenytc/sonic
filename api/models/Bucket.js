'use strict';

/*
 * Module Dependencies
 */

var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;

/*
 * Bucket Schema
 */
var BucketSchema = new Schema({

	name: {
        type: String
    },

    owner: {
        type: Schema.ObjectId,
        ref: 'User'
    }

});

/*
 * Plugins
 */
BucketSchema.plugin(timestamps);

//Exports model
module.exports = mongoose.model('Bucket', BucketSchema);
