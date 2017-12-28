'use strict';
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const code = require('code');

const Hapi = require('hapi');

lab.experiment('hapi-mongo-collections', () => {
  // Define the options --
  const mongoOpts = {
    url: 'mongodb://localhost:27017/hapimongocoll'
  };
  const pluginOpts = {
    collections: ['testcollection']
  };

  let server;
  lab.before(async() => {
    server = new Hapi.Server({ port: 8080 });  

    await server.register({
      plugin: require('hapi-mongodb'),
      options: mongoOpts
    });

    await server.register({
      plugin: require('../'),
      options: pluginOpts
    });
  });

  lab.after(async() => {
    await server.stop();
  });

  lab.test('it should decorate the server', () => {
    code.expect(server.testcollection).to.be.an.object();
    code.expect(server.testcollection.find).to.be.a.function();
  });
});

lab.experiment('hapi-mongodb-collections decorated', () => {
  // Define the options --
  const mongoOpts = {
    url: 'mongodb://localhost:27017/hapicollectiondec',
    decorate: true
  };
  const pluginOpts = {
    collections: ['testcollection']
  };

  let server;
  lab.before(async() => {
    server = new Hapi.Server({ port: 8080 });  

    await server.register({
      plugin: require('hapi-mongodb'),
      options: mongoOpts
    });

    await server.register({
      plugin: require('../'),
      options: pluginOpts
    });
  });

  lab.after(async() => {
    await server.stop();
  });

  lab.test('it should decorate the server as well', () => {
    code.expect(server.testcollection).to.be.an.object();
    code.expect(server.testcollection.find).to.be.a.function();
  });
});

lab.experiment('hapi-mongodb-collections w/namespace', () => {
  // Define the options --
  const mongoOpts = {
    url: 'mongodb://localhost:27017/hapicollectiondec',
    decorate: true
  };
  const pluginOpts = {
    collections: ['stamps', 'rocks'],
    namespace: 'colls'
  };

  let server;
  lab.before(async() => {
    server = new Hapi.Server({ port: 8080 });  

    await server.register({
      plugin: require('hapi-mongodb'),
      options: mongoOpts
    });

    await server.register({
      plugin: require('../'),
      options: pluginOpts
    });
  });

  lab.after(async() => {
    await server.stop();
  });

  lab.test('it should decorate the server as well', () => {
    code.expect(server.colls.stamps).to.be.an.object();
    code.expect(server.colls.rocks).to.be.an.object();
    code.expect(server.colls.stamps.find).to.be.a.function();
  });
});
