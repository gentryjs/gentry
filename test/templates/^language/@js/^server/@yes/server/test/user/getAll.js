var setup = require('../setup');
var app = require('../../start');
var config = require('../../config');
var db = require('../../db');
var User = db.model('User');
var request = require('supertest');
var should = require('should');
require('mocha');

var mock = require('./mock');

describe('User GET plural', function() {
  beforeEach(db.wipe);
  beforeEach(function(cb) {
    return User.create(mock, cb);
  });

  it('should respond with 200 when not logged in', function(done) {
    return request(app)
      .get(config.apiPrefix + '/users')
      .set('Accept', 'application/json')
      .expect(403, done);
  });

  it('should respond with 200 and information when logged in', function(done) {
    return request(app)
      .get(config.apiPrefix + '/users')
      .set('Accept', 'application/json')
      .query(setup.user.createQuery(mock._id))
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err != null) {
          return done(err);
        }
        should.exist(res.body);
        Array.isArray(res.body).should.equal(true);
        res.body.length.should.equal(1);
        res.body[0]._id.should.equal(mock._id);
        should.not.exist(res.body[0].token, 'should not show user token');
        return done();
      });
  });
});

