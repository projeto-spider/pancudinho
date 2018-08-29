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
button{
  border-radius: 15px;
  background: plum;
  padding: 0.1px 16px;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  font: 400 30px/1.3 'Arizonia', Helvetica, sans-serif;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.2);
  text-align: center;
  border: none;
}
.box.tip{
  background: #bdbdbd;
  z-index: 101;
  margin: 18% 24%;
  width: 50%;
  height: 30%;
  border-radius: 30px;
  padding: 5%;
}

</style>
