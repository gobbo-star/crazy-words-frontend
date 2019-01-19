import socketio from 'socket.io'
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default () => {
  const SocketInstance = socketio('http://localhost:4113')

  Vue.use(VueSocketIO, SocketInstance)
}
