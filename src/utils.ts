import { isNuxt2 } from '@nuxt/kit'
import { defu } from 'defu'
import { ModuleOptions } from './module'

export function defineRuntimeConfig (nuxt: any, options: ModuleOptions): ModuleOptions {
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

  return runtimeConfig
}

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
