var db = require('../../db');
var User = db.model('User');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var config = require('../../config');
var app = require('../express');

var handleFunction = function(token, tokenSecret, profile, cb) {
  return User.findOne({
    id: profile.id
  }, function(err, user) {
    var profileUpdate;
    if (err != null) {
      return cb(err);
    }
    profileUpdate = {
      id: String(profile._json.id),
      token: token,
      tokenSecret: tokenSecret,
      name: profile._json.name,
      username: profile._json.screen_name,
      description: profile._json.description,
      followers: profile._json.followers_count,
      location: profile._json.location,
      banner: profile._json.profile_banner_url,
      image: profile._json.profile_image_url_https,
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
        console.log(err, doc);
        if (err != null) {
          return cb(err);
        }
        return cb(null, doc);
      });
    }
  });
};

var strategy = new Strategy({
  consumerKey: config.twitter.consumerKey,
  consumerSecret: config.twitter.consumerSecret,
  callbackURL: config.twitter.callback
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

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/login?failed=true'
}));

app.get('/logout', function(req, res) {
  req.logout();
  return res.redirect('/');
});

module.exports = passport;
