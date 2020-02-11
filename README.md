# @nuxtjs/localforage

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> [Localforage](https://github.com/localForage/localForage) module for Nuxt.js

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `@nuxtjs/localforage` dependency to your project

```bash
yarn add --dev @nuxtjs/localforage # or npm install --save-dev @nuxtjs/localforage
```

2. Add `@nuxtjs/localforage` to the `buildModules` section of `nuxt.config.js`

```js
export default {
  buildModules: [
    // Simple usage
    '@nuxtjs/localforage',

    // With options
    ['@nuxtjs/localforage', { /* module options */ }]
  ]
}
```

:warning: If you are using Nuxt **< v2.9** you have to install the module as a `dependency` (No `--dev` or `--save-dev` flags) and use `modules` section in `nuxt.config.js` instead of `buildModules`.

### Using top level options

```js
export default {
  buildModules: [
    '@nuxtjs/localforage'
  ],
  localforage: {
    /* module options */
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

### `instances` (optional)

- Default: `[]`

You can create multiple instances.

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

## Advanced Usage

You can register multiple instances, see below:

```js
// nuxt.config.js
export default {
  buildModules: [
    '@nuxtjs/localforage'
  ],
  
  localforage: {
    instances: [{
      name: 'myApp',
      storeName: 'images'
    }, {
      name: 'myApp',
      storeName: 'fileSystem'
    }]
  }
}

// for images
await this.$localforage.images.setItem(key, value)

// for fileSystem
await this.$localforage.fileSystem.setItem(key, value)
```

## Development

- Clone this repository
- Install dependnecies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Nuxt Community

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/localforage/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/@nuxtjs/localforage

[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxtjs/localforage.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/localforage

[circle-ci-src]: https://img.shields.io/circleci/project/github/nuxt-community/localforage-module.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/nuxt-community/localforage-module

[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/localforage-module.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/nuxt-community/localforage-module

[license-src]: https://img.shields.io/npm/l/@nuxtjs/localforage.svg?style=flat-square
[license-href]: https://npmjs.com/package/@nuxtjs/localforage
