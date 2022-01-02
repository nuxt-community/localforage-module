import LocalForage = require("localforage");

declare module 'vuex/types/index' {
  interface Store<S> {
    $localForage: LocalForage,
  }
}
