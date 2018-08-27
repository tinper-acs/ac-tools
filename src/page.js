'use strict';


const chalk = require('chalk');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const ghpages = require('gh-pages');
const argv = require('minimist')(process.argv.slice(2));
const markdown = require('markdown-styles');
const md_style = ["bootstrap3",
"github",
"jasonm23-dark",
"jasonm23-foghorn",
"jasonm23-markdown",
"jasonm23-swiss",
"markedapp-byword",
"mixu-book",
"mixu-bootstrap-2col",
"mixu-bootstrap",
"mixu-gray",
"mixu-radar",
"roryg-ghostwriter",
"thomasf-solarizedcssdark",
"thomasf-solarizedcsslight",
"witex"]

module.exports = (options) => {
    var _layout = process.cwd()+"/node_modules/markdown-styles/layouts/"+md_style[8];
    fs.readFile(process.cwd() + '/README.md', {flag: 'r+', encoding: 'utf8'}, function (err, data) {
      if(err) {  console.error(err); return; }
      console.log(chalk.green('GitHub page is being released, please wait...'));
      var html = "";
      var path = require('path');
      markdown.render(markdown.resolveArgs({
        input: path.normalize(process.cwd() + '/README.md'),
        output: path.normalize(process.cwd() + '/docs'),
        layout: _layout,
      }),()=> {
        console.log('All done!');
        fs.readFile(process.cwd() + '/docs/README.html', {flag: 'r+', encoding: 'utf8'}, function (err, _data) {
            if(err) { console.error(err); return; }
            fs.writeFile(process.cwd() + '/docs/index.html', _data, {flag: 'w+'}, function (err) {
              err?console.error(err):console.log(chalk.green(" create sample success ! "));
              fs.unlinkSync(process.cwd()+ "/docs/README.html",function(){err});
             setTimeout(()=>{
               ghpages.publish(process.cwd()+ "/ghpages",{ 
                 remote: 'origin',
                 branch: 'gh-pages',
                 depth: 1,
                 logger: function(){
 
                 }
               }, function(err) {
                 console.log(err)
               });
             },1000)
           });
        });
      });
  }); 
}