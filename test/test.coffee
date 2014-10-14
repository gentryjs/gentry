questions = require './data/questions'
actions = require './data/actions'
gentry = require '../lib'

answers = 
  language: 'js'
  backend: 'yes'
  persistence: 'localstorage'
  auth: 'none'
  build: 'gulp'


should = require 'should'

describe 'gentry', ->
  describe 'scaffold', ->
    it 'should scaffold out project', (done) ->
      gentry.runActions questions, actions, answers, ->
        done()