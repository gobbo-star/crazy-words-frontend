<template>
  <div class="game-container">
    <h3>Game</h3>
    <h4 class="question-title">
      Что изображено на картинке ниже?
    </h4>
    <GamePicture v-if="showImage" :id="pictureId" />
    <button @click="showImage=!showImage">
      show
    </button>
  </div>
</template>

<script>
import GamePicture from './GamePicture.vue'
export default {
  name: 'GameComponent',
  components: {
    GamePicture
  },
  data() {
    return {
      pictureId: '0',
      anwerText: '',
      showImage: true
    }
  },
  mounted() {
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
