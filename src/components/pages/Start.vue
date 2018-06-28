<template>
  <div>
    <div class="margin-layout" v-for="option in options" :key="option.id">
      <Button color="blue" @click="action(option.action)">{{option.text}}</Button>
    </div>
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

  data: () => ({
    options: [
      {
        id: 1,
        text: 'Começar jogo',
        action: 'start'
      },
      {
        id: 2,
        text: 'Configurações'
      },
      {
        id: 3,
        text: 'Créditos'
      }
    ]
  }),

  methods: {
    action (type) {
      switch (type) {
        case 'start':
          return this.state.goTo(this.PAGE.ABOUT)
      }
    }
  }
}
</script>

<style scoped>
.margin-layout {
  margin: 20px
}
</style>
