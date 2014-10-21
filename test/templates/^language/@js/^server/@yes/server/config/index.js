var cc = require('config-chain');
var join = require('path').join;
var argv = require('optimist').argv;
var env = argv.env || process.env.NODE_ENV || 'development';
var configWithEnv = join(__dirname, '' + env + '.json');
var configDefault = join(__dirname, 'default.json');
var logFile = join(__dirname, '' + env + '.log');
var hardcoded = {  logFile: logFile,
  port: process.env.PORT,
  database: process.env.MONGO_URL
};

for (var k in hardcoded) {
  var v = hardcoded[k];
  if (v == null) {
    delete hardcoded[k];
  }
}

var conf = cc(argv, cc.env('app_'), hardcoded, configWithEnv, configDefault);

var out = conf.snapshot;

delete out.$0;

out.pubdir = join(__dirname, '../../public');

module.exports = out;
