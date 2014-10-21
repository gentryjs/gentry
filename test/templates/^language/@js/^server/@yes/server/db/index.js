var async = require('async');
var goosestrap = require('goosestrap');
var join = require('path').join;
var config = require('../config');
var modelDir = join(__dirname, '../models/*');
var db = goosestrap(config.database, modelDir);

db.wipe = function(cb) {
  var fns;
  fns = db.modelNames();
  fns = fns.map(function(k) {
    return db.model(k);
  });
  fns = fns.map(function(m) {
    return function(done) {
      return m.remove(function() {
        return m.collection.dropAllIndexes(function() {
          return done();
        });
      });
    };
  });
  async.parallel(fns, cb);
  return db;
};

db.dump = function(modelName, cb) {
  var Model;
  if (typeof modelName === 'string') {
    Model = db.model(modelName);
  } else {
    Model = modelName;
  }
  Model.find({}, cb);
  return db;
};

db.import = function(modelName, models, cb) {
  var Model;
  if (typeof modelName === 'string') {
    Model = db.model(modelName);
  } else {
    Model = modelName;
  }
  async.map(models, Model.create.bind(Model), cb);
  return db;
};

module.exports = db;
