var passport = require('passport');
var mongoose = require('mongoose');
var db = require('../db');
var User = db.model('User');

require('mocha');

var originalInit = passport.initialize();

var hookedInit = function(req, res, next) {
  if (req.query._user == null) {
    return originalInit(req, res, next);
  }
  req._passport = {
    instance: passport
  };
  return User.findById(String(req.query._user), function(err, user) {
    if (err != null) {
      return next(err);
    }
    req._passport.session = {
      user: user
    };
    req.user = user;
    return next();
  });
};

passport.initialize = function() {
  return hookedInit;
};

var setupTest = {
  newId: function() {
    return String(mongoose.Types.ObjectId());
  },
  user: {
    createQuery: function(id) {
      return {
        _user: id
      };
    }
  }
};

module.exports = setupTest;

