<template>
  <div class="Background">
    <div class="clouds"></div>
  </div>
</template>

<script>
export default {
  name: 'Background'
}
</script>

<style scoped>
.Background {
  background-color: #8ec1da;
  width: 100vw;
  height: 100vh;
}
.clouds {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 400px;
  background-position: bottom;
  background-repeat: repeat-x;
  background-image: url('../../assets/bg-clouds.png');
  animation: animatedBackground 40s linear infinite;
}

@keyframes animatedBackground {
  from { background-position: 0 bottom; }
  to { background-position: 100% bottom; }
}
</style>
