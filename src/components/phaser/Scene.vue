<template>
  <div class="Scene" ref="game"></div>
</template>

<script>
import Phaser from 'phaser'

export default {
  name: 'Scene',

  props: {
    config: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    game: null
  }),

  mounted () {
    this.config.parent = this.$refs.game
    const { clientWidth, clientHeight } = this.$refs.game
    this.config.width = clientWidth
    this.config.height = clientHeight
    this.game = new Phaser.Game(this.config)

    if (this.game && this.game.resize) {
      this.resize = () => {
        if (this.$refs.game && this.game && this.game.resize) {
          const { clientWidth, clientHeight } = this.$refs.game
          this.game.resize(clientWidth, clientHeight)
        }
      }

      window.addEventListener('resize', this.resize, false)

      this.game.events.on('control:result', console.log)
    }
  },

  beforeDestroy () {
    if (this.resize) {
      window.removeEventListener('resize', this.resize)
    }

    if (this.game) {
      this.game.destroy()
      delete this.game
    }
  }
}
</script>

<style scoped>
.Scene {
  width: 100%;
  height: 100%;
}
</style>
