var db = require('../../db');
var User = db.model('User');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var config = require('../../config');
var app = require('../express');
var request = require('request');

var handleFunction = function(token, tokenSecret, profile, cb) {
  console.log(token, tokenSecret, profile);
  return User.findOne({
    id: profile.id
  }, function(err, user) {
    if (err != null) {
      return cb(err);
    }
    return request({
      url: 'https://graph.facebook.com/' + profile.id + '?fields=cover',
      timeout: 600
    }, function(err, res, body) {
      var banner, e, json, profileUpdate;
      try {
        if (err != null) {
          banner = '';
        }
        try {
          json = JSON.parse(body);
          banner = json.cover.source;
        } catch (_error) {
          e = _error;
          banner = '';
        }
        profileUpdate = {
          id: String(profile._json.id),
          token: token,
          tokenSecret: tokenSecret,
          name: profile._json.name,
          username: profile._json.username,
          description: profile._json.bio,
          location: profile._json.locale,
          banner: banner,
          image: 'http://graph.facebook.com/' + profile._json.username + '/picture?type=large',
          website: profile._json.url,
          verified: profile._json.verified
        };
        if (user != null) {
          console.log('user exists');
          user.set(profileUpdate);
          return user.save(cb);
        } else {
          console.log('user does not exist');
          return User.create(profileUpdate, function(err, doc) {
            if (err != null) {
              return cb(err);
            }
            return cb(null, doc);
          });
        }
      } catch (_error) {}
    });
  });
};

var strategy = new Strategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callback
}, handleFunction);

passport.use(strategy);

passport.serializeUser(function(user, cb) {
  return cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  return User.findOne({
    id: String(id)
  }, cb);
});

app.use(passport.initialize());

app.use(passport.session());

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login?failed=true'
}));

app.get('/logout', function(req, res) {
  req.logout();
  return res.redirect('/');
});

module.exports = passport;

