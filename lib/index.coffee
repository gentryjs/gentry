async = require 'async'
doppel = require 'doppel'

module.exports = 

  autoScaffold: ({questions, actions, answers, templateDir, done}) ->

    async.eachSeries Object.keys(answers), (key, next) ->

      question = questions[key]
      answer = answers[key]

      doppel.doppel
        templateDir: templateDir
        to: '/Users/funkytek/apps/tmp/GENTRY'
        key: key
        answer: answer
        sandbox:
          answers: answers
        done: ->
          console.log 'done'
          done()
      

  runActions: (questions, actions, answers, done) ->

    async.eachSeries Object.keys(answers), (key, next) ->

      question = questions[key]

      isString = -> question.input.type is String
      isEnum   = -> (question.input.type is String) and question.input.enum?      

      isKeyAction    = -> actions[key]?
      isAnswerAction = -> actions[key]?[answers[key]]?

      callAnswerKey  = -> actions[key]?[answers[key]]?.bind(answers: answers) next
      passVal        = -> actions[key]? answers[key], next

      next() unless isKeyAction() or isAnswerAction()
     
      if isEnum() then callAnswerKey()
      else if isString() then passVal()
      else callAnswerKey()
    
    , done


