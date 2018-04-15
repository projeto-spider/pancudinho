import Vue from 'vue'

import { storiesOf } from '@storybook/vue'
import { boolean, text, withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'
import { action } from '@storybook/addon-actions'

import Card from '../components/memory-game/Card.vue'

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
