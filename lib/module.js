const { resolve } = require('path')

const defaults = {
  name: 'nuxtJS',
  storeName: 'nuxtLocalForage'
}

function localforageModule(moduleOptions) {
  const options = {
    ...defaults,
    ...this.options.localforage,
    ...moduleOptions
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    ssr: false,
    fileName: 'localforage.js',
    options
  })
}

module.exports = localforageModule
module.exports.meta = require('../package.json')
