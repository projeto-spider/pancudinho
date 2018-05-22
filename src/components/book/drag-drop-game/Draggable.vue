<template>
  <div>
    <drag
      :class="{'draggable': !dragging, 'dragging': dragging}"
      :transfer-data="option"
      :draggable="drag"
      @dragstart="handleDrag()"
      @dragend="handleEnd()"
    >
      <p class="centered">{{ option.text }}</p>
    </drag>
  </div>
</template>

<script>
import Vue from 'vue'
import { Drag } from 'vue-drag-drop'

Vue.component('drag', Drag)

export default {
  name: 'Draggable',

  props: {
    option: {
      type: Object,
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

<style>
.draggable {
  padding: 0.1em 2em;
  margin: 0.4em 0.4em;
  background: #bdbdbd;
  border-radius: 5px;
  cursor: move;
}
.dragging {
  padding: 0.1em 0.8em;
  margin: 0.2em 0.2em;
  background: #e5e5e5;
  border-radius: 5px;
  opacity: 0.4
}
.centered{
  text-align: center
}
</style>
