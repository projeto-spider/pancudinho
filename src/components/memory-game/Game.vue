<template>
  <div class="MemoryGame">

    <div class="row">
      <div class="column column-75">
        <Board
          :cards="cardsInGame"
          :handle-click-card="handleClickCard"
        ></Board>
      </div>
      <div class="column is-centered">
        <Deck :n-cards="Math.max(cardsInDeck.length, 1)"></Deck>
      </div>
    </div>
  </div>
</template>

<script>
import Board from './Board.vue'
import Deck from './Deck.vue'

const FLIP_WAIT_TIME = 1500

export default {
  name: 'MemoryGame',

  components: { Board, Deck },

  data: () => ({
    // This part is currently mocked
    // TODO: fetch the real game
    cardsInGame: Array.from(Array(26), (_, i) => ({
      id: i + 1,
      flip: false,
      content: String.fromCharCode('A'.charCodeAt(0) + i) + `(${Math.floor(i % 13)})`,
      group: Math.floor(i % 13)
    }))
    .sort(() => Math.random() - Math.random()),

    cardsInDeck: [],

    clickedCards: []
  }),

  computed: {
    canClick () {
      return this.clickedCards.length < 2
    }
  },

  methods: {
    handleClickCard (card) {
      if (!this.canClick) return

      const countClickedCards = this.clickedCards.length
      if (countClickedCards === 0) {
        this.handleClickOne(card)
      } else if (countClickedCards === 1) {
        this.handleClickTwo(card)
      } else {
        console.error('Failed to count card clicks')
      }
    },

    handleClickOne (card) {
      card.flip = !card.flip
      this.clickedCards.push(card)
    },

    handleClickTwo (card) {
      if (card.id === this.clickedCards[0].id) return

      card.flip = !card.flip
      this.clickedCards.push(card)

      const [cardA, cardB] = this.clickedCards
      if (cardA.group === cardB.group) {
        this.cardsInDeck.push([cardA, cardB])
        setTimeout(() => {
          this.cardsInGame = this.cardsInGame
            .filter(card => card.id !== cardA.id && card.id !== cardB.id)

          this.clickedCards = []
        }, FLIP_WAIT_TIME)
      } else {
        setTimeout(() => {
          for (let card of this.clickedCards) {
            card.flip = false
          }

          this.clickedCards = []
        }, FLIP_WAIT_TIME)
      }
    }
  }
}
</script>

<style>
html, body {
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

#root {
  height: 100%;
  display: flex;
  align-items: stretch;
}

.MemoryGame {
  width: 100%;
  margin: 15px;
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
}

.is-centered {
  text-align: center;
}

</style>
