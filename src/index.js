const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

function getHelp() {
  console.log(chalk.green(" Usage : "));
  console.log();
  console.log(chalk.green(" ac sample init sample"));
  console.log();
  process.exit(0);
}

function getVersion() {
  console.log(chalk.green(require("../package.json").version));
  process.exit(0);
}

function sampleInit(paths){
  var arr = [],code=[];
  fs.readdir(paths, function(err,files){

      if(err){
          console.log("error:\n"+err);
          return;
      }

      files.forEach(function(file) {
          if(file.search(/Demo\d+.js/)==-1)return false;

          var fileName = file.replace('.js','');

          fs.stat(paths + "//" + file, function (err, stat) {
              //console.log(stat);
              if (err) {console.log(err);return;}
              if (stat.isDirectory()) {
                  //console.log(paths + "\/" + file + "\/");
                  explorer(path + "\/" + file);
              } else {
                 // console.log(paths + "\/" + file);
              }
          });
          var data = fs.readFileSync(paths + "//" + file,'utf-8');
          var title,desc;
          try{
              title = data.match(/@title.{0,20}/)||[];
              title = title.join('').replace(/@title/,'');
          }catch(e){
              console.log('please write title like @title');
          }

          try{
              desc = data.match(/@description.{0,150}/)||[];
              desc = desc.join('').replace(/@description/,'');
          }catch(e){
              console.log('please write description like @description');
          }
          try{
              data = data.replace(/export(\s+)(.*)/ig,'');
              var package = fs.readFileSync(path.join(process.cwd(),'./package.json'),'utf-8');
              var name = JSON.parse(package).name;
              data = data.replace(/\'..\/..\/src\'/ig,'\''+name+'\'');
          }catch(e){}
          arr.push({
              example: '<'+fileName+' />',
              title: title||fileName,
              code: data,
              desc: desc
          });
          // code.push(data);
          code.push('import '+fileName+' from "./demolist/'+fileName+'";');
      });


      var index = fs.readFileSync(path.join(process.cwd(),'./demo/index-demo-base.js'),'utf-8');


      var str = 'var DemoArray = '+JSON.stringify(arr) +'\n';


      str = str.replace(/ple":"</ig,'ple":<').replace(/","tit/ig,',"tit');

      index = index.replace(/\{demolist\}/,code.join('')+"\n"+str);


      fs.writeFile(path.join(process.cwd(),'./demo/index.js'), index, function (err) {
          if (err) throw err;
          console.log('demo/index.js It\'s saved!');
          try{
            webpack(require('./webpack.dev.js'), function (err, stats) {
                // 重要 打包过程中的语法错误反映在stats中
                console.log('webpack log:' + stats);
                if(err) cb(err);
                console.info('###### pack_demo done ######');
                cb();
            });
          }catch(e){}
      });
      console.log(chalk.green(" ac tools init sample is success !"));
  });
};

const help = require('./help');
const init = require('./init');

module.exports = {
  plugin: function(options) {
    commands = options.cmd;
    switch (commands[0]) {
        case "h":
            help.help();
            break;
        case "v":
            help.version();
            break;
        case "init":
            init();
            break;
        case "sample":
            console.log(chalk.green("ac tools init sample"));
            var p = path.join(process.cwd(),'./demo/demolist');
            sampleInit(p);
            break;
        default:
            help.help();
    }
  }
}
