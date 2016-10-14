'use strict';

exports.register = (server, opts, next) => {

  if (!opts.collections || !opts.collections.length || typeof server.plugins['hapi-mongodb'] !== 'object') {
    return next();
  }

  const db = server.plugins['hapi-mongodb'].db;

  opts.collections.forEach(item => {
    const collection = db.collection(item);
    server.decorate('server', item, collection);
  });

  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
