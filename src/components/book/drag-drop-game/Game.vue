<template>
  <div class="game">
    <div class="bookpage">
      <bookPage></bookPage>
    </div>
    <tipButton class="margin-layout"></tipButton>
    <div class="draggablearea">
      <div v-for="(option, i) in options" :key="i">
        <draggable
          :content="option"
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
    options: [
      'Loren impsun',
      'Lurest farm',
      'Tomes net'
    ]
  })
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
