'use strict';

/*
 * Module Dependencies
 */

var crypto = require('crypto'),
    mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    utils = require('../services/utilsService.js'),
    Schema = mongoose.Schema;

/*
 * Setters
 */

function hashed(val) {
    return crypto.createHash('whirlpool').update(val).digest('hex');
}

/*
 * User Schema
 */
var UserSchema = new Schema({

    username: {
        type: String,
        trim: true,
        unique: true,
        require: true
    },

    password: {
        type: String,
        require: true,
        set: hashed
    },

    accessToken: {
        type: String,
        default: utils.uid(16)
    }

});

/*
 * Plugins
 */
UserSchema.plugin(timestamps);

/*
 * Methods
 */

UserSchema.methods.checkPassword = function(password) {
    return crypto.createHash('whirlpool').update(password).digest('hex') === this.password;
};

UserSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete(obj.password);
  delete(obj.__v);
  return obj;
};

/*
 * Middlewares
 */

UserSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('username')) {
        var that = this;
        User.findOne({
            username: this.username
        }, function(err, user) {
            if (err) {
                return next(err);
            }
            if(!user) {
                return next();
            }
            if (user.username === that.username) {
                return next();
            }
            if (user) {
                return next(new Error('This username already exists!'));
            }
            return next();
        });
    } else {
        return next();
    }
});

//Exports model
var User = module.exports = mongoose.model('User', UserSchema);
