config   = require '../config'
{Schema} = require 'mongoose'
goose    = require 'goosestrap'
seedling = require 'seedling'
{join}   = require 'path'

modelDir = join __dirname, '../models/*'
db = goose config.database, modelDir

seeds =
  User: require './User'

seed = new seedling db, seeds,
  FB_USER: "danny.rand.16752"

console.log "connecting to #{config.database}"

seed.clear ->
  seed.create (err) ->
    console.log err if err?
    process.exit()
