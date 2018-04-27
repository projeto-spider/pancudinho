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
      initialNodes: object('Initial Nodes', [
        {id: 1, label: 'Node 1'},
        {id: 2, label: 'Node 2'},
        {id: 3, label: 'Node 3'},
        {id: 4, label: 'Node 4'},
        {id: 5, label: 'Node 5'},
        {id: 6, label: 'Node 6'}
      ]),

      initialEdges: object('Initial Edges', [
        {from: 1, to: 3},
        {from: 1, to: 2},
        {from: 2, to: 4},
        {from: 2, to: 5},
        {from: 3, to: 3}
      ])
    } })
  }))
