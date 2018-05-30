<template>
  <div v-if="heading" class="Panel-With-Heading-Container">
    <div class="Panel Panel-Heading blue">
      {{ heading }}
    </div>

    <div class="Panel" :class="computedClass">
      <slot></slot>
    </div>
  </div>

  <div v-else class="Panel" :class="computedClass">
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
    },

    heading: {
      type: String,
      required: false
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
.Panel-With-Heading-Container {
  position: relative;
}

.Panel-With-Heading-Container .Panel {
  position: relative;
}

.Panel {
  border-style: solid;
  border-width: 27px;
  z-index: 10;
}

.Panel.blue {
  border-image: url('../../assets/blue_panel.png') 27 fill repeat;
  color: #fff;
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

.Panel.Panel-Heading {
  bottom: -10px;
  z-index: 9;
}
</style>
