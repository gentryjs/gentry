var isObjectId = require('../../lib/isObjectId');
var db = require('../../db');
var User = db.model('User');

module.exports = function(req, res, next) {
  var isOwner;
  var q;
  if (typeof req.params.id !== 'string') {
    return next(new Error('Invalid id parameter'));
  }
  if (isObjectId(req.params.id)) {
    q = User.findById(req.params.id);
    isOwner = (req.user != null) && (String(req.user._id) === req.params.id);
  } else {
    q = User.findOne({
      username: req.params.id
    });
    isOwner = (req.user != null) && (String(req.user.username) === req.params.id || String(req.user.id) === req.params.id);
  }
  return q.exec(function(err, user) {
    if (err != null) {
      return next(err);
    }
    if (user == null) {
      return res.status(404).end();
    }
    user = user.toJSON();
    if (!isOwner) {
      delete user.token;
    }
    return res.status(200).json(user);
  });
};

