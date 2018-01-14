'use strict';

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

module.exports = {
    help: () => {
        console.log(chalk.green('Usage :'));
        console.log();
        console.log(chalk.green('1. ac-tools init           Generate best application component project'));
        console.log(chalk.green('2. ac-tools h              Help'));
        console.log(chalk.green('3. ac-tools v              Version'));
        console.log(chalk.green('4. ac-tools sample         Producing example Engineering'));
        console.log(chalk.green('5. ac-tools md             README.md documents are translated into HTML to be published on git IO'));

        console.log();
    },
    version: () => {
        console.log();
        console.log(chalk.green('Version : ' + require('../package.json').version));
        console.log();
        process.exit();
    },
    info: (msg) => {
        // console.log();
        console.log(chalk.cyan("Info : " + msg));
        // console.log();
    },
    error: (msg) => {
        // console.log();
        console.log(chalk.red("Error : " + msg));
        // console.log();
    }
}