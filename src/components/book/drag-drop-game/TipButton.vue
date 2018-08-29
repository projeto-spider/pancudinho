<template>
  <div>
    <Button :label="'Tip'" :handle-click="() => open = true"></Button>
    <Tip :open="open" :handle-close="() => open = false">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo libero et facilisis porta. Morbi molestie est eu augue euismod faucibus. Nullam id laoreet neque, eget placerat urna. Phasellus et odio facilisis purus aliquam pellentesque. Nulla facilisi. Nulla facilisi. Mauris sit amet nisi nec velit feugiat mattis non ut nunc.
    </Tip>
  </div>
</template>

<script type="text/javascript">
import Button from '../../ui/Button.vue'
import Tip from '../../ui/Tip.vue'

export default {
  name: 'TipButton',

  components: { Tip, Button },

  data: () => ({
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
