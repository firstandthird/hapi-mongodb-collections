'use strict';

exports.register = (server, opts, next) => {
  if (!opts.collections || !opts.collections.length) {
    return next();
  }

  let db;

  if (server.mongo && typeof server.mongo.db === 'object') {
    db = server.mongo.db;
  } else {
    db = server.plugins['hapi-mongodb'].db;
  }
  opts.collections.forEach(item => {
    const collection = db.collection(item);
    if (!opts.namespace) {
      server.decorate('server', item, collection);
    } else {
      server.decorate('server', opts.namespace, {});
      server[opts.namespace][item] = collection;
    }
  });
  next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
