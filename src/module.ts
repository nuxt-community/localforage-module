import { addAutoImport, addPlugin, createResolver, defineNuxtModule, isNuxt3 } from '@nuxt/kit'
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
    const runtimeConfig = defu(nuxt.options.runtimeConfig.public.localForage, {
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

    nuxt.options.runtimeConfig.public.localForage = runtimeConfig

    // Create resolver to resolve relative paths
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve('./runtime')

    addPlugin(resolve(runtimeDir, 'plugin.client'))

    if (isNuxt3()) {
      addAutoImport([
        { name: 'useLocalForage', as: 'useLocalForage', from: resolve(runtimeDir, 'composables') }
      ].filter(Boolean))
    }
  }
})
