should = require 'should'
isObjectId = require '../../lib/isObjectId'

describe 'isObjectId()', ->
  it 'should return true with a valid object id', (done) ->
    isObjectId('5334f0d048a8a284d9d9c800').should.equal true
    done()

  it 'should return false with an invalid object id (wrong type)', (done) ->
    isObjectId(123).should.equal false
    done()

  it 'should return false with an invalid object id (wrong length)', (done) ->
    isObjectId('5334').should.equal false
    done()
