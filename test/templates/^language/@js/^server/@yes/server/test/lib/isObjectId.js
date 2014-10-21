var should = require('should');
var isObjectId = require('../../lib/isObjectId');

describe('isObjectId()', function() {
  it('should return true with a valid object id', function(done) {
    isObjectId('5334f0d048a8a284d9d9c800').should.equal(true);
    return done();
  });
  it('should return false with an invalid object id (wrong type)', function(done) {
    isObjectId(123).should.equal(false);
    return done();
  });
  return it('should return false with an invalid object id (wrong length)', function(done) {
    isObjectId('5334').should.equal(false);
    return done();
  });
});
