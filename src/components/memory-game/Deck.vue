<template>
  <div class="Deck">
    <div
      v-for="(card, i) in Array(realNCards)"
      :key="i"
      class="Card"
      :style="{bottom: (i*2)+'px', left: (i*2)+'px'}"
    ></div>
  </div>
</template>

<script>
const MAX_N_CARDS = 6

export default {
  props: {
    nCards: {
      type: Number,
      default: 1,
      validator (value) {
        return value > 1
      }
    }
  },

  computed: {
    realNCards () {
      return Math.min(this.nCards, MAX_N_CARDS)
    }
  }
}
</script>

<style scoped>
.Deck {
  position: relative;
  box-shadow: .2em .2em .5em #333;
}
.Card {
  width: 3.3em;
  height: 4.6em;
  border: 1px solid #dedede;
  background-color: #003570;
  position: absolute;
  border-radius: 10%;
}
</style>
