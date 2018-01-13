#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var commands = argv._;

var opts = {
  cmd: commands,
  argv: argv,
  name: "init"
};

require("../src").plugin(opts);
