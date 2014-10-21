var __slice = [].slice;

var config = require('../../config');
var app = require('../express');
var winston = require('winston');
var pluralize = require('pluralize');
var requireDir = require('require-dir');
var path = require('path');
var resDir = path.join(__dirname, '../../resources');
var resources = requireDir(resDir, {recurse: true});

var registerRoute = function() {
  var method = arguments[0];
  var route = arguments[1];
  var fns = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
  winston.log('info', (method.toUpperCase()) + ' ' + route + ' registered');
  app[method].apply(app, [route].concat(__slice.call(fns)));
  return app;
};

for (var resource in resources) {
  var handlers = resources[resource];
  for (var method in handlers) {
    var fn = handlers[method];
    if (!(typeof fn === 'function')) {
      continue;
    }
    var pluralized = pluralize.plural(resource);
    if (method === 'getAll') {
      registerRoute('get', '' + config.apiPrefix + '/' + pluralized, fn);
    } else if (method === 'post') {
      registerRoute(method, config.apiPrefix + '/' + pluralized, fn);
    } else {
      registerRoute(method, config.apiPrefix + '/' + pluralized + '/:id', fn);
    }
  }
}

module.exports = app;
