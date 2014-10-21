async = require 'async'
boba  = require 'boba'

module.exports = 

  # TODO: clone
  #clone: ->

  autoScaffold: ({answers, templateDir, dest}, done) ->

    throw new Error 'no answers provided' if !answers?
    throw new Error 'no template root provided' if !templateDir?

    console.log "scaffolding..."
    #dest ?= process.cwd()

    boba templateDir, dest, null,
      blacklist: ['.DS_Store']
      sandbox: answers
      key: answers.answers
      , (err, res) ->
        console.log "complete"
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


