<template>
<div>
    <div v-if='false'>
            <div>
              <div class="MemoryGame">

                    <div>

                    <Board
                      :cards="cardsInGame"
                      :handle-click-card="handleClickCard"
                    ></Board>

                    <button v-if="gameFinished" @click="closeGame">Continue</button>

                    </div>
            </div>
          </div>
      </div>

      <div>

        <h2>Score: {{ score }}</h2>

        <div class="MemoryGame">

          <div>

            <Board
              style='position: absolute;'
              :cards="cardsInGame"
              :handle-click-card="handleClickCard"
            > </Board>
          </div>

              <Pancudinho
                v-if="!inTutorial"
                    :tips-choice="currentTip"
                    :handle-close="changeTip"
                  ></Pancudinho>

              <button v-if="gameFinished" @click="closeGame">Continue</button>

        </div>
      </div>

  <GameVisualNovel
    v-if="inTutorial"
    :state="state"
    :scenes="scenes"
    :on-next="onNextText"
    :on-end="finishUpTutorial"
  ></GameVisualNovel>
</div>
</template>

<script>
/* eslint-disable */
import Pancudinho from './Pancudinho.vue'
import Board from './Board.vue'
import Card from './Card.vue'
import Panel from '../ui/Panel.vue'
import GameVisualNovel from '../visual-novel/VisualNovel.vue'

const FLIP_WAIT_TIME = 5000

export default {
  name: 'MemoryGame',

  components: { Pancudinho, Board, Card, Panel, GameVisualNovel },

  props: {
    state: {
      type: Object,
      required: true
    },

    cards: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({

    visualNovel: true,

    inTutorial: true,

    currentText: -1,

    scenes: [
      {
        text: 'Esse é o jogo da memória.'
      },
      {
        text: 'Aqui teremos cartas viradas para baixo com palavras relacionadas à medição e seus conceitos.'
      },
      {
        text: 'Seu objetivo é parear as cartas corretamente, ou seja, cada palavra com cada conceito.'
      },
      {
        text: 'Caso você consiga fazer um par correto, ganha 1000 pontos.'
      },
      {
        text: 'Caso contrário, perde 100.'
      },
      {
        text: 'Está Pronto?'
      },
      {
        text: 'Vamos começar!'
      }
    ],

    score: 0,

    showScore: false,

    isPaired: false,

    isGameStart: false,

    pairedCards: [],

    cardsInGame: [],

    cardsInDeck: [],

    clickedCards: [],

    // As we don't have real tips, we are mocking this
    currentTip: 'tip1'
  }),

  created () {
    this.shuffleCards()
    this.flipDownCards()
  },

  computed: {
    gameFinished () {
      const allGroups = Array.from(this.cards.map(card => card.group))
      return allGroups.every(groupId => this.pairedCards.includes(groupId))
    }
  },

  methods: {
    finishUpTutorial() {
      this.score = 0
      this.flipDownCards()
      this.inTutorial = false
      this.shuffleCards()
      this.isGameStart = true
    },

    handleClickCard (card) {
      if (this.isGameStart) {
        if (!this.canClick(card)){
          this.card.flip = false
          this.clickedCards = []
        }

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

    flipDownCards () {
      for (let card of this.cardsInGame) {
        if (card.flip){
          card.flip = false
          card.color = ''
        }
      }
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
          cardA.color = 'brown'
          cardB.color = 'brown'
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
        this.clickedCards = []
        setTimeout(() => {
          for (let card of this.clickedCards) {
            card.flip = true
          }
          vm.clickedCards = []
        }, FLIP_WAIT_TIME)
      } else {
        let vm = this
        setTimeout(() => {
          if (this.score > 0) this.score -= 100
          for (let card of this.clickedCards) {
            card.flip = false
          }
          vm.clickedCards = []
        }, FLIP_WAIT_TIME)
      }
    },

    changeTip () {
      this.currentTip = `tip${Math.round(Math.random() * (4 - 1) + 1)}`
    },

    onNextText () {
      this.currentText++

      const firstCard = this.cardsInGame[0]

      // combina um par e ganha 1000 pts
      if (this.currentText === 3) {
        this.score = 1000

        // vira a primeira carta e seu par
        const otherCard = this.cardsInGame.find(card =>
          card.id !== firstCard.id && card.group === firstCard.group
        )

        firstCard.flip = true
        otherCard.flip = true

        this.setCardColor(firstCard, otherCard)
      }

      // erra um par e perde 100 pts
      if (this.currentText === 4) {
        // encontra um par errado que não esteja para cima
        const otherCards = this.cardsInGame
          .filter(card => card.group !== firstCard.group)

        const cardA = otherCards[0]
        const cardB = otherCards.find(card =>
          card.group !== cardA.group
        )

        cardA.flip = true
        cardB.flip = true

        this.score = 900
      }
    },

    shuffleCards () {
      this.cardsInGame = this.cards
        .sort(() => Math.random() - Math.random())
    },

    closeGame () {
      this.state.closeGame()
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

.balloon{
  width: 800px;
  height: 100px;
  top: 80px;
  left: 80px;
  margin-top: 100px;
  padding: 0.1em 1em;
  position: absolute;
  background: #FFD700;
  border-radius: 5px;
  text-align: flex-start;
  color: rgb(245, 245, 245);
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
}

.text {
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
  color: black;
}

.text2 {
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
  color: black;
  position: fixed;
  left: 900px;
  top: 250px;
}

.center{
  text-align: center;
}

</style>
