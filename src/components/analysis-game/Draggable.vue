<template>
  <div>
    <drag
      :class="{'draggable': !dragging, 'dragging': dragging}"
      :transfer-data="option"
      :draggable="drag"
      @dragstart="handleDrag()"
      @dragend="handleEnd()"
    >
      <p class="centered">{{ option }}</p>
    </drag>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import { Drag } from 'vue-drag-drop'

Vue.component('drag', Drag)

export default {
  name: 'Draggable',

  props: {
    option: {
      type: String,
      required: true
    },

    drag: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    dragging: false
  }),

  methods: {
    handleDrag () {
      this.dragging = true
    },

    handleEnd () {
      this.dragging = false
    }
  }
}
</script>

<style scoped>
.draggable {
  padding: 0.1em 2em;
  margin: 0.4em 0.4em;
  background: plum;
  border-radius: 50%;
  width: 100px;
  height: 150px;
  cursor: move;
  position: relative
}
.dragging {
  padding: 0.1em 0.2em;
  margin: 0.2em 0.2em;
  background: #fbd9f4;
  border-radius: 50%;
  width: 100px;
  height: 150px;
  opacity: 0.4;
  position: relative;
}
.centered{
  text-align: center;
  margin: 2em 1em 1em 1em;
}
</style>
