<template>
  <div class="book">
    <div v-for="(content, i) in contents" :key="i">
      <p v-if="content.type === 'text'">
        <span class="fairy-letter">{{content.text}}</span>
      </p>
      <div v-else>
        <droppable
          :handle-dropped="droppedText => answered(content, droppedText)"
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
    contents: {
      type: Array,
      default: () => []
    },

    handleAnswer: {
      type: Function,
      default: () => {}
    }
  },

  methods: {
    answered (content, droppedText) {
      this.handleAnswer(content, droppedText)
    }
  }
}
</script>

<style type="text/css">
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
