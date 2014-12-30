module.exports =

  language:
    prompt: 'Coffee or JS?'
    input:
      type: String
      enum: ['coffee', 'js']

      #enum:
      #  coffee:
      #    img: 'coffeesript.png'

  backend:
    prompt: 'node server?'
    input:
      type: Boolean

  persistence:
    prompt: 'persistence?'
    input:
      type: String
      enum: ->
        if @backend
          ['REST', 'firebase', 'localstorage']
        else
          ['firebase', 'localstorage']

  auth:
    prompt: 'type of auth?'
    input:
      type: String
      enum: ['none', 'facebook', 'twitter', 'email']

  build:
    prompt: 'build system?'
    input:
      type: String
      enum: ['gulp', 'grunt']