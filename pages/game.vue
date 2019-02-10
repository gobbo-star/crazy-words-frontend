<template>
  <div>
    <div v-if="socketOpen" class="page-container">
      <div class="col left-col">
        <UserList />
      </div>
      <div class="col center-col">
        <div v-if="time != null">
          <span>{{ time }} секунд</span>
        </div>
        <Game
          :word-len="wordLen"
          :status="status"
          :hint="hint"
          @send="sendWord"
          @getHint="getHint"
        />
      </div>
      <div class="col right-col">
        <Chat />
      </div>
    </div>
    <div v-if="!socketOpen && !socketError" class="page-container">
      <div class="col center-col">
        <span>Подключение...</span>
      </div>
    </div>
    <div v-if="socketError" class="page-container">
      <div class="col center-col">
        <span>Ошибка подключения</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { GameComponents } from '../components/game-page.js'
export default {
  components: {
    ...GameComponents
  },
  computed: {
    ...mapState({
      socketOpen: state => state.socket.opened,
      message: state => state.socket.message,
      status: state => state.socket.status,
      wordLen: state => state.socket.wordLen,
      hint: state => state.socket.hint,
      socketError: state => state.socket.socketError,
      time: state => state.socket.time
    })
  },
  watch: {
    socketOpen(newVal, oldVal) {
      if (newVal) {
        this.connect()
      }
    },
    message(newVal, oldVal) {
      // console.log(newVal, oldVal)
    }
  },
  mounted() {
    if (this.socketOpen) {
      this.connect()
    }
  },
  methods: {
    connect() {
      this.send('CONNECT')
    },
    getHint() {
      this.send('HINT')
    },
    ...mapActions('socket', ['send', 'sendWord'])
  }
}
</script>

<style lang="scss">
.page-container {
  display: flex;
  width: 100vw;
  overflow: hidden;
  justify-content: stretch;
  align-items: stretch;
}
.col {
  padding: 20px;
}
.left-col {
  background-color: #434371;
  color: #fff;
  min-height: 100vh;
  width: 300px;
}
.center-col {
  background-color: #484041;
  color: #fff;
  min-height: 100vh;
  margin: 0;
  flex: 1;
  min-width: 500px;
}
.right-col {
  background-color: #434371;
  color: #fff;
  min-height: 100vh;
  width: 300px;
}
</style>
