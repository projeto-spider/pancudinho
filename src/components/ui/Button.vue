<template>
  <button class="Button" :class="computedClass" @click="handleClick">
    <span>{{ label }}<slot></slot></span>
  </button>
</template>

<script>
const validColors = new Set(['blue', 'red', 'green', 'grey'])

export default {
  name: 'Button',

  props: {
    handleClick: {
      type: Function,
      default: () => ({})
    },
    label: {
      type: String
    },
    color: {
      type: String,
      default: 'grey',
      validator (value) {
        return validColors.has(value)
      }
    }
  },

  computed: {
    computedClass () {
      return {
        [this.color]: true
      }
    }
  }
}
</script>

<style scoped>
.Button {
  box-sizing: border-box;
  font-family: kenvector_future;
  border-style: solid;
  color:#000;
  border-style: solid;
  border-width: 7px 27px 35px;
  border-radius: 6px;
  padding: 0;
  cursor: pointer;
}

.Button > * {
  position: relative;
  top: 10px;
}

.Button.blue {
  border-image: url('../../assets/blue_button00.png') 7 27 35 repeat;
  background-color: #35baf3;
  color: #fff;
}
.Button.red {
  border-image: url('../../assets/red_button00.png') 7 27 35 repeat;
  background-color: #e86a17;
}
.Button.green {
  border-image: url('../../assets/green_button00.png') 7 27 35 repeat;
  background-color: #88e060;
}
.Button.grey {
  border-image: url('../../assets/grey_button00.png') 7 27 35 repeat;
  background-color: #fff;
}

.Button:active {
  margin-top: 1px;
  border-image: url('../../assets/yellow_button00.png') 7 27 35 repeat;
  background-color: #ffd948;
}
</style>
