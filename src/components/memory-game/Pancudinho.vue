<template>
  <div class="Pancudinho">
    <img @click="open = true" src="../../assets/pancudinho.png">
    <Message
      :open="open"
      :tips-choice="tipsChoice"
      :handle-close="() => { open = false }"
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
    }
  },
  data () {
    return {
      open: false
    }
  }
}
</script>

<style scoped>
.Pancudinho img {
  transform: scaleX(-1);
}
</style>
