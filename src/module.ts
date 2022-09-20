import { addImports, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import localforage from 'localforage'
import { name, version } from '../package.json'
import { LocalForageOptions } from './runtime/types'
import { defineRuntimeConfig } from './utils'

export const INDEXEDDB = localforage.INDEXEDDB
export const LOCALSTORAGE = localforage.LOCALSTORAGE
export const WEBSQL = localforage.WEBSQL

export * from './runtime/types'

export interface ModuleOptions extends LocalForageOptions {
  name: string
  storeName: string
  instances: LocalForageOptions[]
}

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    localForage: ModuleOptions
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'localForage'
  },
  defaults: {
    name: 'nuxtJS',
    storeName: 'nuxtLocalForage',
    instances: []
  },
  setup (options, nuxt) {
    // Default runtimeConfig
    defineRuntimeConfig(nuxt, options)

    // Create resolver to resolve relative paths
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve('./runtime')

    addPlugin({
      src: resolve(runtimeDir, 'plugin'),
      mode: 'client'
    })

    addImports({
      name: 'useLocalForage',
      as: 'useLocalForage',
      from: resolve(runtimeDir, 'composables')
    })
  }
})
