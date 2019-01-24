<template>
  <div class="aligner">
      <Scene v-if="config" :config="config" ref="scene">
      </Scene>
      <Button color="blue" class="submit-button" @click.native="submit">
        Submit
      </Button>
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
    let barraEstadiometro, pancudinho, text
    let flag = 0
    let showCounter = ''
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
            this.load.image('consultorio', require('../../assets/Consultorio.png'))
            this.load.image('barra-estadiometro', require('../../assets/barra-estadiometro.png'))
            this.load.image('estadiometro', require('../../assets/estadiometro.png'))
            this.load.image('pancudinho', require('../../assets/pancudinho_medidas.png'))
          },
          create () {
            this.add.image(500, 190, 'consultorio')
            this.events.on('resize', resize, this)
            const camera = this.cameras.main
            camera.setBackgroundColor('#bdbdbd')
            this.physics.add.image(600, 320, 'estadiometro')
            barraEstadiometro = this.physics.add.image(600, 100, 'barra-estadiometro')
            pancudinho = this.physics.add.image(600, 470, 'pancudinho')
            pancudinho.setImmovable()
            barraEstadiometro.setCollideWorldBounds(true)
            barraEstadiometro.setInteractive()
            pancudinho.setInteractive()
            text = this.add.text(450, 50, '', { fontSize: '100px', fill: '#000' })
            setTimeout(function () {
              showCounter = 3
            }, 1000)
            setTimeout(function () {
              showCounter = 2
            }, 2000)
            setTimeout(function () {
              showCounter = 1
            }, 3000)
            setTimeout(function () {
              showCounter = 'Go!!!'
            }, 4000)
            setTimeout(function () {
              showCounter = ''
              barraEstadiometro.setVelocity(0, Math.floor((Math.random() * 300) + 100))
              flag = 1
            }, 4500)
            this.input.on('pointerdown', function () {
              if (barraEstadiometro.y < 270 && flag === 1) {
                this.add.text(200, 200, 'BOA TENTATIVA!', { fontSize: '60px', fill: '#000' })
              } else if (barraEstadiometro.y >= 270 && barraEstadiometro.y < 300) {
                this.add.text(200, 200, 'BOM!', { fontSize: '60px', fill: '#000' })
              } else if (barraEstadiometro.y >= 300 && barraEstadiometro.y <= 320) {
                this.add.text(200, 200, 'EXCELENTE!', { fontSize: '60px', fill: '#000' })
              }
              barraEstadiometro.setVelocity(0, 0)
            }, this)
            this.physics.add.overlap(barraEstadiometro, pancudinho, function () {
              this.scene.pause()
              this.add.text(200, 200, 'TENTE NOVAMENTE!', { fontSize: '60px', fill: '#000' })
            }, null, this)
            console.log(barraEstadiometro)
          },
          update () {
            text.setText(showCounter)
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
