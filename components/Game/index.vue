<template>
  <div class="game-container" @click="onClick">
    <h3>Game</h3>
    <button @click="getHint">
      Get Hint
    </button>
    <p>
      [{{ hint }}]
    </p>
    <div v-show="isReady">
      <h4 class="question-title">
        Что изображено на картинке ниже?
      </h4>
      <GamePicture :id="pictureId" />
      <hr>
      <form @submit.stop.prevent="onSubmit">
        <GameInput ref="input" v-model="answerText" :length="wordLen" />
        <button type="submit" :disabled="wordLen !== answerText.length">
          Подтвердить
        </button>
      </form>
    </div>
    <div v-if="isWait">
      Ожидайте...
    </div>
  </div>
</template>

<script>
import GamePicture from './GamePicture.vue'
import GameInput from './GameInput.vue'
export default {
  name: 'GameComponent',
  components: {
    GamePicture,
    GameInput
  },
  props: {
    wordLen: {
      type: Number,
      default: () => 0
    },
    status: {
      type: String,
      default: () => 'wait'
    },
    hint: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      pictureId: '0',
      answerText: ''
    }
  },
  computed: {
    isReady() {
      return this.status === 'ready'
    },
    isWait() {
      return this.status === 'wait'
    }
  },
  mounted() {
  },
  methods: {
    onSubmit() {
      this.$emit('send', this.answerText)
      this.answerText = ''
    },
    onClick() {
      this.$refs.input.focusInput()
    },
    getHint() {
      this.$emit('getHint')
      this.$refs.input.focusInput()
    }
  }
}
</script>

<style lang="scss" scoped>
.question-title {
  font-weight: 200;
  color: #B5F44A;
  margin-top: 10px;
}
</style>
