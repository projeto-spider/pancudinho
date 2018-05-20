<template>
  <div class="Background">
    <slot></slot>
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
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #8ec1da;
  width: 100vw;
  height: 100vh;
  z-index: 0;
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
  z-index: 1;
}

@keyframes animatedBackground {
  from { background-position: 0 bottom; }
  to { background-position: 100% bottom; }
}

@font-face {
  font-family: kenvector_future;
  src: url('../../assets/font/kenvector_future.ttf');
}

* {
  font-family: kenvector_future;
  color:#9f9ea1;
  z-index: 2;
}
</style>
