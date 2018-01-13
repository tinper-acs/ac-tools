var argv = require('minimist')(process.argv.slice(2));
var commands = argv._;


var opts = {
  cmd: commands,
  argv: argv,
  name: "ac-tools"
};

require("./").plugin(opts);
