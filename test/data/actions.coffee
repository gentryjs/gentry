module.exports =

  language:
    coffee: ->
    js: (done) ->
      setTimeout ->
        #console.log 'js'
        done()
      , 1000

  backend:
    yes: (done) ->
      done()

  persistence:
    localstorage: (done) ->
      done()

  auth:
    none: (done) -> done()

  build:
    gulp: (done) ->
      #console.log 'gulp'
      done()
