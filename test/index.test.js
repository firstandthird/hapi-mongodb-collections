/* globals describe, before, it */
'use strict';
const chai = require('chai');
const assert = chai.assert;
const Hapi = require('hapi');

const launchServer = (server, port, done) => {
  server.connection({ port });
  server.register([
    {
      register: require('hapi-mongodb')
    },
    {
      register: require('../'),
      options: {
        collections: ['testcollection']
      }
    }
  ], (err) => {
    assert(err === undefined);
    server.start((startErr) => {
      if (startErr) {
        return done(startErr);
      }
      done();
    });
  });
};

const server = new Hapi.Server();
const port = 8083;

describe('hapi-mongodb-collections', () => {
  before((done) => {
    launchServer(server, port, done);
  });

  it('should decorate server', done => {
    assert(typeof server.testcollection === 'object', 'Collection exists');
    assert(typeof server.testcollection.find === 'function', 'Has functions');
    done();
  });
});
