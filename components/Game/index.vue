<template>
  <div class="game-container" @click="onClick">
    <h3>Game</h3>
    <h4 class="question-title">
      Что изображено на картинке ниже?
    </h4>
    <GamePicture :id="pictureId" />
    <hr>
    <form @submit.stop.prevent="onSubmit">
      <GameInput ref="input" v-model="answerText" :length="answerLen" />
      <button type="submit" :disabled="answerLen !== answerText.length">
        Подтвердить
      </button>
    </form>
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
  data() {
    return {
      pictureId: '0',
      answerText: '',
      answerLen: 5
    }
  },
  mounted() {
  },
  methods: {
    onSubmit() {
      console.log('submit')
      this.answerText = ''
      this.$message({
        message: 'Отправлено!'
      })
    },
    onClick() {
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
