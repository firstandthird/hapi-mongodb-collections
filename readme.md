## hapi-mongodb-collections

A [hapi](https://hapi.dev/) helper that makes it easier to access your mongodb collections.

No more
```javascript
server.plugins['hapi-mongodb'].db.collection('myCollection').find({});
```

instead you just do:

```javascript
server.myCollection.find({});
```

## Installation

```console
npm install hapi-mongodb-collections
```

## Use

First make sure you have registered [hapi-mongodb](https://github.com/Marsup/hapi-mongodb)
with the server.  Then register hapi-mongodb-collections and specify the collections you want to make available directory from your server object.

## Example

```javascript
const plugin = require('hapi-mongodb-collections');
await server.register({
  plugin,
  options: {
    collections: [
      'myCoinCollection',
      'myShellCollection',
      'myStampCollection'
    ]
  }
});
```
   will make it possible to do:

```javascript
await server.myCoinCollection.find({ type: 'dimes' });
```

## Options

Options:
- __collections__ (required)
  An array of collection names.
- __namespace__
  If you want to put your collections under a namespace, you can.  So for example passing:
  ```javascript
  {
    collections: [
      'myCoinCollection'
    ],
    namespace: 'collections'
  }
  ```
   in your plugin options will let you make queries like so:

   ```javascript
    server.collections.myCoinCollection.find({ type: "dimes" })
   ```
