<template>
  <div class="aligner">
    <Panel class="ScenePanel">
      <Scene v-if="config" :config="config" ref="scene"></Scene>
        <template>
          <Button v-if="gameFinished" color="blue" class="submit-button" @click.native="closeGame">
            Continue
          </Button>
          <Button v-else color="blue" class="submit-button" @click.native="submit">
            Submit
          </Button>
      </template>>
    </Panel>
  </div>
</template>

<script>
import Phaser from 'phaser'
import Background from '../ui/Background.vue'
import Panel from '../ui/Panel.vue'
import Button from '../ui/Button.vue'
import Scene from '../phaser/Scene.vue'

import GqimNode from '../gqim-game/GqimNode'
import DropZone from '../gqim-game/DropZone'
import preloadGqimGame from '../gqim-game/preload-gqim-game'
import Platform from './Platform'
import Pancudinho from './Pancudinho'
import WeightBox from './WeightBox'

const { Body, Bodies, Constraint } = Phaser.Physics.Matter.Matter

export default {
  name: 'SeesawGame',

  components: {
    Background,
    Panel,
    Button,
    Scene
  },

  props: {
    state: {
      type: Object,
      required: true
    },

    tree: {
      type: Object,
      required: true
    }
  },

  data () {
    const $vm = this

    function updatePlatformPositions (scene, leftPlatform, rightPlatform, argWidth, argHeight) {
      const width = argWidth || scene.sys.game.config.width
      const height = argHeight || scene.sys.game.config.height

      const platformsWidth = 256
      const platformHeight = 18
      const platformSeparation = 600
      const platformCenterY = 400

      const quarterWidth = width / 4

      leftPlatform.setPosition(quarterWidth, platformCenterY)
      rightPlatform.setPosition(3 * quarterWidth, platformCenterY)
    }

    function resize (width, height) {
      if (width === undefined) { width = this.sys.game.config.width }
      if (height === undefined) { height = this.sys.game.config.height }

      if (this.cameras) {
        this.cameras.resize(width, height)
      }

      updatePlatformPositions(this, this.leftPlatform, this.rightPlatform)
    }

    return {
      config: {
        backgroundColor: '#eee',

        physics: {
          default: 'arcade',
          arcade: {
            debug: true,
            gravity: { y: 60 }
          }
        },
        scene: {
          preload () {
            this.load.image('platform', require('../../assets/boxCrate.png'))
            this.load.image('boxCrate', require('../../assets/boxCrate.png'))
            this.load.image('pancudinho', require('../../assets/alienBlue_front.png'))
            this.load.image('pancudinha', require('../../assets/alienPink_front.png'))
            this.load.image('machine-platform', require('../../assets/dirtCenter.png'))
          },

          create () {
            this.events.on('resize', resize, this)

            const platformsWidth = 256
            const platformHeight = 18
            const platformSeparation = 600
            const platformCenterY = 400

            this.leftPlatform = new Platform(this, 0, 0)
            this.rightPlatform = new Platform(this, 0, 0)

            updatePlatformPositions(this, this.leftPlatform, this.rightPlatform)

            const pancudinho = new Pancudinho(this, 0, 0, 120)
            // const pancudinha = new Pancudinho(this, 225 + platformSeparation, platformCenterY - 100, 80)

            this.leftPlatform.addObject(pancudinho, pancudinho.weight)
            // this.rightPlatform.addLoad(pancudinha, pancudinha.weight)

            const MIN_HUMAN_WEIGHT = 42
            const MAX_HUMAN_WEIGHT = 122

            // // const MAX_PLATFORM_Y =

            const helpText = () => `Left (${this.leftPlatform.weight}kg) | Right (${this.rightPlatform.weight}kg)`

            const help = this.add.text(16, 16, helpText(), {
              fontSize: "18px",
              padding: { x: 10, y: 5 },
              backgroundColor: "#ffffff",
              fill: "#000000"
            })

            const adjustPlatform = (platform, weight) => {
              const y = platformCenterY - platform.y + (weight * 3)
              platform.tweenTo(y)
            }

            const block = this.rightPlatform.addBox(10)

            block.setInteractive(block.getBounds(), () => {})

            block.on('pointerout', () => {
              console.log('he')
              block.increaseWeight(5)
            })


            // setInterval(() => {
            //   const nextWeight = Phaser.Math.Between(30, 50)
            //   this.rightPlatform.addBox(nextWeight)
            //   help.setText(helpText())
            //   adjustPlatform(this.leftPlatform, this.leftPlatform.weight - this.rightPlatform.weight)
            //   adjustPlatform(this.rightPlatform, this.rightPlatform.weight - this.leftPlatform.weight)
            // }, 3000)
          },

          update () {

          },
          resize
        }
      },
      gameFinished: false
    }
  },

  methods: {
    submit () {
      const { scene } = this.$refs

      scene.game.events.emit('submit')

      this.gameFinished = true
    },

    closeGame () {
      this.state.closeGame()
    }
  }
}
</script>

<style scoped>
.aligner {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.ScenePanel {
  width: 90%;
  height: 90%;
}

.submit-button {
  float: right
}
</style>
