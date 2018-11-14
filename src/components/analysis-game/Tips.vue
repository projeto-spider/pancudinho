<template>
  <div>
    <Tip :open="open" :handle-close="() => open = false">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo libero et facilisis porta. Morbi molestie est eu augue euismod faucibus. Nullam id laoreet neque, eget placerat urna. Phasellus et odio facilisis purus aliquam pellentesque. Nulla facilisi. Nulla facilisi. Mauris sit amet nisi nec velit feugiat mattis non ut nunc.
    </Tip>
    <Button :label="'Dicas'" :handle-click="() => open = true"></Button>
  </div>
</template>

<script type="text/javascript">
import Tip from '../ui/Tip.vue'
import Button from '../ui/Button.vue'

export default {
  name: 'Tips',

  components: { Tip, Button },

  data: () => ({
    open: false
  })
}
</script>

<style scoped>
</style>
