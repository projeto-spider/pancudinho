import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { number, withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import Background from '../components/ui/Background.vue'
import SeesawGame from '../components/seesaw-game/SeesawGame.vue'
import Tutorial from '../components/seesaw-game/Tutorial.vue'

const stories = storiesOf('Seesaw Game', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Game', (h) => ({
    render: h => h(Background, { props: {} }, [
      h(SeesawGame, { props: {
        weight: number(`Pançudinho's Weight`, 120)
      } })
    ])
  }))
  .add('Tutorial', (h) => ({
    render: h => h(Background, { props: {} }, [
      h(Tutorial, { props: {
        weight: number(`Pançudinho's Weight`, 120)
      } })
    ])
  }))
