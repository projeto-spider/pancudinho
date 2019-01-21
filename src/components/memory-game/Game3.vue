<template>
<div>
    <div v-if='visualNovel'>

            <div v-if='((counter2==3) || (counter2==4))'>
              <div class='text'> {{showText}} </div>
              <div class='text' @click="handleClick()">>></div>
            </div>

            <div v-if='tutorialExample1'>
              <h2>Score: 1000</h2>
            </div>
            <div v-if='tutorialExample2'>
              <h2>Score: 900</h2>
            </div>

            <div class="MemoryGame">

                  <div>

                  <Board
                    :cards="cardsInGame"
                    :handle-click-card="handleClickCard"
                  ></Board>

                  <Pancudinho
                    :tips-choice="currentTip"
                    :handle-close="changeTip"
                  ></Pancudinho>

                  <div v-if='((counter2==0) || (counter2==1) || (counter2==2) || (counter2==5) || (counter2==6))' class='MemoryGame balloon'>
                    <div class='text'> {{showText}} </div>
                    <div class='text2' @click="handleClick()">>></div>
                  </div>

                  <button v-if="gameFinished" @click="closeGame">Continue</button>

                  </div>
          </div>
      </div>

      <div v-else>

        <h2 v-if='showScore'>Score: {{ score }}</h2>
        <div class="MemoryGame">
          <Board
            :cards="cardsInGame"
            :handle-click-card="handleClickCard"
          > </Board>

            <div class="row pancudinho-block">
              <Pancudinho
                :tips-choice="currentTip"
                :handle-close="changeTip"
              ></Pancudinho>

              <button v-if="gameFinished" @click="closeGame">Continue</button>
          </div>
        </div>
      </div>

</div>
</template>

<script>
/* eslint-disable */
import Pancudinho from './Pancudinho.vue'
import Board from './Board.vue'
import Card from './Card.vue'
import Panel from '../ui/Panel.vue'

const FLIP_WAIT_TIME = 5000

export default {
  name: 'MemoryGame',

  components: { Pancudinho, Board, Card, Panel },

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

    tutorial: [
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

    tutorialExample1: false,

    tutorialExample2: false,

    indexPaired: 0,

    indexNotPaired1: 0,

    indexNotPaired2: 0,

    showTextInterval: 0,

    showTextDigitCount: 0,

    showText: '',

    score: 0,

    showScore: false,

    isPaired: false,

    counter: 5,

    isGameStart: true,

    pairedCards: [],

    cardsInGame: [],

    cardsInDeck: [],

    clickedCards: [],

    counter2: -1,

    // As we don't have real tips, we are mocking this
    currentTip: 'tip1'
  }),

  created () {
    this.cardsInGame = this.cards
      .sort(() => Math.random() - Math.random())

    this.nextText()
  },

  computed: {
    gameFinished () {
      const allGroups = Array.from(this.cards.map(card => card.group))
      return allGroups.every(groupId => this.pairedCards.includes(groupId))
    }
  },

  methods: {

     handleClick () {

      if (this.tutorial[this.counter2].text === this.showText) {
        this.nextText()
      } else {
        this.skipWrittingText()
      }

    },

    nextText() {

      this.counter2++

      if (this.upTutorialEnd()) {
        this.finishUpTutorial()
      }

      if (this.counter2 >= this.tutorial.length) {
        this.counter2 = 0
        this.visualNovel = false
        this.isGameStart = false
        this.showScore = true
      }

      this.showText = ''
      this.showTextDigitCount = 0

      this.showTextInterval = setInterval(() => {
        const nextChar = this.tutorial[this.counter2].text[this.showTextDigitCount++]

        if (!nextChar) {
          this.tutorialScenes()
          this.clearShowTextInterval()
        } else {
          this.showText += nextChar
        }

      }, 50)

    },

    skipWrittingText () {
      this.clearShowTextInterval()
      this.tutorialScenes()
      this.showText = this.tutorial[this.counter2].text
    },

    clearShowTextInterval () {
      if (this.showTextInterval) {
        clearInterval(this.showTextInterval)
      }
    },


    tutorialScenes () {
      if (this.counter2 === 3) {
        this.tutorialExample1 = true
        this.tutorialExample2 = false
        this.tutorialScene1()
      } else if (this.counter2 === 4) {
        this.tutorialExample1 = false
        this.tutorialExample2 = true
        this.tutorialScene2()
      }
    },

    tutorialScene1 () {
      for (let i = 1; i < this.cardsInGame.length; i++) {
        if (this.cardsInGame[0].group === this.cardsInGame[i].group) {
          this.indexPaired = i
        }
      }
      this.cardsInGame[0].flip = true
      this.cardsInGame[this.indexPaired].flip = true
      this.setCardColor(this.cardsInGame[0], this.cardsInGame[this.indexPaired])
    },

    tutorialScene2 () {
      for (let i = 1; i < this.cardsInGame.length; i++) {
        if (i != this.indexPaired) {
          this.indexNotPaired1 = i
          break
        }
      }
      for (let i = 1; i < this.cardsInGame.length; i++) {
        if (i != this.indexNotPaired1 && i != this.indexPaired && this.cardsInGame[this.indexNotPaired1].group != this.cardsInGame[i].group) {
          this.indexNotPaired2 = i
          break
        }
      }
      this.cardsInGame[this.indexNotPaired1].flip = true
      this.cardsInGame[this.indexNotPaired2].flip = true
    },

    upTutorialEnd() {
      if (this.counter2 === 5) {
        return true
      }
    },

    finishUpTutorial() {
      this.tutorialScene2 = false
      this.flipDownCards()
    },

    handleClickCard (card) {

      if (!this.isGameStart) {

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
          alert('oi')
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
