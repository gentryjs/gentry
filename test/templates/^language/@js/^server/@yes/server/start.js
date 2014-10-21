var winston = require('winston');
var config = require('./config');
var server = require('./http');

winston.log('info', 'Starting with config', config);
server.listen(config.port, function() {
  return winston.log('info', 'Server running on ' + config.port);
});

module.exports = server;
