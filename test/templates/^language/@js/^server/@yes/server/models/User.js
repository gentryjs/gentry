
var Schema = require('mongoose').Schema;

var noWrite = function() {
  var perms;
  perms = {
    read: true,
    write: false
  };
  return perms;
};

var hidden = function() {
  var perms;
  perms = {
    read: false,
    write: false
  };
  return perms;
};

var User = new Schema({
  name: {
    type: String,
    required: true,
    authorize: noWrite
  },
  id: {
    type: String,
    required: true,
    index: {
      unique: true
    },
    authorize: noWrite
  },
  token: {
    type: String,
    required: true,
    select: true,
    authorize: hidden
  },
  tokenSecret: {
    type: String,
    select: true,
    authorize: hidden
  },
  image: {
    type: String,
    authorize: noWrite,
    'default': 'https://si0.twimg.com/sticky/default_profile_images/default_profile_0_normal.png'
  },
  banner: {
    type: String
  },
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    },
    authorize: noWrite
  },
  description: {
    type: String,
    authorize: noWrite
  },
  website: {
    type: String,
    authorize: noWrite
  },
  location: {
    type: String,
    authorize: noWrite
  },
  followers: {
    type: Number,
    'default': 0,
    authorize: noWrite
  },
  verified: {
    type: Boolean,
    'default': false,
    authorize: noWrite
  },
  online: {
    type: Boolean,
    'default': false,
    authorize: noWrite
  },
  created: {
    type: Date,
    'default': Date.now,
    authorize: noWrite
  },
  lastModified: {
    type: Date,
    'default': Date.now,
    authorize: noWrite
  }
});

User.set('toJSON', {
  getters: true,
  virtuals: true
});

User.set('toObject', {
  getters: true,
  virtuals: true
});

User.methods.authorize = function(req) {
  var perms;
  perms = {
    read: true,
    write: req.user.username === this.username,
    'delete': false
  };
  return perms;
};

User.statics.authorize = function() {
  var perms;
  perms = {
    read: true,
    write: false
  };
  return perms;
};

User.statics.me = function(req, cb) {
  return cb(null, req.user);
};

User.statics.byHandle = function(_arg, cb) {
  var query;
  query = _arg.query;
  if (!(typeof query.username === 'string' && query.username.length > 0)) {
    return cb(new Error('Missing username parameter'));
  }
  return this.findOne({
    username: query.username
  }, cb);
};

module.exports = User;
