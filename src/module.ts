import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'
import { name, version } from '../package.json'
import { LocalForageOptions } from './runtime/types'

export { INDEXEDDB, LOCALSTORAGE, WEBSQL } from 'localforage'
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

    // addPlugin(resolve('./runtime/plugin.client'))
    addPlugin(resolve('./runtime/plugin.client'))
  }
})
