'use strict';


const chalk = require('chalk');
const help = require('./help');
const inquirer = require('inquirer');
const path = require('path');
const pathExists = require('path-exists');
const fs = require('fs');
const download = require('download-git-repo');
const spawn = require('cross-spawn');

module.exports = () => {
    var questions = [{
        type: 'input',
        name: 'name',
        message: 'project name?',
        default: function() {
            return 'ac project'
        }
    }];
    inquirer.prompt(questions).then(function(answers) {
        var root = path.resolve(answers.name);
        if (!pathExists.sync(answers.name)) {
            fs.mkdirSync(root);
        } else {
            help.error(`directory ${answers.name} already exists.`);
            process.exit(0);
        }
        help.info(`Downloading \'ac\' please wait.`);
        //下载项目
        download("fridaydream/ac-template", `${answers.name}`, function(err) {
            if (!err) {
                help.info(`ac ${answers.name} done.`);
                inquirer.prompt([{
                    type: 'confirm',
                    message: 'Automatically install YNPM dependent packages?',
                    name: 'ok'
                }]).then(function(res) {
                    // 改变模版中 output文件中js和css 的文件名
                    var npmInstallChdir = path.resolve('.', answers.name);
                    if (res.ok) {
                        help.info(`Install YNPM dependent packages,please wait.`);
                        //选择自动安装
                        process.chdir(npmInstallChdir);
                        var args = ['install'].filter(function(e) {
                            return e;
                        });
                        var proc = spawn('ynpm', args, {
                            stdio: 'inherit'
                        });
                        proc.on('close', function(code) {
                            if (code !== 0) {
                                console.error('`ynpm ' + args.join(' ') + '` failed');
                                return;
                            }
                            help.info(`YNPM package installed. cd ${answers.name} && npm run dev`);
                        });

                    } else {
                        help.info(`Cancel the installation of NPM dependent package.\nPlease run \'cd ${answers.name} && npm install\' manually.`);
                    }

                });
            } else {
                console.error(requestBody.message);
            }
        });
    });
}