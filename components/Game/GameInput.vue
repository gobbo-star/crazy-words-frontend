<template>
  <div class="game-input" @click="focusInput">
    Game input
    <div class="inputs">
      <span v-for="(n, i) of length" :key="i" class="inputs-item" @click="focusInput">
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
  mounted() {
    this.focusInput()
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
    line-height: 50px;
    color: #000;
    margin: 1px;
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
</style>
