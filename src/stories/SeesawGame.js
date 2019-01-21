import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { number, withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import Background from '../components/ui/Background.vue'
import SeesawGame from '../components/seesaw-game/SeesawGame.vue'
import Tutorial from '../components/seesaw-game/Tutorial.vue'
import FinalGame from '../components/seesaw-game/FinalGame.vue'

const stories = storiesOf('Seesaw Game', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Tutorial', (h) => ({
    render: h => h(Background, { props: {} }, [
      h(Tutorial, { props: {
      } })
    ])
  }))

stories
  .add('Game', (h) => ({
    render: h => h(Background, { props: {} }, [
      h(SeesawGame, { props: {
        weight: number(`Pançudinho's Weight`, 120)
      } })
    ])
  }))

stories
  .add('Final Game', (h) => ({
    render: h => h(Background, { props: {} }, [
      h(FinalGame, { props: {
      } })
    ])
  }))
