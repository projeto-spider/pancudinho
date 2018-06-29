import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { boolean, text, object, withKnobs, number, select } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'
import { action } from '@storybook/addon-actions'

import Card from '../components/memory-game/Card.vue'
import Board from '../components/memory-game/Board.vue'
import Deck from '../components/memory-game/Deck.vue'
import Pancudinho from '../components/memory-game/Pancudinho.vue'
import Message from '../components/memory-game/Message.vue'
import Game from '../components/memory-game/Game.vue'

const stories = storiesOf('Memory Game', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Card', (h) => ({
    render: h => h(Card, { props: {
      flip: boolean('Flip Card', false),
      content: text('Content', 'A'),
      handleClick: action('Click')
    } })
  }))
  .add('Board', () => ({
    template: `
      <Board
        :cards="cards"
        :handle-click-card="handleClickCard"
      ></Board>
    `,

    components: { Board },

    data: () => ({
      cards: object('Cards', Array.from(Array(26), (_, i) => ({
        id: i + 1,
        flip: false,
        content: String.fromCharCode('A'.charCodeAt(0) + i)
      }))),

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
        action('Clicked on first Card')(card)
        this.clickedCards.push(card)
      },

      handleClickTwo (card) {
        if (card.id === this.clickedCards[0].id) return

        card.flip = !card.flip
        action('Clicked on second Card')(card)
        this.clickedCards.push(card)

        action('Matched two cards')(...this.clickedCards)

        setTimeout(() => {
          for (let card of this.clickedCards) {
            card.flip = false
          }

          this.clickedCards = []
        }, 1500)
      }
    }
  }))
  .add('Deck', (h) => ({
    render: h => h(Deck, { props: {
      nCards: number('Cards Number', 5)
    } })
  }))
  .add('Pancudinho', (h) => ({
    render: h => h(Pancudinho, { props: {
      tipsChoice: select('Tip ID', {
        tip1: 'Tip One',
        tip2: 'Tip Two',
        tip3: 'Tip Three',
        tip4: 'Premium Tip'
      }, 'tip1')
    } })
  }))
  .add('Message', (h) => ({
    render: h => h(Message, { props: {
      tipsChoice: select('Tip ID', {
        tip1: 'Tip One',
        tip2: 'Tip Two',
        tip3: 'Tip Three',
        tip4: 'Premium Tip'
      }, 'tip1'),
      open: boolean('Open Message', false),
      handleClose: action('Closing window')
    } })
  }))

storiesOf('Memory Game', module)
  .addDecorator(withKnobs)
  .add('Game', (h) => ({
    render: h => h(Game, { props: {
      cards: Array.from(Array(26), (_, i) => ({
        id: i + 1,
        flip: false,
        content: String.fromCharCode('A'.charCodeAt(0) + i) + `(${Math.floor(i % 13)})`,
        group: Math.floor(i % 13)
      }))
    } })
  }))
