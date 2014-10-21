winston = require 'winston'
config = require './config'

winston.log 'info', 'Starting with config', config
server = require './http'

server.listen config.port, ->
  winston.log 'info', "Server running on #{config.port}"

module.exports = server
