<template>
  <div class="Message" v-show="open">
    <div class="foreground" @click="handleClose"></div>
    <div class="popup">{{ messages[tipsChoice] }}</div>
  </div>
</template>

<script>
export default {
  name: 'Message',

  props: {
    open: {
      type: Boolean,
      default: false
    },

    tipsChoice: {
      type: String
    },

    handleClose: {
      type: Function,
      default: () => {}
    }
  },

  data: () => ({
    messages: {
      tip1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae maximus mi. In hac habitasse platea dictumst. Quisque risus risus, cursus eget risus sed, suscipit luctus nisl.',
      tip2: 'Phasellus metus massa, viverra ac gravida vitae, lobortis ac arcu. Aenean sit amet suscipit dui, non dignissim urna.',
      tip3: 'Sed non ultrices tellus, scelerisque iaculis leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      tip4: 'Lalala'
    }
  })
}
</script>

<style>
.Message {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.Message .foreground {
  position: fixed;
  z-index: 100;
  background-color: #dedede;
  width: 100%;
  height: 100%;
}

.Message .popup {
  position: fixed;
  z-index: 101;
  margin: auto;
  width: 70%;
  height: 30%;
  background-color: white;
  border-radius: 30px;
  padding: 25px;
}
</style>
