var passport = require('passport');
var app = require('../express');
var createAuthScript = require('./createAuthScript');

app.use(passport.initialize());
app.use(passport.session());

app.get('/logout', function(req, res) {
  req.logout();
  return res.redirect('/');
});

app.get('/auth.js', function(req, res) {
  var src;
  src = createAuthScript(req.user);
  res.set('Content-Type', 'application/javascript');
  return res.send(200, src);
});

module.exports = passport;
