db = require '../../db'
User = db.model 'User'
passport = require 'passport'
{Strategy} = require 'passport-twitter'
config = require '../../config'
app = require '../express'
express = require 'express'


handleFunction = (token, tokenSecret, profile, cb) ->
  User.findOne {id: profile.id}, (err, user) ->
    return cb err if err?
    profileUpdate =
      id: String profile._json.id
      token: token
      tokenSecret: tokenSecret
      name: profile._json.name
      username: profile._json.screen_name
      description: profile._json.description
      followers: profile._json.followers_count
      location: profile._json.location
      banner: profile._json.profile_banner_url
      image: profile._json.profile_image_url_https
      website: profile._json.url
      verified: profile._json.verified
    if user?
      console.log "user exists"
      user.set profileUpdate
      user.save cb
    else
      console.log "user doesn't exist"
      User.create profileUpdate, (err, doc) ->
        console.log err, doc
        return cb err if err?
        cb null, doc

strategy = new Strategy
  consumerKey: config.twitter.consumerKey
  consumerSecret: config.twitter.consumerSecret
  callbackURL: config.twitter.callback
, handleFunction

passport.use strategy
passport.serializeUser (user, cb) ->
  cb null, user.id

passport.deserializeUser (id, cb) ->
  User.findOne {id:String(id)}, cb

app.use passport.initialize()
app.use passport.session()

app.get '/auth/twitter', passport.authenticate 'twitter'
app.get '/auth/twitter/callback', passport.authenticate 'twitter',
  successRedirect: '/'
  failureRedirect: '/login?failed=true'

app.get '/logout', (req, res) ->
  req.logout()
  res.redirect '/'

module.exports = passport
