import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { text, withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import Draggable from '../components/book/drag-drop-game/Draggable.vue'

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
