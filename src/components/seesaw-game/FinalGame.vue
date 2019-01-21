<template>
  <div class="aligner">
    <Panel class="ScenePanel">
      <Scene v-if="config" :config="config" ref="scene"></Scene>
        <template>
          <Button v-if="gameFinished" color="blue" class="submit-button" @click.native="closeGame">
            Continue
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
import Platform from './Platform'
import Tutorial from './Tutorial.vue'

export default {
  name: 'SeesawGame',
  components: {
    Background,
    Panel,
    Button,
    Scene,
    Tutorial
  },
  props: {
    state: {
      type: Object,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    finishedTutorial: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const $vm = this
    function updatePlatformPositions (scene, leftPlatform, rightPlatform, argWidth, argHeight) {
      const width = argWidth || scene.sys.game.config.width
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
    const { weight } = this
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
            this.load.image('weight', require('../../assets/weight.png'))
            this.load.image('pancudinho', require('../../assets/alienBlue_front.png'))
            this.load.image('pancudinha', require('../../assets/alienPink_front.png'))
            this.load.image('machine-platform', require('../../assets/dirtCenter.png'))
            this.load.image('hudHeart_full', require('../../assets/hudHeart_full.png'))
            this.load.image('hud0', require('../../assets/hud0.png'))
            this.load.image('hud1', require('../../assets/hud1.png'))
            this.load.image('hud2', require('../../assets/hud2.png'))
            this.load.image('hud3', require('../../assets/hud3.png'))
            this.load.audio('1', [
              require('../../assets/audio/1.ogg')
            ])
            this.load.audio('2', [
              require('../../assets/audio/2.ogg')
            ])
            this.load.audio('3', [
              require('../../assets/audio/3.ogg')
            ])
            this.load.audio('congratulations', [
              require('../../assets/audio/congratulations.ogg')
            ])
          },
          create () {
            this.events.on('resize', resize, this)
            this.won = false
            const platformCenterY = 400
            this.leftPlatform = new Platform(this, 0, 0)
            this.rightPlatform = new Platform(this, 0, 0)
            updatePlatformPositions(this, this.leftPlatform, this.rightPlatform)
            const pancudinhoWeight = weight
            this.leftPlatform.addPancudinho(pancudinhoWeight)
            this.add.text(16, 16, 'Mantenha a bigorna pressionada para aumentar seu peso. Tente balancear os lados.', {
              fontSize: '18px',
              padding: { x: 10, y: 5 },
              backgroundColor: '#ffffff',
              fill: '#000000',
              wordWrap: {
                width: 500
              }
              // fontFamily: 'kenvector_future'
            })
            this.adjustPlatform = (platform, weight) => {
              const y = platformCenterY - platform.y + (weight * 1.5)
              platform.tweenTo(y)
            }
            const block = this.rightPlatform.addWeightBox(1)
            this.interval = null
            let intervalStarted = Date.now()
            // Function that calculates how much to gain/lose weight for the WeightBox
            let delta = () => {
              // The delta weight is 1 + half many seconds past since the interval started.
              const minSpeed = 1
              const millisecondsSinceStart = Date.now() - intervalStarted
              const secondsSinceStart = millisecondsSinceStart / 1000
              const increase = secondsSinceStart / 2
              return Math.floor(minSpeed + increase)
            }
            const increaseWeight = () => {
              clearInterval(this.interval)
              intervalStarted = Date.now()
              if (!this.won) {
                this.interval = setInterval(() => this.rightPlatform.increaseLoadWeight(delta()), 50)
              }
            }
            const decreaseWeight = () => {
              clearInterval(this.interval)
              intervalStarted = Date.now()
              if (!this.won) {
                this.interval = setInterval(() => this.rightPlatform.decreaseLoadWeight(delta()), 50)
              }
            }
            block.image.setInteractive()
            block.image.on('pointerdown', increaseWeight)
            block.image.on('pointerup', decreaseWeight)
            block.image.on('pointerout', decreaseWeight)
            this.graphics = this.add.graphics({
              lineStyle: {
                width: 2,
                color: 0xaa00aa
              },
              fillStyle: {
                color: 0x0000aa
              }
            })
            this.line = new Phaser.Geom.Line(0, 0, 0, 0)
            this.foundValidSlope = false
            this.validSlopeInterval = null
            this.validSlopeIntervalCount = 3
            this.countdownImage = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'hud3').setVisible(false)
          },
          update () {
            if (!this.won) {
              this.adjustPlatform(this.leftPlatform, this.leftPlatform.weight - this.rightPlatform.weight)
              this.adjustPlatform(this.rightPlatform, this.rightPlatform.weight - this.leftPlatform.weight)
            }
            this.line.x1 = 0
            this.line.y1 = this.leftPlatform.y
            this.line.x2 = this.sys.game.config.width
            this.line.y2 = this.rightPlatform.y
            const slope = Math.abs(Phaser.Geom.Line.Slope(this.line))
            const accuracyThreshold = 0.005
            const isBalanced = slope < accuracyThreshold
            if (!this.foundValidSlope && isBalanced) {
              this.foundValidSlope = true
              this.validSlopeInterval = setInterval(() => {
                if (this.validSlopeIntervalCount === 0) {
                  clearInterval(this.validSlopeInterval)
                  clearInterval(this.interval)
                  this.won = true
                  $vm.finish()
                }
                this.countdownImage
                  .setTexture(`hud${this.validSlopeIntervalCount}`)
                  .setVisible(true)
                if (this.validSlopeIntervalCount > 0) {
                  this.sound.add(`${this.validSlopeIntervalCount}`).play()
                } else {
                  this.sound.add('congratulations').play()
                  this.countdownImage
                    .setTexture('hudHeart_full')
                    .setVisible(true)
                }
                this.validSlopeIntervalCount--
              }, 1000)
            } else if (this.foundValidSlope && !isBalanced && !this.won) {
              this.foundValidSlope = false
              clearInterval(this.validSlopeInterval)
              this.validSlopeIntervalCount = 3
              this.countdownImage
                .setVisible(false)
                .setTexture('hud3')
            }
            this.graphics.setVisible(isBalanced)
            this.graphics.clear()
            this.graphics.strokeLineShape(this.line)
          },
          resize
        }
      },
      gameFinished: false
    }
  },
  methods: {
    finishTutorial () {
      this.finishedTutorial = true
    },
    finish () {
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
