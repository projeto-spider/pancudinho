<template>
  <div>
    <drag
      :class="{'draggable': !dragging, 'dragging': dragging}"
      :transfer-data="content"
      @dragstart="handleDrag()"
      @dragend="handleEnd()"
    >
      <p class="centered">{{ content }}</p>
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
    content: {
      type: String,
      required: true
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
  background: plum;
  border-radius: 50%;
  width: 9em;
  height: 9em;
  cursor: move;
}
.dragging {
  padding: 0.1em 0.8em;
  margin: 0.2em 0.2em;
  background: #fbd9f4;
  border-radius: 50%;
  width: 8em;
  height: 8em;
  opacity: 0.4
}
.centered{
  text-align: center;
  margin: 2em 1em 1em 1em;
}
</style>
