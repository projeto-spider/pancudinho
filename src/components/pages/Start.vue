<template>
  <div>
    <div class="margin-layout" v-for="option in options" :key="option.id">
      <Button color="blue">{{option.text}}</Button>
    </div>
  </div>
</template>

<script>
import Button from '../ui/Button.vue'

export default {
  name: 'Start',

  componets: { Button },

  data: () => ({
    options: [
      {
        id: 1,
        text: 'Começar jogo'
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
  })
}
</script>

<style scoped>
.margin-layout {
  margin: 20px
}
</style>
