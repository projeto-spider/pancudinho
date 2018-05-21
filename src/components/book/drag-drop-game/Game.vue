<template>
  <div class="game">
    <div class="bookpage">
      <bookPage
        :items="items"
        :handle-answer="verifyAnswer"
        :reveal-answers="revealAnswers"
        :correct-answers="correctAswers"
      ></bookPage>
    </div>
    <div class="margin-layout">
      <tipButton></tipButton>
      <button type="button" @click="submitAnswers">Submit</button>
    </div>
    <div class="draggablearea">
      <div
        v-for="option in options"
        v-if="!usedOptions.has(option.id)"
        :key="option.id"
      >
        <draggable
          :option="option"
        >
        </draggable>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Draggable from './Draggable.vue'
import BookPage from './BookPage.vue'
import TipButton from './TipButton.vue'

export default {
  name: 'BookDragDropGame',

  components: { Draggable, BookPage, TipButton },

  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    options: [],
    answers: {},
    revealAnswers: false
  }),

  computed: {
    correctAswers () {
      return Object.entries(this.answers)
        .filter(([id, option]) => option && option.id === parseInt(id, 10))
        .map(([_, option]) => option.id)
    },

    usedOptions () {
      return new Set(
        Object.values(this.answers)
          .map(answer => answer && answer.id)
      )
    }
  },

  created () {
    this.options = this.items
      .filter(item => item.isAnswer)
      .sort(() => Math.random() - Math.random())

    this.answers = this.options
      .reduce((acc, option) => {
        acc[option.id] = null
        return acc
      }, {})
  },

  methods: {
    verifyAnswer (item, option) {
      this.answers[item.id] = option
    },

    submitAnswers () {
      this.revealAnswers = true
    }
  }
}
</script>

<style type="text/css">
.game {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(1fr, 3fr);
}
.bookpage {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3
}
.draggablearea {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-start: 1;
  margin: 2em 0 0 0;
}
.margin-layout {
  margin: 10em 1em 0 13em
}
</style>
