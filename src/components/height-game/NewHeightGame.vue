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
import Phaser from 'phaser'
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
    const $vm = this
    let barraEstadiometro, estadiometro, pancudinho, flag
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
            this.load.image('barra-estadiometro', require('../../assets/barra-estadiometro.png'))
            this.load.image('estadiometro', require('../../assets/estadiometro.png'))
            this.load.image('pancudinho', require('../../assets/pancudinho.png'))
          },

          create () {
            this.events.on('resize', resize, this)

            const camera = this.cameras.main
            camera.setBackgroundColor('#bdbdbd')

            estadiometro=this.physics.add.image(400, 230, 'estadiometro')
            barraEstadiometro=this.physics.add.image(400, 70, 'barra-estadiometro')
            pancudinho=this.physics.add.image(390, 395, 'pancudinho')
            barraEstadiometro.setCollideWorldBounds(true)
            //pancudinho.setCollideWorldBounds(true)
            barraEstadiometro.setInteractive()
            pancudinho.setInteractive()
            barraEstadiometro.setVelocity(0,Math.floor((Math.random()*700)+300))
            flag=this.physics.add.collider(pancudinho, barraEstadiometro)
            /*console.log(flag.active)
            this.input.on('pointerdown', function(){
              block.setVelocity(0,0)
            }, this);*/
            this.input.on('pointerdown', function(){
              this.scene.pause();

            }, this);
            this.physics.add.overlap(barraEstadiometro, pancudinho, function(){
              alert('Tente novamente!')
              this.scene.pause();
            }, null, this);
            console.log(barraEstadiometro.body.speed)


          },
          update () {
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
