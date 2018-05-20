<template>
  <div class="game">
    <div class="bookpage">
      <bookPage
        :items="items"
        :handle-answer="verifyAnswer"
      ></bookPage>
    </div>
    <tipButton class="margin-layout"></tipButton>
    <div class="draggablearea">
      <div v-for="option in options" :key="option.id">
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

  data: () => ({
    options: [],
    items: [
      {
        id: 1,
        text: 'Lorem ipsum dolor sit amet,'
      },
      {
        id: 2,
        text: 'Lurest farm',
        isAnswer: true
      },
      {
        id: 3,
        text: 'id quo paulo scaevola. Eu everti feugait vel, utamur discere ne duo.'
      },
      {
        id: 4,
        text: 'Loren impsun',
        isAnswer: true
      },
      {
        id: 5,
        text: 'Ex odio adhuc comprehensam eos, cum dicunt maiestatis ad.'
      },
      {
        id: 6,
        text: 'Tomes net',
        isAnswer: true
      },
      {
        id: 7,
        text: 'id quo paulo scaevola'
      }
    ],
    answers: {}
  }),

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
      console.log(item, option, this.answers)
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
