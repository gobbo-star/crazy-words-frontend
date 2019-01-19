import Vue from 'vue'
import VueSocket from './vue-socket'
export default ({ store }) => {
  if (process.client) {
    Vue.use(VueSocket)
    const socket = Vue.prototype.$socket
    store.dispatch('socket/setSocket', socket)
  }
}
