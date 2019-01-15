<template>
<div>
    <div v-if='visualNovel'>
      <Panel>
        <div v-if='(counter2 === 2) || (counter2 === 3)'>
          <p class='center'>
            <img src="../../assets/Par1.jpg">
            <img src="../../assets/Par2.jpg">
          </p>
        </div>
        <div v-else>
          <p class='center'><img src="../../assets/PancudinhoVitruviano.jpg"></p>
        </div>
        <div class='balloon'>
        <div class='text' v-for='item in tutorial' :key="item.id" v-if='item.showText'>
          {{item.text}}
          </div>
          <div class='text' @click="nextText()">>></div>
        </div>
      </Panel>
      </div>

    <div v-if='!visualNovel'>
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

const FLIP_WAIT_TIME = 1000

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
          text: 'Esse é o jogo da memória.',
          displayedText: '',
          showText: true
        },
        {
          text: 'Aqui teremos cartas viradas para baixo com palavras relacionadas à medição e seus conceitos.',
          showText: false
        },
        {
          text: 'Seu objetivo é parear as cartas corretamente, ou seja, cada palavra com cada conceito.',
          showText: false
        },
        {
          text: 'Você terá 5 segundos no início com todas as cartas viradas para cima.',
          showText: false
        },
        {
          text: 'Pronto?',
          showText: false
        },
        {
          text: 'Vamos começar!',
          showText: false
        }
    ],

    score: 0,

    showScore: false,

    isPaired: false,

    counter: 5,

    isGameStart: true,

    pairedCards: [],

    cardsInGame: [],

    cardsInDeck: [],

    clickedCards: [],

    counter2: 0,

    // As we don't have real tips, we are mocking this
    currentTip: 'tip1'
  }),

  created () {
    this.cardsInGame = this.cards
      .sort(() => Math.random() - Math.random())
  },

  computed: {

    randomFunction(){
      alert('oi')
    },

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
    },

    gameFinished () {
      const allGroups = Array.from(this.cards.map(card => card.group))
      return allGroups.every(groupId => this.pairedCards.includes(groupId))
    }
  },

  methods: {
     nextText() {

      this.counter2++
      if (this.counter2 >= this.tutorial.length) {
        this.counter2 = 0
        this.visualNovel = false
      }
      for (let i = 0; i < this.tutorial.length; i++) {
        if (this.tutorial[i].showText) {
          this.tutorial[i].showText = false
        }
      }
      this.tutorial[this.counter2].showText = true
    },

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
  margin-top:100px;
  padding: 0.1em 1em;
  background: #00ace6;
  border-radius: 5px;
  text-align: flex-start;
  color: rgb(245, 245, 245);
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
}

.text{
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
  color: white
}

.center{
  text-align: center;
}

</style>
