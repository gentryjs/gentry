var isObjectId = require('../../lib/isObjectId');
var db = require('../../db');
var User = db.model('User');
var canModify = ['name', 'description'];

module.exports = function(req, res, next) {

  if (!req.isAuthenticated()) {
    return res.status(403).end();
  }
  if (!isObjectId(req.params.id)) {
    return next(new Error('Invalid id parameter'));
  }
  if (req.params.id !== String(req.user._id)) {
    return res.status(403).end();
  }
  if (typeof req.body !== 'object') {
    return next(new Error('Invalid body'));
  }
  var _ref = req.body;
  var v;
  for (var k in _ref) {
    v = _ref[k];
    if (canModify.indexOf(k) === -1) {
      delete req.body[k];
    }
  }
  var q = User.findById(req.params.id);
  return q.exec(function(err, user) {
    if (err != null) {
      return next(err);
    }
    user.set(req.body);
    return user.save(function(err, nuser) {
      if (err != null) {
        return next(err);
      }
      return res.status(200).json(nuser.toJSON());
    });
  });
};
