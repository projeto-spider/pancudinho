<template>
  <div>
    <p v-if="state.isAuthenticated()">User: {{ state.playerName }}</p>
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

  data: () => ({}),

  methods: {
    action (type) {
      switch (type) {
        case 'start':
          if (this.state.isAuthenticated()) {
            return this.state.play()
          }

          return this.state.goTo(this.PAGE.AUTHENTICATION)

        case 'about':
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
