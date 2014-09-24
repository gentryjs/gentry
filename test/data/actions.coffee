module.exports = 

  language:
    coffee: ->
    js: (done) ->
      
      #gentry.cloneRepo 'https://github.com/fissionjs/generator/js', '/'

      setTimeout ->
        console.log 'js'      
        done()
      , 1000

  backend: (val) ->

    console.log "backend: #{val}"

  build:
    gulp: (done) -> 
      console.log 'gulp'


      done()
    grunt: -> console.log 'grunt'