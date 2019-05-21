# @nuxtjs/localforage

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![Dependencies][david-dm-src]][david-dm-href]
[![Standard JS][standard-js-src]][standard-js-href]

> [Localforage](https://github.com/localForage/localForage) module for Nuxt.js

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add the `@nuxtjs/localforage` dependency with `yarn` or `npm` to your project
2. Add `@nuxtjs/localforage` to the `modules` section of `nuxt.config.js`
3. Configure it:

```js
{
  modules: [
    // Simple usage
    '@nuxtjs/localforage',

    // With options
    ['@nuxtjs/localforage', {
      driver: localforage.WEBSQL, // Force WebSQL; same as using setDriver()
      name: 'myApp',
      version: 1.0,
      size: 4980736, // Size of database, in bytes. WebSQL-only for now.
      storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores.
      description: 'some description'
    }]
  ]
}
```

### Using top level options

```js
{
  modules: [
    '@nuxtjs/localforage'
  ],
  localforage: {
    driver: localforage.WEBSQL, // Force WebSQL; same as using setDriver()
    name: 'myApp',
    version: 1.0,
    size: 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores.
    description: 'some description'
  }
}
```

## Options

### driver (optional)

- Default: `[localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE]`

The preferred driver(s) to use. Same format as what is passed to `setStorageDriver()`, above.

### name (optional)

- Default: `'nuxtJS'`

The name of the database. May appear during storage limit prompts. Useful to use the name of your app here. In localStorage, this is used as a key prefix for all keys stored in localStorage.

### version (optional)

- Default: `1.0`

The version of your database. May be used for upgrades in the future; currently unused.

### size (optional)

- Default: `4980736`

The size of the database in bytes. Used only in WebSQL for now.

### storeName (optional)

- Default: `'nuxtLocalForage'`

The name of the datastore. In IndexedDB this is the dataStore, in WebSQL this is the name of the key/value table in the database. Must be alphanumeric, with underscores. Any non-alphanumeric characters will be converted to underscores.

### description (optional)

- Default: `''`

A description of the database, essentially for developer usage.

[More informations on LocalForage documentation](https://github.com/localForage/localForage)

## Usage

### Get item

```js
let item = await this.$localForage.getItem(key)
```

### Set item

```js
await this.$localForage.setItem(key, value)
```

### Remove item

```js
await this.$localForage.removeItem(key)
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
let k = await this.$localForage.key(keyIndex)
```

### Get the list of all keys

```js
let keys = await this.$localForage.keys()
```

### Force usage of a particular driver or drivers, if available

```js
this.$localForage.setDriver(localforage.LOCALSTORAGE)
```

By default, localForage selects backend drivers for the datastore in this order:

1. IndexedDB
2. WebSQL
3. localStorage

If you would like to force usage of a particular driver you can use $setStorageDriver() with one or more of the following parameters.

- localforage.INDEXEDDB
- localforage.WEBSQL
- localforage.LOCALSTORAGE

## Development

- Clone this repository
- Install dependnecies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Nuxt Community

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/dt/@nuxtjs/localforage-module.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/@nuxtjs/localforage-module

[npm-downloads-src]: https://img.shields.io/npm/v/@nuxtjs/localforage-module/latest.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/localforage-module

[circle-ci-src]: https://img.shields.io/circleci/project/github/nuxt-community/localforage-module.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/nuxt-community/localforage-module

[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/localforage-module.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/nuxt-community/localforage-module

[david-dm-src]: https://david-dm.org/nuxt-community/localforage-module/status.svg?style=flat-square
[david-dm-href]: https://david-dm.org/nuxt-community/localforage-module

[standard-js-src]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square
[standard-js-href]: https://standardjs.com
