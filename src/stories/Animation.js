import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'

import Phaser from '../components/gqim-game-phaser/Phaser.vue'

import pancudinhoRunAtlas from '../../static/animations/pancudinho-run.json'
import pancudinhoRunPng from '../../static/animations/pancudinho-run.png'

const stories = storiesOf('Phaser Animations', module)
stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('Pançudinho Run', (h) => ({
    render: h => h(Phaser, { props: {
      config: {
        scene: {
          preload () {
            this.load.atlas('pancudinho-run', pancudinhoRunPng, pancudinhoRunAtlas)
          },
          create () {
            this.anims.create({
              key: 'run',
              frames: this.anims.generateFrameNames('pancudinho-run', {
                prefix: 'corrida_',
                suffix: '.png',
                start: 0,
                end: 12
              }),
              repeat: -1
            })
            this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'pancudinho-run').play('run')
          },
          update () {}
        }
      }
    } })
  }))
