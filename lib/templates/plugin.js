import Vue from 'vue'

const localForage = require('localforage')
const OPTS = <%= serialize(options) %>

const validateInstanceOptions = function(options){
  if(!options.name || !options.storeName) 
    throw new Error('Options doe not contain name or storeName')
}

const createVueIntance = function (options){
  let lf = localForage.createInstance(options)
  return new Vue({
    name: options.storeName | 'localForage',
    created () {
      return this.config(options)
    },
    methods: {
      getItem (key) {
        return new Promise((resolve, reject) => {
          lf.getItem(key).then((value) => {
            resolve(value)
          }).catch((err) => {
            reject(err)
          })
        })
      },
      setItem (key, value) {
        return new Promise((resolve, reject) => {
          lf.setItem(key, value).then((value) => {
            resolve(value)
          }).catch((err) => {
            reject(err)
          })
        })
      },
      removeItem (key) {
        return new Promise((resolve, reject) => {
          lf.removeItem(key).then(() => {
            resolve()
          }).catch((err) => {
            reject(err)
          })
        })
      },
      clear () {
        return new Promise((resolve, reject) => {
          lf.clear().then(() => {
            resolve()
          }).catch((err) => {
            reject(err)
          })
        })
      },
      length () {
        return new Promise((resolve, reject) => {
          lf.length().then((numberOfKeys) => {
            resolve(numberOfKeys)
          }).catch((err) => {
            reject(err)
          })
        })
      },
      key (keyIndex) {
        return new Promise((resolve, reject) => {
          lf.key(keyIndex).then((keyName) => {
            resolve(keyName)
          }).catch((err) => {
            reject(err)
          })
        })
      },
      keys () {
        return new Promise((resolve, reject) =>{
          lf.keys().then((keys) => {
            resolve(keys)
          }).catch((err) => {
            reject(err)
          })
        })
      },
      iterate () {
        return new Promise((resolve, reject) => {
          lf.iterate((value, key, iterationNumber) => {
            resolve([value, key, iterationNumber])
          }).then((result) => {
            resolve(result)
          }).catch((err) => {
            // This code runs if there were any errors
            console.log(err);
            reject(err)
          })
        })
      },
      setDriver (drivreName) {
        return new Promise((resolve, reject) => {
          resolve(lf.setDriver(driverName))
        })
      },
      config (options) {
        return new Promise((resolve, reject) => {
          resolve(lf.config(options))
        })
      },
      createInstance (options) {
        return new Promise((resolve, reject) => {
          resolve(lf.createInstance(options))
        })
      }
    }
  })
} 

export default  async function (ctx, inject) {

  let $localForage = createVueIntance (OPTS)
  $localForage[OPTS.storeName] = createVueIntance (OPTS)


  if(OPTS.instances) 
    for (let i = 0; i < OPTS.instances.length; i++) {
      validateInstanceOptions(OPTS.instances[i])
      $localForage[OPTS.instances[i].storeName] = createVueIntance (OPTS.instances[i])
  
    }

  inject(`localForage`,$localForage)
  
}
