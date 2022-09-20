import localforage from 'localforage'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { LocalForageInstance } from './types'

export default defineNuxtPlugin((nuxtApp) => {
  const { public: { localForage: options } } = useRuntimeConfig()
  const localForageInstance = localforage.createInstance(options)

  for (const instance of options.instances) {
    const name = instance.storeName || instance.name

    if (!name) {
      continue
    }

    localForageInstance[name] = localforage.createInstance(instance)
  }

  nuxtApp.provide('localForage', localForageInstance)
})

interface PluginInjection {
  $localForage: LocalForageInstance
}

// Nuxt Bridge & Nuxt 3
declare module '#app' {
  interface NuxtApp extends PluginInjection {
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends PluginInjection {
  }
}

// @ts-ignore
declare module 'vue/types/vue' {
  interface Vue extends PluginInjection {
  }
}
