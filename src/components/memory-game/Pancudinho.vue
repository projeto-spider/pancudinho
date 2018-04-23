<template>
  <div class="Pancudinho">
    <img @click="open = true" src="../../assets/pancudinho.png">
    <Message
      :open="open"
      :tips-choice="tipsChoice"
      :handle-close="closeMessage"
    ></Message>
  </div>
</template>

<script>
import Message from './Message.vue'

export default {
  name: 'Pancudinho',

  components: { Message },

  props: {
    tipsChoice: {
      type: String
    },

    handleClose: {
      type: Function,
      default: () => {}
    }
  },

  data () {
    return {
      open: false
    }
  },

  methods: {
    closeMessage() {
      this.open = false
      this.handleClose()
    }
  }
}
</script>

<style scoped>
.Pancudinho img {
  transform: scaleX(-1);
}
</style>
