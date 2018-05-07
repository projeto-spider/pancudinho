import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import Phaser from '../components/gqim-game-phaser/Phaser.vue'

const stories = storiesOf('GQIM Game Phaser', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Phaser', (h) => ({
    render: h => h(Phaser, { props: {
      config: {
        scene: {
          preload () {},
          create () {},
          update () {}
        }
      }
    } })
  }))
