import { SOCKET_ADRESS } from '../config/socket.config.js'

export default {
  install(Vue, options) {
    Vue.prototype.$socket = new WebSocket(SOCKET_ADRESS)
  }
}
