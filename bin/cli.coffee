readline = require 'readline'
async = require 'async'
gentry = require '../lib'
  
rl = readline.createInterface
  input: process.stdin
  output: process.stdout

gentry.askAll scaffold, (item, next) ->

  prompt = item.prompt
  if item.input.type is 'enum' 
    prompt += " [#{item.input.options}]"

  rl.question "#{prompt}: ", next

, (answers) ->

  rl.close()
  gentry.scaffold questions, transform, answers   





##

  answers = {}

  async.eachSeries Object.keys(scaffold), (k, next) ->
    v = scaffold[k]

    if typeof(v.input.options) is 'function'
      fn = v.input.options.bind(answers)
      v.input.options = fn()
        
    prompt = v.prompt 
    if v.input.type is 'enum' 
      prompt += " [#{v.input.options}]"

    rl.question "#{prompt}: ", (answer) ->      
      answers[k] = answer
      next()
  , ->

    rl.close()
    done answers