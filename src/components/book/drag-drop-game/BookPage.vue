<template>
  <div class="book">
    <div v-for="item in items" :key="item.id">
      <p v-if="!item.isAnswer">
        <span class="fairy-letter">{{item.text}}</span>
      </p>
      <div v-else>
        <droppable
          :handle-drop-leave="() => draggedOut(item)"
          :handle-dropped="droppedText => answered(item, droppedText)"
          :reveal-answers="revealAnswers"
          :correct-answers="correctAnswers"
        ></droppable>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Droppable from './Droppable.vue'

export default {
  name: 'BookPage',

  components: { Droppable },

  props: {
    items: {
      type: Array,
      default: () => []
    },

    handleAnswer: {
      type: Function,
      default: () => {}
    },

    handleDropLeave: {
      type: Function,
      default: () => {}
    },

    revealAnswers: {
      type: Boolean,
      required: true
    },

    correctAnswers: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    answered (item, droppedText) {
      this.handleAnswer(item, droppedText)
    },

    draggedOut (item) {
      this.handleDropLeave(item)
    }
  }
}
</script>

<style type="text/css" scoped>
.book {
  padding: 5em 3em 3em 3em;
  margin: 1em 5em;
  border-radius: 3px;
  text-align: left;
  background: #fff6d1; /*Alternative color: #f3eded*/
  box-shadow: .2em .2em .5em #333
}
.fairy-letter{
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
  color: #2b2b2b;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
}
</style>
