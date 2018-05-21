<template>
  <div class="Tip-container" v-show="open">
    <div class="Tip-foreground" @click="handleClose"></div>

    <Panel class="Tip-panel">
      <slot></slot>
    </Panel>
  </div>
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
.Tip-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.Tip-container .Tip-foreground {
  position: fixed;
  z-index: 100;
  background-color: rgba(255, 255, 255, .6);
  filter: blur(100px);
  transition: 2s background-color ease;
  width: 100%;
  height: 100%;
}

.Tip-container .Tip-panel {
  z-index: 101;
  margin: auto;
  width: 70%;
  min-height: 30%;
  background-color: white;
  border-radius: 30px;
  padding: 25px;
}
</style>
