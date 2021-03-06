<template>
  <div>
    <div @contextmenu.prevent="$refs.ctxMenu.open">
      <div class="Card" :class="classes" @click="() => !isSelected && handleClick()">
        <div v-if="flip || isSelected">{{ content }}</div>
          <div v-if="flip">
            <div v-if="color === 'yellow'" class="yellow">
              {{ content }}
            </div>
            <div v-if="color === 'red'" class="red">
              {{ content }}
            </div>
            <div v-if="color === 'blue'" class="blue">
              {{ content }}
            </div>
            <div v-if="color === 'green'" class="green">
              {{ content }}
            </div>
            <div v-if="color === 'orange'" class="orange">
              {{ content }}
            </div>
            <div v-if="color === 'brown'" class="brown">
              {{ content }}
            </div>
            <div v-if="color === 'purple'" class="purple">
              {{ content }}
            </div>
            <div v-if="color === ''">
              {{ content }}
            </div>
        </div>
      </div>
    </div>

    <context-menu ref="ctxMenu" class="context-menu">
      <button @click="inZoom = true">View</button>
    </context-menu>

    <div class="zoom" v-show="inZoom">
      <div class="foreground" @click="inZoom = false"></div>
      <div class="Card flipped">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script>
import ContextMenu from 'vue-context-menu'

export default {
  name: 'Card',

  components: { ContextMenu },

  props: {
    isSelected: {
      type: Boolean,
      default: false
    },

    flip: {
      type: Boolean,
      default: false
    },

    content: {
      type: String,
      required: true
    },

    color: {
      type: String,
      required: true
    },

    id: {
      type: Number,
      required: true
    },

    handleClick: {
      type: Function,
      default: () => ({})
    }
  },

  data: () => ({
    inZoom: false
  }),

  computed: {
    classes () {
      return {
        flipped: this.flip || this.isSelected
      }
    }
  }
}
</script>

<style scoped>
.Card {
  display: inline-block;
  width: 120px;
  height: 160px;
  border: 1px solid #666;
  border-radius: .3em;
  padding: .3em;
  margin: 0 .3em .3em 0;
  text-align: center;
  font-size: 1.2em;
  font-weight: normal;
  font-family: Arial, sans-serif;
  position: relative;
  background-color: #003570;
  box-shadow: .2em .2em .5em #333;
}

.Card.flipped {
  background-color: #fff;
  font-size: 14px;
}

.context-menu {
  padding: 0;
}

.context-menu button {
  width: 100%;
  height: 32px;
}

.zoom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zoom .foreground {
  position: fixed;
  z-index: 100;
  background-color: #dedede;
  width: 100%;
  height: 100%;
}

.zoom .Card {
  z-index: 101;
  margin: auto;
  width: 330px;
  height: 460px;
}

.text{
  font-size: 11.8px;
}

.violet {
  color: #2a3c67
}

.red {
  color: red
}

.green {
  color: green
}

.blue {
  color: blue
}

.orange {
  color: orange
}

.brown {
  color: brown
}

.purple {
  color: purple
}

</style>
