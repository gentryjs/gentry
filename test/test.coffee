questions = require './data/questions'
actions = require './data/actions'
gentry = require '../lib'

answers = 
  language: 'js'
  backend: 'foo'
  persistence: 'localstorage'
  auth: 'none'
  build: 'gulp'


should = require 'should'

describe 'gentry', ->
  describe 'scaffold', ->
    it 'should scaffold out project', (done) ->

      gentry.scaffold questions, actions, answers, ->
        done()

