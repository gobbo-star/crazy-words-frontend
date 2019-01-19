import { Message } from 'element-ui'

export const state = () => ({
  socket: undefined,
  socketError: null
})

export const actions = {
  setSocket({ commit, dispatch }, socket) {
    commit('SET_SOCKET', socket)
    dispatch('setSocketEvents', socket)
  },
  setSocketEvents({ dispatch }, socket) {
    socket.onerror = (error) => {
      dispatch('onSocketConnectionError', error)
    }
    socket.onopen = () => {
      dispatch('onSocketConnect')
    }
  },
  onSocketConnect({ commit }) {
    Message({
      message: 'Соединение установлено',
      type: 'success',
      showClose: true
    })
    commit('SOCKET_CONNECT')
  },
  onSocketConnectionError({ commit, state }, error) {
    // state.socket.disconnect()
    Message({
      message: 'Ошибка подключения к сокету',
      type: 'error',
      duration: 0,
      showClose: true,
      onClose: () => {
        // state.socket.connect()
      }
    })
    commit('SOCKET_ERROR', error)
  }
}

export const mutations = {
  SET_SOCKET(state, data) {
    state.socket = data
  },
  SOCKET_ERROR(state, error) {
    state.socketError = error
  },
  SOCKET_CONNECT(state) {
    state.socketError = null
  }
}
