async = require 'async'

module.exports = 

  scaffold: (questions, actions, answers, done) ->

    async.eachSeries Object.keys(answers), (key, next) ->

      question = questions[key]

      isString = -> question.input.type is String
      isEnum   = -> (question.input.type is String) and question.input.enum?      

      isKeyAction    = -> actions[key]?
      isAnswerAction = -> actions[key]?[answers[key]]?

      callAnswerKey  = -> actions[key]?[answers[key]]? next
      passVal        = -> actions[key]? answers[key], next

      next() unless isKeyAction() or isAnswerAction()
     
      if isEnum() then callAnswerKey()
      else if isString() then passVal()
      else callAnswerKey()
    
    , done


