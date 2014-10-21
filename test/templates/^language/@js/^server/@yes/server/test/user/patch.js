var setup = require('../setup');
var app = require('../../start');
var config = require('../../config');
var db = require('../../db');
var User = db.model('User');
var request = require('supertest');
var should = require('should');
var mock = require('./mock');
require('mocha');

describe('User PATCH', function() {
  beforeEach(db.wipe);
  beforeEach(function(cb) {
    return User.create(mock, cb);
  });

  it('should respond with 403 when not logged in', function(done) {
    return request(app)
      .patch(config.apiPrefix + '/users/123')
      .set('Accept', 'application/json')
      .expect(403, done);
  });

  it('should respond with 403 when logged in but not owner', function(done) {
    var mod = {
      name: 'James'
    };
    return request(app)
      .patch(config.apiPrefix + '/users/' + mock._id)
      .set('Accept', 'application/json')
      .query(setup.user.createQuery(setup.newId()))
      .send(mod)
      .expect(403, done);
  });

  it('should respond with 200 and information when logged in', function(done) {
    var mod = {
      name: 'Mike'
    };
    return request(app)
      .patch(config.apiPrefix + '/users/' + mock._id)
      .set('Accept', 'application/json')
      .query(setup.user.createQuery(mock._id))
      .send(mod)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err != null) {
          return done(err);
        }
        should.exist(res.body);
        res.body.should.be.type('object');
        res.body._id.should.equal(mock._id);
        res.body.name.should.equal('Mike');
        return done();
      });
  });
});
