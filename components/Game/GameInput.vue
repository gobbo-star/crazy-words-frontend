<template>
  <div class="game-input" @click="focusInput">
    Game input
    <div class="inputs">
      <span v-for="(n, i) of length" :key="i" class="inputs-item" :class="{active: i === value.length, fill: i < value.length}" @click="focusInput">
        {{ value[n - 1] || '' }}
      </span>
    </div>
    <input
      ref="input"
      class="hidden-input"
      :maxlength="length"
      type="text"
      :value="value"
      @input="updateInput()"
      @focus="onFocus"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: () => ''
    },
    length: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      listener: null
    }
  },
  mounted() {
    this.focusInput()
    this.listener = () => this.focusInput()
    window.addEventListener('keyup', this.listener)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.listener)
  },
  methods: {
    updateInput() {
      this.$emit('input', this.$refs.input.value)
    },
    focusInput() {
      this.$refs.input.dispatchEvent(new Event('focus'))
    },
    onFocus($event) {
      $event.target.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.inputs {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content:space-around;
  align-items: stretch;
  margin: 20px 0;

  &-item {
    width: 50px;
    height: 50px;
    border: 2px solid #d0d0d0;
    border-radius: 3px;
    background: #fff;
    display: inline-block;
    text-align: center;
    line-height: 45px;
    color: #000;
    margin: 1px;
    position: relative;
    cursor: text;
    transition: .4s ease-in;
    overflow: hidden;
    font-size: 35px;
    font-weight: bold;
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: red;
      top: 0;
      left: 0;
      transition: .4s;
    }
    &.active {
      &::after {
        content: '';
        z-index: 1;
        height: 30px;
        top: 10px;
        left: 24px;
        width: 2px;
        background-color: #484041;
        position: absolute;
        animation-name: blinker;
        animation-iteration-count: infinite;
        animation-timing-function: cubic-bezier(1.0,2.0,0,1.0);
        animation-duration: 1s;
        -webkit-animation-name: blinker;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: cubic-bezier(1.0,2.0,0,1.0);
        -webkit-animation-duration: 1s;
      }
    }
    &.fill {
      background-color: yellowgreen;
      &::before {
        transform: translateY(-100%);
        opacity: 0;
      }
    }
  }
}
.hidden-input {
  opacity: 0;
  position: fixed;
  width: 0;
  height: 0;
  left: -9999999px;
  top: -9999999px;
  z-index: -1;
}

@keyframes blinker {
  from { opacity: 1.0; }
  to { opacity: 0.0; }
}
</style>
