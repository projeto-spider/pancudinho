<template>
  <div
    class="Background"
    :style="`background-image: url('${WoodPng}')`"
  >
    <slot></slot>
  </div>
</template>

<script>
import WoodPng from '../../assets/wood.png'

export default {
  name: 'Background',
  data: () => ({
    WoodPng
  })
}
</script>

<style scoped>
.Background {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #8ec1da;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background-size: cover;
  background-repeat: repeat-y;
}
</style>
