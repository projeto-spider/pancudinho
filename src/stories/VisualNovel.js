import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { withKnobs, object } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import VisualNovel from '../components/visual-novel/VisualNovel.vue'

const stories = storiesOf('Visual Novel', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Visual Novel', (h) => ({
    render: h => h(VisualNovel, { props: {
      scenes: object('Script', [
        {
          text: 'Olá, eu sou Pançudinho.',
          image: 'Quadro1.jpg',
          showText: ''
        },
        {
          text: 'Eu sei que a minha estética está ótima do jeito que está.',
          image: 'Quadro2.jpg'
        },
        {
          text: 'Mas notei que tenho me alimentado de um jeito bem deprimente.',
          image: 'Quadro3.jpg'
        },
        {
          text: 'Então decidi que a partir de hoje minha vida vai mudar.',
          image: 'Quadro4.jpg'
        },
        {
          text: 'Com alimentação saudável e exercícios físicos. Mas preciso de ajuda para isso.',
          image: 'Quadro5.jpg'
        },
        {
          text: 'Venha comigo se você quiser viver. Eu sou O TREINADOR.',
          image: 'Quadro6.jpg'
        },
        {
          text: 'Mas não é um caminho tão fácil como você pensa. Existem conceitos obscuros que você não conhece...',
          image: 'Quadro7.jpg'
        },
        {
          text: 'Mas como eu sou muito bondoso, eu posso ensinar para você.',
          image: 'Quadro8.jpg'
        },
        {
          text: 'Primeiro, temos que aprender a trabalhar com medidas, pois elas são essenciais para o nosso progresso.',
          image: 'Quadro9.jpg'
        },
        {
          text: 'Então, te apresento a medição. Com ela, nós vamos coletar, armazenar e relatar dados para que...',
          image: 'Quadro10.jpg'
        },
        {
          text: 'P: Balela isso! \n T: Como é?',
          image: 'Quadro11.jpg'
        },
        {
          text: 'P: Sei que você só ta fazendo isso pra levar meu dinheiro!',
          image: 'Quadro12.jpg'
        },
        {
          text: 'Mas quando falo que vou te ajudar, eu não tô mentindo.',
          image: 'Quadro13.jpg'
        },
        {
          text: 'Com a medição, você pode tomar decisões mais precisas e evidenciar melhor os pontos que quer melhorar.',
          image: 'Quadro14.jpg'
        },
        {
          text: 'P: Ok, ok...vamos ver o que você pode fazer \n T: Boa, garoto!',
          image: 'Quadro15.jpg'
        },
        {
          text: 'Agora, VAMOS COMEÇAR ESSA JORNADA!',
          image: 'Quadro16.jpg'
        }
      ])
    } })
  }))
  .add('With questions', (h) => ({
    render: h => h(VisualNovel, { props: {
      scenes: object('Script', [
        {
          question: true,
          text: 'Uma pergunta aleatória.',
          image: 'Quadro1.jpg',
          options: [
            {
              text: 'Para a frente a Brigada Ligeira!',
              correct: true
            },
            {
              text: 'Carreguem contra as armas!”, disse ele.'
            },
            {
              text: 'Para o Vale da Morte.'
            },
            {
              text: 'cavalgaram os seiscentos.'
            }
          ]
        }
      ])
    } })
  }))
