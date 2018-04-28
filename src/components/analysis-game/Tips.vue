<template>
<div class="Tips">
  <p></P>
  <button @click="showTips=true">Tips</button>
    <div v-if="showTips===true">
      <div class=defocus @click="showTips=false">
        <div class="box tip"> {{ Tip }} </div>
      </div>
    </div>
</div>
</template>

<script type="text/javascript">

export default {
  name: 'Tips',

  props: {
    Tip: {
      type: String,
      required: true
    }
  },

  data: () => ({
    showTips: false,
    Tip1: 'Lorem inpsun dolor'
  }),

}
</script>

<style>
.defocus {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  display: table;
  transition: opacity .3s ease;
}
button{
  width: 100px;
  margin-top:300px;
  margin-left: 800px;
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
  padding: 0.1em 2em;
  margin: 0.4em 0.4em;
  background: #ffffff;
  border-radius: 5px;
  margin-top: 2.5cm;
  text-align: center;
}

</style>
