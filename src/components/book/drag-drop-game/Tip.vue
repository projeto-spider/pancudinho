<template>
  <div v-if="showTip">
    <div class="defocus" @click="closeTip">
      <div class="tip">
        <p>{{ tip }}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'Tip',

  props: {
    showTip: {
      type: Boolean,
      default: false
    },

    closeTip: {
      type: Function,
      default: () => {}
    },

    tip: {
      type: String,
      required: true
    }
  }
}
</script>

<style type="text/css" scoped>
.tip {
  background: #bdbdbd;
  z-index: 101;
  margin: 18% 24%;
  width: 50%;
  height: 30%;
  border-radius: 30px;
  padding: 5%;
}

.defocus {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e7e7e7;
  display: table;
  transition: opacity .3s ease;
}
</style>
