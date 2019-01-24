<template>
  <div class="aligner">

      <Scene v-if="config" :config="config" ref="scene">
      </Scene>
      <div>
      <Tutorial :next-tutorial="() => nextTutorial()" class="tutorial"></Tutorial>
    </div>
  </div>
</template>

<script>
import Background from '../ui/Background.vue'
import Panel from '../ui/Panel.vue'
import Button from '../ui/Button.vue'
import Scene from '../phaser/Scene.vue'
import Tutorial from './Tutorial2.vue'

export default {
  name: 'HeightGame',

  components: {
    Background,
    Panel,
    Button,
    Scene,
    Tutorial
  },

  props: {
    changeScene: {
      type: Function
    }
  },

  data () {
    let barraEstadiometro, pancudinho, text
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
            this.add.image(700, 190, 'consultorio')
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
              barraEstadiometro.setVelocity(0, 400)
            }, 1000)

            this.physics.add.overlap(barraEstadiometro, pancudinho, function () {
              this.scene.pause()
              this.add.text(200, 200, 'TENTE NOVAMENTE', { fontSize: '60px', fill: '#000' })
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
