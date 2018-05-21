<template>
  <transition name="wait-for-panel-bounce">
    <div v-show="open" class="Tip-container" :class="{ open }">
      <div class="Tip-foreground" @click="handleClose"></div>

      <transition name="bounce">
        <Panel v-show="open" class="Tip-panel">
          <slot></slot>
        </Panel>
      </transition>
    </div>
  </transition>
</template>

<script>
import Panel from './Panel.vue'

export default {
  name: 'Tip',

  components: { Panel },

  props: {
    open: {
      type: Boolean,
      required: true
    },

    handleClose: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style>
@keyframes wait-for-panel-bounce {
  0% {
    display: flex;
  }
  100% {
    display: none;
  }
}

.wait-for-panel-bounce-enter-active {
  animation: wait-for-panel-bounce .5s;
}
.wait-for-panel-bounce-leave-active {
  animation: wait-for-panel-bounce .5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

.Tip-container {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  position: fixed;
  width: 100vw;
  height: 100vh;
}

.Tip-container .Tip-foreground {
  position: fixed;
  z-index: 100;
  background-color: rgb(255, 255, 255);
  opacity: 0;
  filter: blur(100px);
  transition: opacity .2s ease;
  width: 100%;
  height: 100%;
}

.Tip-container.open .Tip-foreground {
  opacity: .6;
}

.Tip-container .Tip-panel {
  z-index: 101;
  margin: auto;
  width: 70%;
  min-height: 30%;
}
</style>
