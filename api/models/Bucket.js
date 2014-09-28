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

/*
 * Methods
 */

BucketSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete(obj.__v);
  return obj;
};

/*
 * Middlewares
 */

BucketSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('name')) {
        var that = this;
        Bucket.findOne({
            name: this.name
        }, function(err, bucket) {
            if (err) {
                return next(err);
            }
            if(!bucket) {
                return next();
            }
            if (bucket.name === that.name) {
                return next();
            }
            if (bucket) {
                return next(new Error('This name already exists!'));
            }
            return next();
        });
    } else {
        return next();
    }
});

//Exports model
var Bucket = module.exports = mongoose.model('Bucket', BucketSchema);
