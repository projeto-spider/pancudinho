<template>
  <div class="Panel" :class="computedClass">
    <slot></slot>
  </div>
</template>

<script>
const validColors = new Set(['blue', 'red', 'green', 'yellow', 'grey'])

export default {
  name: 'Panel',

  props: {
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

<style>
.Panel {
  border-style: solid;
  border-width: 27px;
}

.Panel.blue {
  border-image: url('../../assets/blue_panel.png') 27 fill repeat;
}
.Panel.red {
  border-image: url('../../assets/red_panel.png') 27 fill repeat;
}
.Panel.green {
  border-image: url('../../assets/green_panel.png') 27 fill repeat;
}
.Panel.yellow {
  border-image: url('../../assets/yellow_panel.png') 27 fill repeat;
}
.Panel.grey {
  border-image: url('../../assets/grey_panel.png') 27 fill repeat;
}
</style>
