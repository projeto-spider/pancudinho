<template>
<div class="Tips">
  <p></P>
  <button @click="showTips=true">Tips</button>
    <div v-if="showTips">
      <div class=defocus @click="showTips=false">
        <div class="box tip"> {{ tip }} </div>
      </div>
    </div>
</div>
</template>

<script type="text/javascript">

export default {
  name: 'Tips',

  props: {
    tip: {
      type: String,
      required: true
    }
  },

  data: () => ({
    showTips: false
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
