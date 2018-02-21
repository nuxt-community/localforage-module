const { resolve } = require('path')

module.exports = async function module (moduleOptions) {
  const options = Object.assign({ name: 'nuxtJS', storeName: 'nuxtLocalForage' }, this.options['localforage'] || moduleOptions)

  this.addPlugin({
    src: resolve(__dirname, './templates/plugin.js'),
    ssr: false,
    fileName: 'localforage.js',
    options
  })
}
