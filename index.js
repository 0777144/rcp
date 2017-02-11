#! /usr/bin/env node

const program = require('commander');

const readdir = require('./readdir');
const copyORmkdir = require('./copyORmkdir');
const {textRed, textGreen, exit} = require('./helpers');

program
    .version('0.0.1')
    .usage('[options] source target [./path]')
    .option('-p, --print', 'Show how the files would be copied, but don\'t actually do anything.')
    .option('-v, --verbose', 'Print additional information about the operations (not) executed.')
    .parse(process.argv);

const source = program.args[0];
const target = program.args[1];
const dir = program.args[2] || './';
const matchRE = new RegExp(source, 'g');

if (program.args.length < 2) {
    console.log(textRed('Error missing arguments!'));
    program.outputHelp(textRed);
    process.exit(1);
}

readdir(dir, (err, files) => {
    if (err) {
        console.log(err);
    }

    if (!files.length) {
        console.log(textRed(`Files not found in path '${dir}'!`));
        process.exit(1);
    }

    files.forEach(file => {
        let source = file;
        let destination = file.replace(matchRE, target);

        if (file.match(matchRE)) {
            if (!program.print) {
                copyORmkdir(source, destination, err => {
                    if (err) {
                        if (err.code === 'EEXIST') {
                            exit(`Directory ${destination} already exists.`);
                        }

                        console.log(err);
                    }

                    if (program.verbose) {
                        console.log(textGreen(source), 'copied to', textGreen(destination));
                    }
                });
            } else {
                if (program.verbose) {
                    console.log(textGreen(source), 'would be copied to', textGreen(destination));
                }
            }
        } else {
            if (program.verbose) {
                console.log(`${source} unchanged`);
            }
        }
    });

    if (!program.verbose) {
        if (!program.print) {
            console.log(textGreen(source), 'copied to', textGreen(target), 'in path', textGreen(dir));
        }
        if (!program.verbose && program.print) {
            console.log(textGreen(source), 'would be copied to', textGreen(target), 'in path', textGreen(dir));
        }
    }
});
