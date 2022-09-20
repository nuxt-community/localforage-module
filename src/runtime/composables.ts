import { useNuxtApp, useRuntimeConfig } from '#app'
import { LocalForage } from './types'

export function useLocalForage (instance?: string): LocalForage {
  const { $localForage } = useNuxtApp()
  const { public: { localForage: options } } = useRuntimeConfig()

  if (instance) {
    if (!options.instances?.find(({ storeName, name }) => storeName === instance || name === instance)) {
      throw new Error(`Instance "${instance}" not found in LocalForage options.`)
    }
  }

  if (process.server) {
    return $localForage
  }

  return instance ? $localForage[instance] : $localForage
}
