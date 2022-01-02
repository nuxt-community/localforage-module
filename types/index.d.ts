import LocalForage = require("localforage");
import "./vuex"

declare module '@nuxt/vue-app' {
  interface Context {
    $localForage: LocalForage
  }

  interface NuxtAppOptions {
    $localForage: LocalForage
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $localForage: LocalForage
  }

  interface NuxtAppOptions {
    $localForage: LocalForage
  }

  interface Configuration {
    axios?: LocalForageOptions
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $localForage: LocalForage
  }
}
