<template>
  <div class="page-container">
    <div class="col left-col">
      <UserList />
    </div>
    <div class="col center-col">
      <Game />
    </div>
    <div class="col right-col">
      <Chat />
    </div>
  </div>
</template>

<script>
import { GameComponents } from '../components/game-page.js'
export default {
  components: {
    ...GameComponents
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
