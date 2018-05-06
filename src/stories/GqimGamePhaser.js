import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import Phaser from '../components/gqim-game-phaser/Phaser.vue'
import GqimNode from '../components/gqim-game-phaser/GqimNode'

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
