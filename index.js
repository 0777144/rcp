#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const program = require('commander');
const colors = require('colors');
const ncp = require('ncp').ncp;

ncp.limit = 16;

program
    .version('0.0.1')
    .option('-p, --print', 'Show how the files would be renamed, but don\'t actually do anything.')
    .option('-v, --verbose', 'Print additional information about the operations (not) executed.')
    .parse(process.argv);

const dir = program.args[0];
const oldname = program.args[1];
const newname = program.args[2];

const matchRE = new RegExp(oldname, 'g');

const errHandler = function (err, stdout, stderr) {
    if (err) console.log(err, stdout, stderr);
};

const isDir = (path) => fs.statSync(path).isDirectory();
const exists = (path) => fs.existsSync(path);
const mkdir = (path) => fs.mkdirSync(path);

const readdirSync = function(dir, filelist) {
    filelist = filelist || [];

    let files = fs.readdirSync(dir);

    files.forEach(function (file) {
        let filepath = path.join(dir, file);

        filelist.push(filepath);

        if (isDir(filepath)) {
            readdirSync(filepath, filelist);
        }
    });

    return filelist;
};

const copy = function (source, destination) {
    if (isDir(source) && !exists(destination)) {
        mkdir(destination);
    } if (!exists(destination)) {
        // ncp(source, destination, errHandler);
        ncp(source, destination);
    }
};

console.log(`'${oldname}' would be renamed to '${newname}' in path '${dir}' `);

let files = readdirSync(dir);
let filesToDelete = [];

files.forEach(function (file) {
    if (matchRE.test(file)) {
        filesToDelete.push(file);

        let source = file;
        let destination = file.replace(matchRE, newname);

        if (program.verbose || program.print) console.log(`'${source}' would be renamed to '${destination}'`.green);

        if (!program.print) copy(source, destination);
    } else {
        if (program.verbose) console.log(`'${source}' unchanged`);
    }
});

// exec('rm -rf ' + filesToDelete.shift(), errHandler);
// exec('rm -rf ' + filesToDelete.shift());