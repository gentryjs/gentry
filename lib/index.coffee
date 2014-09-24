async = require 'async'

module.exports = 

  scaffold: (questions, actions, answers, done) ->

    async.eachSeries Object.keys(answers), (key, next) ->

      next() unless actions[key]?[answers[key]]?
      if questions[key].input.type is String
        actions[key]? answers[key], next
      else
        actions[key]?[answers[key]]? next

    , done
