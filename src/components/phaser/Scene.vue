<template>
  <div ref="game"></div>
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
    this.game = new Phaser.Game(this.config)
  },

  beforeDestroy () {
    if (this.game) {
      this.game.destroy()
      delete this.game
    }
  }
}
</script>
