
const fs = require('fs');
const ncp = require('ncp').ncp;
/**
 * Копирует файл source в destination, если source директория, то mkdir destination
 * @param source
 * @param destination
 * @param callback
 */
const copyORmkdir = function (source, destination, callback) {
    fs.stat(source, function(err, stats) {
        if (err) {
            return callback(err)
        }

        if (stats.isDirectory()) {
            fs.mkdir(destination, callback);
        } else {
            ncp(source, destination, callback);
        }

    });
};

module.exports = copyORmkdir;
