<template>
  <div>
      <h1 style='text-align: center'>{{ counter }}</h1>
      <h2 v-if='showScore'>Score: {{ score }}</h2>
    <div class="MemoryGame">
      <Board
        :cards="cardsInGame"
        :handle-click-card="handleClickCard"
      > {{ gameStart }} </Board>

        <div class="row pancudinho-block">
          <Pancudinho
            :tips-choice="currentTip"
            :handle-close="changeTip"
          ></Pancudinho>
        </div>
      </div>
    </div>
</template>

<script>
/* eslint-disable */
import Pancudinho from './Pancudinho.vue'
import Board from './Board.vue'

const FLIP_WAIT_TIME = 1000

export default {
  name: 'MemoryGame',

  components: { Pancudinho, Board },

  props: {
    cards: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    score: 0,

    showScore: false,

    isPaired: false,

    counter: 5,

    isGameStart: true,

    pairedCards: [],

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
    gameStart () {
      for (var i = 1; i <= 5; i++) {
        setTimeout(() => {
          this.counter--
          if (this.counter == 0) {
            this.showScore = true
            this.counter = ''
          }
        }, 1000 * i)
      }
      setTimeout(() => {
        for (var i = 0; i < this.cardsInGame.length; i++) {
          this.cardsInGame[i].flip = false
          this.isGameStart = false
        }
      }, 5000)

      return null
    }
  },

  methods: {
    handleClickCard (card) {
      if (!this.isGameStart) {
        if (!this.canClick(card)) this.clickedCards = []

        var countClickedCards = this.clickedCards.length

        for (var i = 0; i < this.pairedCards.length; i++) {
          if (card.group === this.pairedCards[i]) {
            this.isPaired = true
          }
        }

        if (this.isPaired) {
          if (countClickedCards === 1) this.clickedCards[0].flip = false
          this.isPaired = false
          this.clickedCards = []
        } else if (countClickedCards === 0) {
          this.handleClickOne(card)
        } else if (countClickedCards === 1) {
          this.handleClickTwo(card)
        } else {
          console.error('Failed to count card clicks')
        }
      }
    },

    canClick (card) {
      return (this.clickedCards.length < 2)
    },

    setCardColor (cardA, cardB) {
      switch (cardA.group) {
        case 0:
          cardA.color = 'blue'
          cardB.color = 'blue'
          break
        case 1:
          cardA.color = 'green'
          cardB.color = 'green'
          break
        case 2:
          cardA.color = 'red'
          cardB.color = 'red'
          break
        case 3:
          cardA.color = 'violet'
          cardB.color = 'violet'
          break
        case 4:
          cardA.color = 'purple'
          cardB.color = 'purple'
          break
        case 5:
          cardA.color = 'orange'
          cardB.color = 'orange'
          break
        case 6:
          cardA.color = 'brown'
          cardB.color = 'brown'
          break
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
      this.firstCardFlipped = false
      const [cardA, cardB] = this.clickedCards
      if (cardA.group === cardB.group) {
        this.score += 1000
        this.pairedCards.push(cardA.group)
        this.setCardColor(cardA, cardB)
        alert(this.cardA.color)
        setTimeout(() => {
          for (let card of this.clickedCards) {
            card.flip = true
          }
          this.clickedCards = []
        }, FLIP_WAIT_TIME)
      } else {
        setTimeout(() => {
          if (this.score > 0) this.score -= 100
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
</style>
