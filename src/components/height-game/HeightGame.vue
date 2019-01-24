<template>
  <div class="aligner">
    <Panel class="ScenePanel">
      <Scene v-if="config" :config="config" ref="scene">
      </Scene>
      <Button color="blue" class="submit-button" @click.native="submit">
        Submit
      </Button>
    </Panel>
  </div>
</template>

<script>
import Background from '../ui/Background.vue'
import Panel from '../ui/Panel.vue'
import Button from '../ui/Button.vue'
import Scene from '../phaser/Scene.vue'

export default {
  name: 'HeightGame',

  components: {
    Background,
    Panel,
    Button,
    Scene
  },

  data () {
    let yellowblocks
    function resize (width, height) {
      if (width === undefined) { width = this.sys.game.config.width }
      if (height === undefined) { height = this.sys.game.config.height }

      if (this.cameras) {
        this.cameras.resize(width, height)
      }
    }

    return {
      config: {
        physics: {
          default: 'arcade'
        },
        scene: {
          preload () {
            this.load.image('pancudinho', require('../../assets/pancudinho_medidas.png'))
            this.load.image('yellowblock', require('../../assets/yellow_panel.png'))
          },

          create () {
            this.events.on('resize', resize, this)

            const camera = this.cameras.main
            camera.setBackgroundColor('#bdbdbd')

            yellowblocks = [
              this.physics.add.image(0, 70, 'yellowblock'),
              this.physics.add.image(200, 70, 'yellowblock'),
              this.physics.add.image(400, 70, 'yellowblock'),
              this.physics.add.image(600, 70, 'yellowblock'),
              this.physics.add.image(800, 70, 'yellowblock'),
              this.physics.add.image(1000, 70, 'yellowblock')
            ]

            this.add.image(200, 405, 'pancudinho')

            for (let yellowblock of yellowblocks) {
              yellowblock.setVelocity(750, 0)
              yellowblock.setInteractive()
              yellowblock.on('pointerdown', function () {
                yellowblock.setVelocity(0, 1000)
                yellowblock.setCollideWorldBounds(true)
                this.physics.add.collider(yellowblock, yellowblocks)
              }, this)
            }
          },
          update () {
            this.physics.world.wrap(yellowblocks, 90)
          },
          resize
        }
      }
    }
  },

  methods: {
    submit () {
      const { scene } = this.$refs

      scene.game.events.emit('submit')
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

.defocus {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  display: table;
  transition: opacity .3s ease;
}

</style>
