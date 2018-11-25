<template>
  <div class="aligner">
    <Panel class="ScenePanel">
      <PhaserGame
        v-if="config"
        :config="config"
        ref="gameComponent"
      ></PhaserGame>

      <template>
        <Button v-if="gameFinished" color="blue" class="submit-button" @click.native="closeGame">
          Continuar
        </Button>
        <Button v-else color="blue" class="submit-button" @click.native="submit">
          Avaliar
        </Button>
      </template>
    </Panel>
  </div>
</template>

<script>
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice'
import Background from '../ui/Background.vue'
import Panel from '../ui/Panel.vue'
import Button from '../ui/Button.vue'
import Scene from '../phaser/Scene.vue'
import PhaserGame from '../phaser/PhaserGame.vue'

import GqimGameScene from './GqimGameScene'
import UiScene from './UiScene'

export default {
  name: 'GqimGame',

  components: {
    Background,
    Panel,
    Button,
    PhaserGame,
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
    return {
      config: {
        physics: {
          default: 'arcade'
        },
        plugins: {
          global: [ NineSlicePlugin.DefaultCfg ]
        },
        scene: [GqimGameScene, UiScene]
      },
      gameFinished: false
    }
  },

  mounted () {
    this.game.scene.start('GqimGameScene', {
      tree: this.tree,
      resize
    })

    function resize (width, height) {
      if (width === undefined) { width = this.sys.game.config.width }
      if (height === undefined) { height = this.sys.game.config.height }

      if (this.cameras) {
        this.cameras.resize(width, height)
      }
    }
  },

  computed: {
    game () {
      return this.$refs.gameComponent && this.$refs.gameComponent.game
    }
  },

  methods: {
    submit () {
      this.game.events.emit('submit')
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
