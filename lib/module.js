const { resolve } = require('path')

module.exports = function (moduleOptions) {
  const options = {
    name: 'nuxtJS',
    storeName: 'nuxtLocalForage',
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

module.exports.meta = require('../package.json')
