<template>
  <button class="Button" @click="handleClick">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'Button',

  props: {
    handleClick: {
      type: Function,
      default: () => ({})
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.Button {
  font-family: kenvector_future;
  border-style: solid;
  color:#000;
  border-style: solid;
  border-width: 7px 27px 35px;
  padding: 0 0 5px 0;
  border-image: url('../../assets/grey_button00.png') 7 27 35 repeat;
  background-color: unset;
}
</style>


