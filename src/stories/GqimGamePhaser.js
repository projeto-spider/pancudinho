import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { object, withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import Phaser from '../components/gqim-game-phaser/Phaser.vue'
import GqimGame from '../components/gqim-game-phaser/GqimGame.vue'
import GqimNode from '../components/gqim-game-phaser/GqimNode'
import DropZone from '../components/gqim-game-phaser/DropZone'

const stories = storiesOf('GQIM Game Phaser', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('GqimNode', (h) => ({
    render: h => h(Phaser, { props: {
      config: {
        physics: {
          default: 'arcade'
        },
        scene: {
          preload () {},
          create () {
            new GqimNode(this, this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'lalala') // eslint-disable-line
          },
          update () {}
        }
      }
    } })
  }))
  .add('DropZone', (h) => ({
    render: h => h(Phaser, { props: {
      config: {
        physics: {
          default: 'arcade'
        },
        scene: {
          preload () {},
          create () {
            new DropZone(this, this.sys.canvas.width / 2, this.sys.canvas.height / 2) // eslint-disable-line
          },
          update () {}
        }
      }
    } })
  }))
  .add('Game', (h) => ({
    render: h => h(GqimGame, { props: {
      tree: object('Tree', {
        goal: {
          id: 'goal-1',
          label: 'Melhorar o desempenho do aluno',
          edges: [
            'question-1',
            'question-2',
            'question-3'
          ]
        },

        questions: [
          {
            toDrop: true,
            id: 'question-1',
            label: 'Qual a média dos alunos?',
            edges: [
              'indicator-ma'
            ]
          },
          {
            id: 'question-2',
            label: 'Quais notas obtidas em cada módulo da disciplina?',
            edges: [
              'indicator-naocmd'
            ]
          },
          {
            id: 'question-3',
            label: 'Qual é a frequência do aluno?',
            edges: [
              'indicator-fa'
            ]
          }
        ],

        indicators: [
          {
            id: 'indicator-ma',
            label: 'MA – Média dos alunos',
            edges: [
              'metric-1'
            ]
          },
          {
            toDrop: true,
            id: 'indicator-naocmd',
            label: 'NAOCMD – Nota do aluno obtida em cada módulo da disciplina',
            edges: [
              'metric-1'
            ]
          },
          {
            id: 'indicator-fa',
            label: 'FA – Frequência do aluno',
            edges: [
              'metric-2'
            ]
          }
        ],

        metrics: [
          {
            id: 'metric-1',
            label: 'Nota'
          },
          {
            toDrop: true,
            id: 'metric-2',
            label: 'Frequência'
          }
        ]
      })
    } })
  }))
