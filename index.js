'use strict';

exports.plugin = {
  async register(server, opts) {
    if (!opts.collections || !opts.collections.length) {
      return;
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
        if (!server[opts.namespace]) {
          server.decorate('server', opts.namespace, {});
        }
        server[opts.namespace][item] = collection;
      }
    });
  },
  pkg: require('./package.json')
};
