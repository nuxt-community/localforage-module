# localforage
[![npm (scoped with tag)](https://img.shields.io/npm/v/localforage/latest.svg?style=flat-square)](https://npmjs.com/package/localforage)
[![npm](https://img.shields.io/npm/dt/localforage.svg?style=flat-square)](https://npmjs.com/package/localforage)
[![CircleCI](https://img.shields.io/circleci/project/github/.svg?style=flat-square)](https://circleci.com/gh/)
[![Codecov](https://img.shields.io/codecov/c/github/.svg?style=flat-square)](https://codecov.io/gh/)
[![Dependencies](https://david-dm.org//status.svg?style=flat-square)](https://david-dm.org/)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

> 

## Setup
- Add `@nuxtjs/localforage` dependency using yarn or npm to your project
- Add `@nuxtjs/localforage` to `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    '@nuxtjs/localforage'
 ]
}
```

## Options
`nuxt.config.js`

```js
{
  // You can pass options in modules
  modules: [
    // With options
    ['@nuxtjs/localforage', {
      driver      : localforage.WEBSQL, // Force WebSQL; same as using setDriver()
      name        : 'myApp',
      version     : 1.0,
      size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
      storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
      description : 'some description'
    }],
  ],
  // OR localforage object
  localforage: {
    driver      : localforage.WEBSQL, // Force WebSQL; same as using setDriver()
    name        : 'myApp',
    version     : 1.0,
    size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
    description : 'some description'
  }
}
```

##### driver
The preferred driver(s) to use. Same format as what is passed to `setStorageDriver()`, above.
Default: `[localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE]`
##### name
The name of the database. May appear during storage limit prompts. Useful to use the name of your app here. In localStorage, this is used as a key prefix for all keys stored in localStorage.
Default: `'localforage'`
##### size
The size of the database in bytes. Used only in WebSQL for now.
Default: `4980736`
##### storeName
The name of the datastore. In IndexedDB this is the dataStore, in WebSQL this is the name of the key/value table in the database. Must be alphanumeric, with underscores. Any non-alphanumeric characters will be converted to underscores.
Default: `'keyvaluepairs'`
##### version
The version of your database. May be used for upgrades in the future; currently unused.
Default: `1.0`
##### description
A description of the database, essentially for developer usage.
Default: `''`

[More informations on LocalForage documentation](https://github.com/localForage/localForage)

## Usage

### Get item

```js
let item = await this.$localForage.getItem(key, callback)
```

### Set item

```js
await this.$localForage.setItem(key, value, callback)
```

### Remove item

```js
await this.$localForage.removeItem(key, callback)
```

### Clear

```js
await this.$localForage.clear
```

### Gets the length

```js
let length = await this.$localForage.length
```

### Get the name of a key based on its ID

```js
let k = await this.$localForage.key(keyIndex, callback)
```

### Get the list of all keys

```js
let keys = await this.$localForage.keys(callback)
```


### Force usage of a particular driver or drivers, if available.

```js
this.$localForage.setDriver(localforage.LOCALSTORAGE)
```

By default, localForage selects backend drivers for the datastore in this order:

1. IndexedDB
2. WebSQL
3. localStorage

If you would like to force usage of a particular driver you can use $setStorageDriver() with one or more of the following parameters.

localforage.INDEXEDDB

localforage.WEBSQL

localforage.LOCALSTORAGE


## Development

- Clone this repository
- Install dependnecies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

