import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { boolean, text, object, withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'
import { action } from '@storybook/addon-actions'

import Card from '../components/memory-game/Card.vue'
import Board from '../components/memory-game/Board.vue'

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
        :handle-click-one="handleClickOne"
      ></Board>
    `,

    components: { Board },

    data: () => ({
      cards: object('Cards', Array.from(Array(26), (_, i) => ({
        id: i + 1,
        flip: false,
        content: String.fromCharCode('A'.charCodeAt(0) + i)
      })))
    }),

    methods: {
      handleClickOne (card) {
        card.flip = !card.flip
        action('Clicked on Card')(card)
        console.log('a')
      }
    }
  }))
