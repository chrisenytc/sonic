'use strict';

module.exports = function(req, res, next) {
    if(req.query.allow === 'true') {
        return next();
    } else {
        return next('User not allowed');
    }
};
