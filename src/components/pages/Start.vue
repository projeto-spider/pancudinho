<template>
  <div>
    <p v-if="state.isAuthenticated()">User: {{ state.playerName }}</p>
    <div><Button color="blue" @click="startGame">Começar jogo</Button></div>
    <br/>
    <div><Button color="blue">Configurações</Button></div>
    <br/>
    <div><Button color="blue" @click="state.goTo(PAGE.ABOUT)">Créditos</Button></div>
  </div>
</template>

<script>
import Button from '../ui/Button.vue'

export default {
  name: 'Start',

  componets: { Button },

  props: {
    state: Object
  },

  data: () => ({}),

  methods: {
    startGame () {
      if (this.state.isAuthenticated()) {
        return this.state.play()
      }

      return this.state.goTo(this.PAGE.AUTHENTICATION)
    }
  }
}
</script>

<style scoped>
.margin-layout {
  margin: 20px
}
</style>
