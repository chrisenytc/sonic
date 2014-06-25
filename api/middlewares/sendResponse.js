'use strict';

module.exports = {

    /*
     * Set true if you want enable this middleware
     */

    enabled: true,
    fn: function(req, res, next) {
        //Check statusCode and return a custom message
        function statusMsg(status) {
            switch (status) {
                case 200:
                    return 'OK';
                case 301:
                    return 'Moved permanently';
                case 400:
                    return 'Bad Request';
                case 401:
                    return 'Unauthorized';
                case 403:
                    return 'Forbidden';
                case 404:
                    return 'Not Found';
                case 500:
                    return 'Internal Server Error';
                case 503:
                    return 'Service Unavailable';
                default:
                    return 'Error';
            }
        }
        //API response
        res.sendResponse = function(statusCode, payload) {
            if (!payload) {
                return this.jsonp(200, {
                    metadata: {
                        status: 200,
                        msg: statusMsg(200)
                    },
                    response: statusCode
                });
            }
            return this.jsonp(statusCode, {
                metadata: {
                    status: statusCode,
                    msg: statusMsg(statusCode)
                },
                response: payload
            });
        };
        //Next request
        next();
    }
};
