import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import {withKnobs, object} from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'
// import { action } from '@storybook/addon-actions'

import BookselectGame from '../components/book/Select-game/select-game.vue'

const stories = storiesOf('Select Game', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories.add('Select-Game', (h) => ({
  render: h => h(BookselectGame, { props: {
    words: object('words', [
      {
        word1: 'lorem',
        selected_word: false,
        selected_gap: false,
        word_in_the_gap: '?',
        typedAwnser: '',
        showCheck: false,
        showX: false
      },
      {
        word1: 'praesent blandit',
        selected_word: false,
        selected_gap: false,
        word_in_the_gap: '?',
        typedAnswer: '',
        showCheck: false,
        showX: false
      },
      {
        word1: 'nullam et',
        selected_word: false,
        selected_gap: false,
        word_in_the_gap: '?',
        typedAwnser: '',
        showCheck: false,
        showX: false
      }
    ]),
    text: object('text', [
      {
        text1: 'Lorem ipsum dolor sit amet, est nullam discere intellegam ne, pro ne alterum facilisi, tibique deseruisse id per. Moderatius'
      },
      {
        text1: 'reprehendunt has eu. Aperiri definitiones conclusionemque vix eu, atqui velit pertinacia no his,'
      },
      {
        text1: 'mei eros civibus lobortis ne. Lorem feugiat'
      },
      {
        text1: 'sanctus nam no,et equidem conclusionemque cum. Sit in soleat fastidii dissentiunt, per facete veritus ne.'
      }
    ])
  }
  })
}))
