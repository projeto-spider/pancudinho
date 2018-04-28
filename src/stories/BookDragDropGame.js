import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { text, withKnobs, boolean } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'
import { action } from '@storybook/addon-actions'

import Draggable from '../components/book/drag-drop-game/Draggable.vue'
import Droppable from '../components/book/drag-drop-game/Droppable.vue'
import BookPage from '../components/book/drag-drop-game/BookPage.vue'
import Tip from '../components/book/drag-drop-game/Tip.vue'

const stories = storiesOf('Book Drag n Drop', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Draggable', (h) => ({
    render: h => h(Draggable, { props: {
      content: text('Content', 'Lorem inpsun dolor')
    } })
  }))
  .add('Droppable', (h) => ({
    render: h => h(Droppable, { props: {} })
  }))
  .add('Book Page', (h) => ({
    render: h => h(BookPage, { props: {} })
  }))
  .add('Tip', (h) => ({
    render: h => h(Tip, { props: {
      tip: text('Tip', 'Lorem ipsum dolor sit amet, an pro eruditi prodesset tincidunt.'),
      showTip: boolean('Show tip', false),
      closeTip: action('Closing window')
    } })
  }))
