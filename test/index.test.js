/* globals describe, before, after, it */
'use strict';
const chai = require('chai');
const assert = chai.assert;
const Hapi = require('hapi');

const launchServer = (server, port, mongoOpts, pluginOpts, done) => {
  server.connection({ port });
  server.register([
    {
      register: require('hapi-mongodb'),
      options: mongoOpts
    },
    {
      register: require('../'),
      options: pluginOpts
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
const pluginOpts = {
  collections: ['testcollection']
};

describe('hapi-mongodb-collections', () => {
  before(done => {
    server = new Hapi.Server();
    launchServer(server, port, mongoOpts, pluginOpts, done);
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
    launchServer(server, port, mongoOpts, pluginOpts, done);
  });
  after(done => {
    server.stop(done);
  });

  it('should work', done => {
    assert(typeof server.testcollection === 'object', 'Collection exists');
    assert(typeof server.testcollection.find === 'function', 'Has functions');
    done();
  });
});

describe('hapi-mongodb-collections namespace', () => {
  before(done => {
    server = new Hapi.Server();
    mongoOpts.decorate = true;
    pluginOpts.namespace = 'dbCollections';
    pluginOpts.collections = ['stamps', 'rocks'];

    launchServer(server, port, mongoOpts, pluginOpts, done);
  });
  after(done => {
    server.stop(done);
  });

  it('should be able to specify a namespace', done => {
    assert(typeof server.dbCollections.stamps === 'object', 'Collection exists');
    assert(typeof server.dbCollections.rocks === 'object', 'Multiple collections can be in same namespace');
    assert(typeof server.dbCollections.stamps.find === 'function', 'Has functions');
    done();
  });
});
