<template>
  <div ref="game"></div>
</template>

<script>
import 'phaser'

export default {
  name: 'Phaser',

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
  }
}
</script>
