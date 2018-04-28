import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { object, withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import Graph from '../components/gqim-game/Graph.vue'
import Game from '../components/gqim-game/Game.vue'

const stories = storiesOf('GQIM Game', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Graph', (h) => ({
    render: h => h(Graph, { props: {
      initialNodes: object('Initial Nodes', [
        { id: 'goal-1', label: 'Melhorar o desempenho do aluno' },
        { id: 'question-1', label: 'Qual a média dos alunos?' },
        { id: 'question-2', label: 'Quais notas obtidas em cada módulo da disciplina?' },
        { id: 'question-3', label: 'Qual é a frequência do aluno?' },
        { id: 'indicator-ma', label: 'MA – Média dos alunos' },
        { id: 'indicator-naocmd', label: 'NAOCMD – Nota do aluno obtida em cada módulo da disciplina' },
        { id: 'indicator-fa', label: 'FA – Frequência do aluno' },
        { id: 'metric-1', label: 'Nota' },
        { id: 'metric-2', label: 'Frequência' }
      ]),

      initialEdges: object('Initial Edges', [
        { from: 'goal-1', to: 'question-1', arrows: 'to' },
        { from: 'goal-1', to: 'question-2', arrows: 'to' },
        { from: 'goal-1', to: 'question-3', arrows: 'to' },
        { from: 'question-1', to: 'indicator-ma', arrows: 'to' },
        { from: 'question-2', to: 'indicator-naocmd', arrows: 'to' },
        { from: 'question-3', to: 'indicator-fa', arrows: 'to' },
        { from: 'indicator-ma', to: 'metric-1', arrows: 'to' },
        { from: 'indicator-naocmd', to: 'metric-1', arrows: 'to' },
        { from: 'indicator-fa', to: 'metric-2', arrows: 'to' }
      ])
    } })
  }))
  .add('Game', (h) => ({
    render: h => h(Game, { props: {
    } })
  }))
