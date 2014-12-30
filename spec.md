
language:
  prompt: 'Coffee or JS'
  input:
    type: enum
    options: ['coffee', 'js']


backend:
  prompt: 'server or no server?'
  input:
    type: Boolean

persistence:
  prompt: 'persistence'
  input:
    type: enum
    options: ->
      if @backend
        ['REST', firebase', 'localstorage']
      else
        ['firebase', 'localstorage']

auth:
  prompt: 'type of auth'
  input:
    type: enum
    options: ['none', 'facebook', 'twitter', 'email']

build:
  prompt: 'build system'
  input:
    type: enum
    options: ['gulp', 'grunt']



/templates
 /language
   /base
   /coffee
   /js

/impl
  /language
    /templates
    coffee.coffee
    js.coffee
  /backend
    true.coffee
    false.coffee
  /persistence
    REST.coffee
    firebase.coffee
    localstorage.coffee


language:
  coffee: ->
    cp '/coffee/**', '/'
  js: ->

build:
  gulp: ->
  grunt: ->
