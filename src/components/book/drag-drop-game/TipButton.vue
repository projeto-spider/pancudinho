<template>
  <div>
    <button @click="open = true">
      Tip
    </button>
    <tip
      :showTip="open"
      :tip="tip"
      :closeTip="closeTip"
    >
    </tip>
</div>
</template>

<script type="text/javascript">
import Tip from './Tip.vue'

export default {
  name: 'TipButton',

  components: { Tip },

  data: () => ({
    tip: 'Lorem inpsun dolor',
    open: false
  }),

  methods: {
    closeTip () {
      this.open = false
    }
  }
}
</script>

<style type="text/css">
</style>
