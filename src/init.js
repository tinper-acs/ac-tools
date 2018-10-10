'use strict';


const chalk = require('chalk');
const help = require('./help');
const inquirer = require('inquirer');
const path = require('path');
const pathExists = require('path-exists');
const fs = require('fs');
const download = require('download-git-repo');
const spawn = require('cross-spawn');
const propertiesParser = require('properties-parser')


/**
 * 判断是否有Rc文件
 * @param {any} fileName 
 * @returns  true、false
 */
function getValidateRc(filePath){
    try {
        fs.accessSync(filePath,fs.F_OK);
    }catch (e) {
        return false;
    }
    return true;
}
/**
 * 获取文件
 * @param {any} fileName 
 * @returns 
 */
function getRcEmail(){
    const userPath = process.env.HOME;
    const filePath = userPath+"/.ynpmrc";
    let ynpmrc;
    if(getValidateRc(filePath)){ 
        ynpmrc = propertiesParser.read(filePath);
      }else{
        ynpmrc = '';
      }
    return ynpmrc ? ynpmrc.email : '';
}

function changePkgConfig(name) {
    const pkg_path = process.cwd() + `/${name}/package.json`;
    let pkg_json = JSON.parse(fs.readFileSync(pkg_path,'utf8'))
    const author = getRcEmail()
    pkg_json.name = name
    pkg_json.bugs = {
        url: `https://github.com/tinper-acs/${name}/issues`
    }
    pkg_json.homepage = `https://github.com/tinper-acs/${name}#readme`
    pkg_json.repository = {
        "type": "git",
        "url": `git+https://github.com/tinper-acs/${name}.git`
    }
    pkg_json.author = author;
    fs.writeFileSync(pkg_path, JSON.stringify(pkg_json, null, '  '), 'utf-8')
}

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
        download("tinper-acs/app-component-templ", `${answers.name}`, function(err) {
            if (!err) {
                help.info(`ac ${answers.name} done.`);
                changePkgConfig(answers.name)
                inquirer.prompt([{
                    type: 'confirm',
                    message: 'Automatically install YNPM dependent packages?',
                    name: 'ok'
                }]).then(function(res) {
                    var npmInstallChdir = path.resolve('.', answers.name);
                    if (res.ok) {
                        help.info(`Install YNPM dependence packages,please wait.`);
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