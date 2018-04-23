<template>
  <div class="MemoryGame">

    <div class="row">
      <div class="column column-75">
        <Board
          :cards="cardsInGame"
          :handle-click-card="handleClickCard"
        ></Board>
      </div>

      <div class="column is-centered control-column">
        <div class="row deck-block">
          <div class="column">
            <Deck :n-cards="Math.max(cardsInDeck.length, 1)"></Deck>
          </div>
        </div>

        <div class="row pancudinho-block">
          <div class="column">
            <Pancudinho
              :tips-choice="currentTip"
              :handle-close="changeTip"
            ></Pancudinho>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Board from './Board.vue'
import Deck from './Deck.vue'
import Pancudinho from './Pancudinho.vue'

const FLIP_WAIT_TIME = 1500

export default {
  name: 'MemoryGame',

  components: { Board, Deck, Pancudinho },

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

    clickedCards: [],

    // As we don't have real tips, we are mocking this
    currentTip: 'tip1'
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
    },

    changeTip () {
      this.currentTip = `tip${Math.round(Math.random() * (4 - 1) + 1)}`
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

.row .column.control-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>
