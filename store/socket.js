import { Message } from 'element-ui'

// const getWordLen = (str, isRight) => {
//   const rgx = isRight ? /new: (\d+)/g : /^new: (\d+)/g
//   const searchResult = rgx.exec(str)
//   if (searchResult) {
//     return +(searchResult[1])
//   } else {
//     return null
//   }
// }

// const isWrong = (str) => {
//   return str === 'wrong'
// }

// const isRight = (str) => {
//   return /is right\./g.test(str)
// }

export const state = () => ({
  socket: null,
  socketError: null,
  opened: false,
  message: null,
  status: 'wait', // wait, ready
  wordLen: null,
  participants: {},
  hint: '',
  answer: ''
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
    commit('SET_STATUS', 'ready')
  },
  onSocketConnectionError({ commit }, error) {
    console.log('Ошибка подключения', error)
    Message({
      message: 'Ошибка подключения к сокету',
      type: 'error',
      showClose: true,
      onClose: () => { }
    })
    commit('SOCKET_ERROR', error)
  },
  onSocketMessage({ commit, state }, message) {
    if (message.data) {
      try {
        const event = JSON.parse(message.data)
        const { Type, Payload } = event
        if (Type === 'STATE') {
          commit('SOCKET_MESSAGE', Payload)
          commit('SET_STATUS', 'ready')
          commit('SET_WORDLEN', Payload.chars)
          console.log(`${state.hint}` === Payload.word)
          if (`${state.hint}` !== Payload.word) {
            commit('SET_ANSWER', '')
          }
          commit('SET_HINT', Payload.word)
          commit('SET_PARTICIPANTS', Payload.participants)
        }
        console.log(`MESSAGE TYPE: ${Type}`)
      } catch (error) {
        console.error('Error: ', error, message)
      }
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
  },
  SET_PARTICIPANTS(state, participants) {
    state.participants = participants
  },
  SET_ANSWER(state, answer) {
    state.answer = answer
  }
}
