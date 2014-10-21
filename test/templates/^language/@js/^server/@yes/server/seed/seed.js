var config = require('../config');
var goose = require('goosestrap');
var seedling = require('seedling');
var join = require('path').join;
var modelDir = join(__dirname, '../models/*');
var db = goose(config.database, modelDir);
var seeds = {
  User: require('./User')
};

var seed = new seedling(db, seeds, {
  FB_USER: 'danny.rand.16752'
});

console.log('connecting to ' + config.database);

seed.clear(function() {
  return seed.create(function(err) {
    if (err != null) {
      console.log(err);
    }
    return process.exit();
  });
});
