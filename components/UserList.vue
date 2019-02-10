<template>
  <div class="user-list">
    <h3>User list</h3>
    <div class="user-list-container">
      <transition-group name="list-complete" tag="p">
        <span
          v-for="(participant, key) in participants"
          :key="key + participant.Name"
          class="list-complete-item"
        >
          <span>{{ participant.Name }} ({{ participant.Score }})</span>
        </span>
      </transition-group>
      <!-- <transition-group
        v-for="(participant, key) in participants"
        :key="key"
        tag="div"
        name="list"
        appear
        class="participant"
      >
        <div :key="key">
          <span>{{ participant.Name }}</span>
        </div>
      </transition-group>-->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      participants: state => state.socket.participants
    })
  }
}
</script>

<style lang="scss" scoped>
.participant {
  color: greenyellow;
  position: relative;
  line-height: 1.8rem;
  div {
    display: inline-block;
    position: relative;
    padding-left: 30px;
  }
  div::before {
    content: "";
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: cyan;
    position: absolute;
    left: 0;
    top: 12px;
  }
  div::after {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ffffff;
    position: absolute;
    left: 4px;
    top: 7px;
  }
}
.user-list-container {
  margin-top: 20px;
  height: calc(100vh - 100px);
  overflow-x: hidden;
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  position: relative;
  padding-left: 30px;
  line-height: 2.5rem;
  &::before {
    content: "";
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: cyan;
    position: absolute;
    left: 0;
    top: 12px;
  }
  &::after {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ffffff;
    position: absolute;
    left: 4px;
    top: 7px;
  }
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translate3d(-30px, 0, 0);
}
.list-complete-leave-active {
  height: 0;
  transform: translate3d(-30px, -100%, 0);
}
.list-complete-move {
  transition: transform 1s;
}
</style>
