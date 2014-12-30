questions = require './data/questions'
actions = require './data/actions'
gentry = require '../lib'
should = require 'should'
path = require 'path'
rimraf = require 'rimraf'

answers =
  language: 'coffee'
  server: 'yes'
  persistence: 'localstorage'
  auth: 'facebook'

pkg =
  name: 'testapp'
  description: 'foo'
  org: 'wearefractal'
  author: 'fractal'

describe 'gentry', ->

  after (done) ->
    rimraf path.resolve('./test/autoScaffold'), (err) ->
      console.log err if err?
      done()

  describe 'scaffold', ->
    it 'should scaffold out project', (done) ->
      gentry.autoScaffold
        answers: answers
        pkg: pkg
        templateDir: './test/templates'
        dest: './test/autoScaffold'
      , ->
        done()

    #  gentry.runActions questions, actions, answers, ->
    #    done()