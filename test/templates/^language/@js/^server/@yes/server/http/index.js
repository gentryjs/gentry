var http = require('http');
var config = require('../config');
var app = require('./express');
var auth = require('./passport');
var passportAuth = require('./passport/<%= answers.auth %>');
var apis = require('./apis');
var spa = require('./express/spa');
var httpServer = http.createServer(app);

module.exports = httpServer;
