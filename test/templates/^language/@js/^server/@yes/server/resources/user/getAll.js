var db = require('../../db');
var User = db.model('User');

module.exports = function(req, res, next) {
  var q;
  if (!req.isAuthenticated()) {
    return res.status(403).end();
  }
  q = User.find();
  q.select('-token');
  q.limit(3);
  return q.exec(function(err, users) {
    if (err != null) {
      return next(err);
    }
    return res.status(200).json(users);
  });
};
