import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import SelectFillGame from '../components/book/select-fill-game/SelectFillGame.vue'
import Background from '../components/ui/Background.vue'

const stories = storiesOf('Book Select Fill', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Select Fill Game with Background', (h) => ({
    render: h => h(Background, { props: {
    } }, [
      h(SelectFillGame, { props: {
        chunks: [
          {
            text: 'Descrição do peso',
            answer: 'Massa vezes gravidade'
          },
          {
            text: 'Periodicidade da coleta',
            answer: 'A cada final de semana'
          },
          {
            text: 'Periodicidade da análise',
            answer: 'A cada final de semana'
          },
          {
            text: 'Processo de medição',
            answer: 'Subir na balança, inserir contrapesos e equilibrar os pesos'
          },
          {
            text: 'Critérios de análise',
            answer: false
          },
          {
            indent: true,
            text: 'Critério Positivo',
            answer: 'OK ( X <= 80Kg): Manter a dieta com os exercícios'
          },
          {
            indent: true,
            text: 'Critério de Alerta',
            answer: '(80Kg < X <= 90): Aumentar os exercícios'
          },
          {
            indent: true,
            text: 'Critério Crítico',
            answer: '(X > 90): Aumentar os exercícios e o rigor da dieta'
          },
          {
            text: 'Responsável, público alvo e comunicação',
            answer: 'Pançudinho e Treinador; Pançudinho; Reunião Presencial'
          }
        ]
      }})
    ])
  }))
