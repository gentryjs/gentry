var setup = require('../setup');
var app = require('../../start');
var config = require('../../config');
var db = require('../../db');
var User = db.model('User');
var request = require('supertest');
var should = require('should');
var mock = require('./mock');

require('mocha');

describe('User GET', function() {
  beforeEach(db.wipe);
  beforeEach(function(cb) {
    return User.create(mock, cb);
  });
  it('should respond with 200 and information when logged in', function(done) {
    return request(app)
      .get(config.apiPrefix + '/users/' + mock._id)
      .set('Accept', 'application/json')
      .query(setup.user.createQuery(mock._id))
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err != null) {
          return done(err);
        }
        should.exist(res.body);
        res.body.should.be.type('object');
        res.body._id.should.equal(mock._id);
        return done();
      });
  });
  it('should respond with 200 and information when not logged in', function(done) {
    return request(app)
      .get(config.apiPrefix + '/users/' + mock._id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/).expect(200)
      .end(function(err, res) {
        if (err != null) {
          return done(err);
        }
        should.exist(res.body);
        res.body.should.be.type('object');
        res.body._id.should.equal(mock._id);
        should.not.exist(res.body.token, 'should not show user token');
        return done();
      });
  });
  it('should respond with 200 and information when logged in with username query', function(done) {
    return request(app)
      .get(config.apiPrefix + '/users/' + mock.username)
      .set('Accept', 'application/json')
      .query(setup.user.createQuery(mock._id))
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err != null) {
          return done(err);
        }
        should.exist(res.body);
        res.body.should.be.type('object');
        res.body._id.should.equal(mock._id);
        return done();
      });
  });
  return it('should respond with 200 and information when not logged in with username query', function(done) {
    return request(app)
      .get(config.apiPrefix + '/users/' + mock.username)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err != null) {
          return done(err);
        }
        should.exist(res.body);
        res.body.should.be.type('object');
        res.body._id.should.equal(mock._id);
        return done();
      });
    });
});
