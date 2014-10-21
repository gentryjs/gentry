var config = require('../../config');
var express = require('express');
var compress = require('compression');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var responseTime = require('response-time');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');
var staticFiles = require('serve-static');
var session = require('express-session');
var logger = require('morgan');
var app = express();
app.disable('x-powered-by');

if (config.debug) {
  app.use(logger('dev'));
}

app.use(errorHandler());
app.use(responseTime());
app.use(compress());
app.use(methodOverride());
app.use(bodyParser.json({
  strict: true
}));

app.use(cookieParser(config.cookieSecret));
app.use(staticFiles(config.pubdir));
app.use(session({
  key: config.cookieName,
  secret: config.cookieSecret,
  cookie: {
    maxAge: 31536000000
  }
}));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  return res.send(500, 'Something broke!');
});

module.exports = app;
