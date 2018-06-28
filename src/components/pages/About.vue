<template>
  <div>
    <h2>About</h2>
    <p>
      <button @click="state.goTo(PAGE.START)">Back</button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',

  props: {
    state: Object
  }
}
</script>

<style scoped>
.margin-layout {
  margin: 20px
}
</style>
