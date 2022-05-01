import { addAutoImport, addPlugin, createResolver, defineNuxtModule, isNuxt2 } from '@nuxt/kit'
import { defu } from 'defu'
import localforage from 'localforage'
import { name, version } from '../package.json'
import { LocalForageOptions } from './runtime/types'

export const INDEXEDDB = localforage.INDEXEDDB
export const LOCALSTORAGE = localforage.LOCALSTORAGE
export const WEBSQL = localforage.WEBSQL

export * from './runtime/types'

export interface ModuleOptions extends LocalForageOptions {
  instances?: LocalForageOptions[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'localForage',
    compatibility: {
      bridge: true
    }
  },
  defaults: {
    name: 'nuxtJS',
    storeName: 'nuxtLocalForage'
  },
  setup (options, nuxt) {
    // Default runtimeConfig
    const runtimeConfig = defu(getRuntimeConfig(nuxt), {
      name: options.name,
      storeName: options.storeName,
      driver: options.driver,
      size: options.size,
      version: options.version,
      description: options,
      instances: options.instances
    })

    // Remove `undefined` values
    Object.keys(runtimeConfig).forEach((key) => {
      if (runtimeConfig[key] === undefined) {
        delete runtimeConfig[key]
      }
    })

    setRuntimeConfig(nuxt, runtimeConfig)

    // Create resolver to resolve relative paths
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve('./runtime')

    addPlugin(resolve(runtimeDir, 'plugin.client'))

    addAutoImport([
      { name: 'useLocalForage', as: 'useLocalForage', from: resolve(runtimeDir, 'composables') }
    ].filter(Boolean))
  }
})

function getRuntimeConfig (nuxt: any) {
  if (isNuxt2()) {
    return nuxt.options.publicRuntimeConfig.localForage
  } else {
    return nuxt.options.runtimeConfig.public.localForage
  }
}

function setRuntimeConfig (nuxt: any, config: ModuleOptions) {
  if (isNuxt2()) {
    nuxt.options.publicRuntimeConfig.localForage = config
  } else {
    nuxt.options.runtimeConfig.public.localForage = config
  }
}
