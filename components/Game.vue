<template>
  <div class="game-container">
    <h3>Game</h3>
    <h4 class="question-title">
      Что изображено на картинке ниже?
    </h4>
    <GamePicture :id="pictureId" />
  </div>
</template>

<script>
import GamePicture from './GamePicture.vue'
export default {
  components: {
    GamePicture
  },
  data() {
    return {
      pictureId: 0,
      anwerText: ''
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
