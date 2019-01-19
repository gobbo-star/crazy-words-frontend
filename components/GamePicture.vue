<template>
  <div class="game-picture-container">
    <picture>
      <source :srcset="imageJpgPath" type="image/webp">
      <source :srcset="imageWebPPath" type="image/jpeg">
      <img class="game-picture" :src="imageJpgPath" alt="Question picture">
    </picture>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: () => '0'
    }
  },
  computed: {
    imageJpgPath() {
      return `/game-pictures/${this.id}.jpg`
    },
    imageWebPPath() {
      return `/game-pictures/${this.id}.webp`
    }
  }
}
</script>

<style lang="scss" scoped>
.game-picture {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  &-container {
    width: 100%;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 300px;
    background-color: lighten(#484041, 10%);
    padding: 10px;
  }
}
</style>
