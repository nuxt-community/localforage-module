import Vue from 'vue'
import VueLocalforage from 'v-localforage'

Vue.use(VueLocalforage, <%= serialize(options) %>)

export default (context, inject) => {
  inject('localForage', Vue.$localforage)
}
