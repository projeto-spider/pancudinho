<template>
  <Panel class="Board">
    <Card
      v-for="card in cards"
      :key="card.id"
      :flip="card.flip"
      :content="card.content"
      :isSelected="selectedCards.includes(card.id)"
      :color="card.color"
      :handle-click="() => handleClickCard(card)"
    ></Card>
  </Panel>
</template>

<script>
import Panel from '../ui/Panel.vue'
import Card from './Card.vue'

export default {
  name: 'Board',

  components: { Panel, Card },

  props: {

    vetorzinho: {
      type: Array,
      default: () => []
    },

    cards: {
      type: Array,
      default: () => []
    },

    selectedCards: {
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
  padding: 15px;
  width: 100%;
  max-width: 1000px;
  height: 95%;
  flex-wrap: wrap;
  justify-content: center
}
</style>
