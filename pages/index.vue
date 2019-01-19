<template>
  <section class="container">
    <div>
      <h1 class="title">
        Crazy words the game
      </h1>
      <nuxt-link class="button-start" to="/game">
        Начать
      </nuxt-link>
    </div>
  </section>
</template>

<script>

export default {
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}
.button-start {
  border: 1px solid yellowgreen;
  border-radius: 5px;
  padding: 5px 10px;
  text-decoration: none;
  color: green;
}
</style>
