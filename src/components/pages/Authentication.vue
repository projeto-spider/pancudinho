<template>
  <div>
    <h2>Authentication</h2>
    <p>This page is mocked up.</p>
    <p>You're going to be automatically logged-in.</p>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',

  props: {
    state: Object
  },

  created () {
    setTimeout(() => this.state.authenticate('Pançudinho'), 3000)
  }
}
</script>

<style scoped>
.margin-layout {
  margin: 20px
}
</style>
