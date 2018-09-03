import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import Background from '../components/ui/Background.vue'
import HeightGame from '../components/height-game/HeightGame.vue'

const stories = storiesOf('Height Game', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Game', (h) => ({
    render: h => h(Background, { props: {} }, [
      h(HeightGame, { props: {
      } })
    ])
  }))
