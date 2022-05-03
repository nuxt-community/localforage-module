# @nuxtjs/localforage

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> [Localforage](https://github.com/localForage/localForage) module for Nuxt.js

[📖 **Release Notes**](./CHANGELOG.md)

**Note**: This version of the module is compatible with [Nuxt 3 and Nuxt Bridge](https://v3.nuxtjs.org/). If you're
looking for the Nuxt 2 version, check out [v1.1.0](https://github.com/nuxt-community/localforage-module/tree/v1.1.0).

## Setup

1. Add `@nuxtjs/localforage` dependency to your project

```bash
yarn add --dev @nuxtjs/localforage # or npm install --save-dev @nuxtjs/localforage
```

2. Add `@nuxtjs/localforage` to the `modules` section of `nuxt.config.js`

```js
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    // Simple usage
    '@nuxtjs/localforage',

    // With options
    ['@nuxtjs/localforage', { /* module options */ }]
  ]
})
```

### Using top level options

```js
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/localforage'
  ],
  localForage: {
    /* module options */
  }
})
```

## Options

### driver (optional)

- Default: `[localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE]`

The preferred driver(s) to use. Same format as what is passed to `setStorageDriver()`, above.

### name (optional)

- Default: `'nuxtJS'`

The name of the database. May appear during storage limit prompts. Useful to use the name of your app here. In
localStorage, this is used as a key prefix for all keys stored in localStorage.

### version (optional)

- Default: `1.0`

The version of your database. May be used for upgrades in the future; currently unused.

### size (optional)

- Default: `4980736`

The size of the database in bytes. Used only in WebSQL for now.

### storeName (optional)

- Default: `'nuxtLocalForage'`

The name of the datastore. In IndexedDB this is the dataStore, in WebSQL this is the name of the key/value table in the
database. Must be alphanumeric, with underscores. Any non-alphanumeric characters will be converted to underscores.

### description (optional)

- Default: `''`

A description of the database, essentially for developer usage.

### `instances` (optional)

- Default: `[]`

You can create multiple instances.

[More informations on LocalForage documentation](https://github.com/localForage/localForage)

## Usage

- In Composition API, you can access the `LocalForage` instance by using `const localForage = useLocalForage()`
  or `const { $localForage } = useNuxtApp()`.

- In Options API, you can access the `LocalForage` instance by using `this.$localForage`.

### Get item

```js
const localForage = useLocalForage()
let item = await localForage.getItem(key)
```

### Set item

```js
const localForage = useLocalForage()
await localForage.setItem(key, value)
```

### Remove item

```js
const localForage = useLocalForage()
await localForage.removeItem(key)
```

### Clear

```js
const localForage = useLocalForage()
await localForage.clear
```

### Gets the length

```js
const localForage = useLocalForage()
let length = await localForage.length
```

### Get the name of a key based on its ID

```js
const localForage = useLocalForage()
let k = await localForage.key(keyIndex)
```

### Get the list of all keys

```js
const localForage = useLocalForage()
let keys = await localForage.keys()
```

### Force usage of a particular driver or drivers, if available

```js
const localForage = useLocalForage()
localForage.setDriver(localforage.LOCALSTORAGE)
```

By default, localForage selects backend drivers for the datastore in this order:

1. IndexedDB
2. WebSQL
3. localStorage

If you would like to force usage of a particular driver you can use $setStorageDriver() with one or more of the
following parameters.

- localforage.INDEXEDDB
- localforage.WEBSQL
- localforage.LOCALSTORAGE

## Advanced Usage

You can register multiple instances, see below:

```js
// nuxt.config.js
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/localforage'
  ],

  localForage: {
    instances: [{
      name: 'myApp',
      storeName: 'images'
    }, {
      name: 'myApp',
      storeName: 'fileSystem'
    }]
  }
})

/**
 * Composition API
 */

  // for images
const imagesStorage = useLocalForage('images')
await imagesStorage.setItem(key, value)

// for fileSystem
const fileSystemStorage = useLocalForage('fileSystem')
await fileSystemStorage.setItem(key, value)

/**
 * Options API
 */

// for images
await this.$localforage.images.setItem(key, value)

// for fileSystem
await this.$localforage.fileSystem.setItem(key, value)
```

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.

## License

[MIT License](./LICENSE)

Copyright (c) Nuxt Community

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/localforage/latest.svg

[npm-version-href]: https://npmjs.com/package/@nuxtjs/localforage

[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxtjs/localforage.svg

[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/localforage

[github-actions-ci-src]: https://github.com/nuxt-community/localforage-module/workflows/ci/badge.svg

[github-actions-ci-href]: https://github.com/nuxt-community/localforage-module/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/localforage-module.svg

[codecov-href]: https://codecov.io/gh/nuxt-community/localforage-module

[license-src]: https://img.shields.io/npm/l/@nuxtjs/localforage.svg

[license-href]: https://npmjs.com/package/@nuxtjs/localforage
