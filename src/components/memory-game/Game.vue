<template>
  <div class="aligner">
    <div class="MemoryGame" style="width: 90%; height: 80%">
      <Board
        :cards="cardsInGame"
        :handle-click-card="handleClickCard"
      ></Board>

      <div class="MemoryGame-Aside">
        <div class="deck-wrapper">
          <Deck :n-cards="Math.max(cardsInDeck.length, 1)"></Deck>
        </div>

        <div class="row pancudinho-block">
          <Pancudinho
            :tips-choice="currentTip"
            :handle-close="changeTip"
          ></Pancudinho>
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

  props: {
    cards: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    cardsInGame: [],

    cardsInDeck: [],

    clickedCards: [],

    // As we don't have real tips, we are mocking this
    currentTip: 'tip1'
  }),

  created () {
    this.cardsInGame = this.cards
      .sort(() => Math.random() - Math.random())
  },

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
  margin: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
}

.is-centered {
  text-align: center;
}

.MemoryGame .MemoryGame-Aside {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.deck-wrapper {
  width: 100%;
  height: 200px;
  text-align: center;
}

.deck-wrapper > * {
  left: 44%
}

.aligner {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.Panel.grey{
  z-index: 1;
}
</style>
