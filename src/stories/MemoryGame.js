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
      cards: object('Cards', Array.from(['O que é Medição?', 'Medição é uma avaliação quantitativa de qualquer aspecto ou fenômeno de uma entidade mensurável.', 'Qual é o propósito da Medição?', ' O propósito do processo Medição é coletar, armazenar, analisar e relatar os dados relativos a um objeto de medição, de forma a apoiar a tomada de decisão.', 'Qual a importância da Medição?', 'Não se pode controlar o que não se pode medir. E não se pode predizer o que não se pode medir.', 'O que são Medidas?', 'Elemento básico da medição. Medidas caracterizam, em termos quantitativos, uma propriedade de um objeto e fornecem informações quantitativas capazes de apoiar tomadas de decisão técnicas e de negócios.', ' O que são Medidas Básicas?', 'Medida básica é aquela definida em termos de um único atributo por método de medição, sendo funcionalmente independente de outras medidas, por exemplo, LOC (sigla do termo em inglês para linhas de código - Lines of Code), horas trabalhadas etc.', 'O que são Medidas Derivadas?', 'Medida derivada é aquela definida em função de dois ou mais valores de medidas básicas ou derivadas. Por exemplo, índice de massa corporal = peso/(altura)^2 , produtividade = LOC/horas trabalhadas.', 'O que são Indicadores?', 'Medida utilizada para analisar o alcance a objetivos. Ou seja, um indicador é uma estimativa ou avaliação que provê uma base para a tomada de decisão'], (k, i) => ({
        id: i + 1,
        flip: false,
        content: k,
        color: ''
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
      cards: Array.from(['O que é Medição?', 'Qual é o propósito da Medição?', 'Qual a importância da Medição?', 'O que são Medidas?', 'O que são Medidas Básicas?', 'O que são Medidas Derivadas?', 'O que são Indicadores?', 'Medição é uma avaliação quantitativa de qualquer aspecto ou fenômeno de uma entidade mensurável.', 'O propósito da Medição é coletar, armazenar, analisar e relatar os dados de um objeto de medição, visando a tomada de decisão.', 'Não se pode controlar o que não se pode medir. E não se pode predizer o que não se pode medir.', 'Elemento base da medição. Caracterizam, em termos quantitativos, um atributo de um objeto e fornecem informações importantes na tomada de decisão.', 'Medida definida em termos de um único atributo, sendo independente de outras medidas, por exemplo, massa corporal', 'Medida definida em função de dois ou mais valores de medidas básicas ou derivadas. Por exemplo, IMC=massa/\n(altura)^2.', 'Medida utilizada para analisar o alcance a objetivos, sendo uma estimativa que provê uma base para a tomada de decisão.'], (k, i) => ({
        id: i + 1,
        flip: true,
        content: k,
        group: Math.floor(i % 7),
        color: ''
      }))
    } })
  }))
