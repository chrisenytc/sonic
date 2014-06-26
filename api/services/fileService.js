'use strict';

/*
 * Module Dependencies
 */

var fs = require('fs');

/**
@class FileService
 */

/*
 * Public Methods
 */

/**
 * Method responsible for check if path exists
 *
 * @example
 *
 *     fileService.exists('./filename', function() {});
 *
 * @method exists
 * @public
 * @param {String} path File path of archive
 * @param {Function} callback Callback with data
 * @return {String} Returns true if file exists
 */

exports.exists = function exists(path, callback) {
    if(!callback) {
        return fs.existsSync(path);
    } else {
        return fs.exists(path, callback);
    }
};

/**
 * Method responsible for move files
 *
 * @example
 *
 *     fileService.move('./filename', './newfilename', function() {});
 *
 * @method move
 * @public
 * @param {String} oldPath File path of archive
 * @param {String} newPath Destination path
 * @param {Function} callback Callback with data
 */

exports.move = function move(oldPath, newPath, callback) {
    return fs.rename(oldPath, newPath, callback);
};

/**
 * Method responsible for reading files and get content
 *
 * @example
 *
 *     fileService.read('./filename', function() {});
 *
 * @method read
 * @public
 * @param {String} fillepath File path of archive
 * @param {String} encoding Encoding
 * @param {Function} callback Callback with data
 */

exports.read = function readFile(filepath, encoding, callback) {
    //Read and return this file content
    return fs.readFile(filepath, {
        encoding: encoding
    }, callback);
};

/**
 * Method responsible for reading files as stream and get content
 *
 * @example
 *
 *     fileService.readStream('./filename');
 *
 * @method readStream
 * @public
 * @param {String} fillepath File path of archive
 * @return {String} Returns file content
 */

exports.readStream = function readStream(filepath) {
    //Read and return this file content
    return fs.createReadStream(filepath);
};

/**
 * Method responsible for writing files
 *
 * @example
 *
 *     fileService.write('./filename', 'string data', function() {});
 *
 * @method write
 * @public
 * @param {String} fillepath File path of archive
 * @param {Function} callback Callback with data
 * @param {String} data Data of file
 */

exports.write = function writeFile(filepath, data, callback) {
    //Read and return this file content
    fs.writeFile(filepath, data, callback);
};

/**
 * Method responsible for create folders
 *
 * @example
 *
 *     fileService.mkdir('./filename', function() {});
 *
 * @method mkdir
 * @public
 * @param {String} path folder path
 * @param {Function} callback Callback with data
 */

exports.mkdir = function mkdir(path, callback) {
    if (!callback) {
        fs.mkdirSync(path);
    } else {
        fs.mkdir(path, callback);
    }
};

/**
 * Method responsible for remove files
 *
 * @example
 *
 *     fileService.remove('./filename', function() {});
 *
 * @method remove
 * @public
 * @param {String} path File path of archive
 * @param {Function} callback Callback with data
 */

exports.remove = function remove(path, callback) {
    fs.unlink(path, callback);
};

/**
 * Method responsible for remove directories
 *
 * @example
 *
 *     fileService.rm('./filename');
 *
 * @method rm
 * @public
 * @param {String} path File path of directory
 */

exports.rm = function rm(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            var curPath = path + '/' + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                exports.rm(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

/**
 * Method responsible for check if path is a file
 *
 * @example
 *
 *     fileService.isFile('./filename');
 *
 * @method isFile
 * @public
 * @param {String} path File path of archive
 * @return {String} Returns true if path is file
 */

exports.isFile = function isFile(path) {
    var f = fs.stat(path);
    return f.isFile();
};

/**
 * Method responsible for check if path is a directory
 *
 * @example
 *
 *     fileService.isDir('./filename');
 *
 * @method isDir
 * @public
 * @param {String} path File path of archive
 * @return {String} Returns true if path is directory
 */

exports.isDir = function isDir(path) {
    var f = fs.stat(path);
    return f.isDirectory();
};
