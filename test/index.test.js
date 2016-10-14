/* globals describe, before, after, it */
'use strict';
const chai = require('chai');
const assert = chai.assert;
const Hapi = require('hapi');

const launchServer = (server, port, mongoOpts, done) => {
  server.connection({ port });
  server.register([
    {
      register: require('hapi-mongodb'),
      options: mongoOpts
    },
    {
      register: require('../'),
      options: {
        collections: ['testcollection']
      }
    }
  ], (err) => {
    if (err) {
      console.log(err);
    }
    assert(err === undefined);
    server.start((startErr) => {
      if (startErr) {
        return done(startErr);
      }
      done();
    });
  });
};

let server;
const port = 8083;
const mongoOpts = {
  url: 'mongodb://localhost:27017',
  decorate: undefined
};

describe('hapi-mongodb-collections', () => {
  before(done => {
    server = new Hapi.Server();
    launchServer(server, port, mongoOpts, done);
  });

  after(done => {
    server.stop(done);
  });

  it('should decorate server', done => {
    assert(typeof server.testcollection === 'object', 'Collection exists');
    assert(typeof server.testcollection.find === 'function', 'Has functions');
    done();
  });
});

describe('hapi-mongodb-collections decorated', () => {
  before(done => {
    server = new Hapi.Server();
    mongoOpts.decorate = true;
    launchServer(server, port, mongoOpts, done);
  });

  it('should work', done => {
    assert(typeof server.testcollection === 'object', 'Collection exists');
    assert(typeof server.testcollection.find === 'function', 'Has functions');
    done();
  });
});
