<template>
  <div class="Board">
    <Card
      v-for="card in cards"
      :key="card.id"
      :flip="card.flip"
      :content="card.content"
      :handle-click="() => handleClickCard(card)"
    ></Card>
  </div>
</template>

<script>
import Card from './Card.vue'

export default {
  name: 'Board',

  components: { Card },

  props: {
    cards: {
      type: Array,
      default: () => []
    },

    handleClickCard: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style scoped>
.Board {
  display: flex;
  border: 1px solid #dedede;
  padding: 15px;
  max-width: 90vw;
  flex-wrap: wrap;
  justify-content: center
}
</style>
