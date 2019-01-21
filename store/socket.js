import { Message } from 'element-ui'

const getWordLen = (str, isRight) => {
  const rgx = isRight ? /new: (\d+)/g : /^new: (\d+)/g
  const searchResult = rgx.exec(str)
  if (searchResult) {
    return +(searchResult[1])
  } else {
    return null
  }
}

const isWrong = (str) => {
  return str === 'wrong'
}

const isRight = (str) => {
  return /is right\./g.test(str)
}

export const state = () => ({
  socket: null,
  socketError: null,
  opened: false,
  message: null,
  status: 'wait', // wait, ready
  wordLen: null,
  hint: ''
})

export const actions = {
  send({ state }, payload) {
    if (state.socket.readyState === 1) {
      state.socket.send(payload)
    } else {
      Message({
        message: 'Соединение не установлено',
        type: 'error',
        showClose: true
      })
    }
  },
  sendWord({ dispatch, commit }, word) {
    commit('SET_STATUS', 'wait')
    commit('SET_HINT', '')
    dispatch('send', word)
  },
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
    socket.onmessage = (message) => {
      dispatch('onSocketMessage', message)
    }
  },
  onSocketConnect({ commit, dispatch }) {
    commit('SOCKET_CONNECT')
    dispatch('sendWord', 'HINT')
  },
  onSocketConnectionError({ commit, state }, error) {
    // state.socket.disconnect()
    console.log(error)
    Message({
      message: 'Ошибка подключения к сокету',
      type: 'error',
      showClose: true,
      onClose: () => {
        // state.socket.connect()
      }
    })
    commit('SOCKET_ERROR', error)
  },
  onSocketMessage({ commit, dispatch }, message) {
    commit('SOCKET_MESSAGE', message)
    const word = message.data
    const wordLen = getWordLen(word)
    if (wordLen) {
      commit('SET_STATUS', 'ready')
      commit('SET_WORDLEN', wordLen)
    } else if (isWrong(word)) {
      commit('SET_STATUS', 'ready')
      Message({
        message: 'Неправильно!',
        type: 'error',
        showClose: true
      })
      dispatch('send', 'HINT')
    } else if (isRight(word)) {
      Message({
        message: 'Правильно! Следующий вопрос!',
        type: 'success',
        showClose: true
      })
      const wordLen = getWordLen(word, true)
      commit('SET_STATUS', 'ready')
      commit('SET_WORDLEN', wordLen)
      dispatch('send', 'HINT')
    } else {
      commit('SET_HINT', word)
    }
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
    state.opened = true
  },
  SOCKET_MESSAGE(state, message) {
    state.message = message
  },
  SET_STATUS(state, status) {
    state.status = status
  },
  SET_WORDLEN(state, len) {
    state.wordLen = len
  },
  SET_HINT(state, hint) {
    state.hint = hint
  }
}
