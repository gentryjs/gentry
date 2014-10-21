db = require '../../db'
User = db.model 'User'
passport = require 'passport'
{Strategy} = require 'passport-facebook'
config = require '../../config'
app = require '../express'
express = require 'express'
request = require 'request'


handleFunction = (token, tokenSecret, profile, cb) ->
  console.log token, tokenSecret, profile
  User.findOne {id: profile.id}, (err, user) ->
    return cb err if err?
    request {url: "https://graph.facebook.com/#{profile.id}?fields=cover", timeout: 600}, (err, res, body) ->      try
      banner = '' if err?
      try
        json = JSON.parse body
        banner = json.cover.source
      catch e
        banner = ''

      profileUpdate =
        id: String profile._json.id
        token: token
        tokenSecret: tokenSecret
        name: profile._json.name
        username: profile._json.username
        description: profile._json.bio
        location: profile._json.locale
        banner: banner
        image: "http://graph.facebook.com/#{profile._json.username}/picture?type=large"
        website: profile._json.url
        verified: profile._json.verified
      if user?
        console.log "user exists"
        user.set profileUpdate
        user.save cb
      else
        console.log "user doesn't exist"
        User.create profileUpdate, (err, doc) ->
          return cb err if err?
          cb null, doc

strategy = new Strategy
  clientID: config.facebook.clientID
  clientSecret: config.facebook.clientSecret
  callbackURL: config.facebook.callback
, handleFunction

passport.use strategy
passport.serializeUser (user, cb) ->
  cb null, user.id

passport.deserializeUser (id, cb) ->
  User.findOne {id:String(id)}, cb

app.use passport.initialize()
app.use passport.session()

app.get '/auth/facebook', passport.authenticate 'facebook'
app.get '/auth/facebook/callback', passport.authenticate 'facebook',
  successRedirect: '/'
  failureRedirect: '/login?failed=true'

app.get '/logout', (req, res) ->
  req.logout()
  res.redirect '/'

module.exports = passport
