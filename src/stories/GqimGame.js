import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { boolean, text, object, withKnobs, number, select } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'
import { action } from '@storybook/addon-actions'

import Graph from '../components/gqim-game/Graph.vue'

const stories = storiesOf('GQIM Game', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Graph', (h) => ({
    render: h => h(Graph, { props: {
    } })
  }))
