

const fs = require('fs');
const path = require('path');
/**
 * Получает список файлов и директорий
 * @param dir
 * @param callback
 */
const readdir = (dir, callback) => {
    let list = [];

    fs.readdir(dir, (err, files) => {
        if (err) {
            return callback(err);
        }

        let pending = files.length;
        if (!pending) {
            // we are done, woop woop
            return callback(null, list)
        }

        files.forEach(file => {
            let filePath = path.join(dir, file);

            fs.stat(filePath, (_err, stats) => {
                if (_err) {
                    return callback(_err)
                }

                list.push(filePath);

                if (stats.isDirectory()) {
                    readdir(filePath, (__err, res) => {
                        if (__err) {
                            return callback(__err)
                        }

                        list = list.concat(res);
                        pending -= 1;
                        if (!pending) {
                            return callback(null, list)
                        }
                    })
                } else {
                    pending -= 1;
                    if (!pending) {
                        return callback(null, list);
                    }
                }

            })
        })
    })
};

module.exports = readdir;
