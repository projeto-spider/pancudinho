<template>
<div class="VisualNovel">
  <div  v-if="Talk==false">
    <div class="box character"> personal </div>
      <div class="box balloon" v-if="nextTalk==false">
        <div class="text"> {{talks[0].task}} </div>
        <button class="next" @click="Talk=true">>></button>
      </div>
      <div class="box balloon" v-if="nextTalk==true">
        <div class="text"> {{talks[2].task}} </div>
        <button class="next">>></button>
      </div>
  </div>
  <div v-if="Talk==true">
    <div class="box character"> pancud </div>
      <div class="box balloon">
        <div class="text"> {{talks[1].task}} </div>
        <button class="next" @click.prevent="(nextTalk=true)" @click="closeVisualNovel" >>></button>
      </div>
  </div>
</div>
</template>

<script type="text/javascript">

export default {
  name: 'VisualNovel',

  props: {
    closeVisualNovel: {
      type: Function,
      dafault: () => {}
    },

    talks: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    Talk: false,
    nextTalk: false
  })
}
</script>

<style scoped>
.next{
  width: 100px;
  border: none;
  margin-top:0.1px;
  margin-left: 670px;
  text-align: center;
  background: plum;
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.0);
  text-shadow: 4px 4px 0px rgba(0,0,0,0.2);
  font: 400 30px/1.3 'Arizonia', Helvetica, sans-serif;
}

.box.balloon{
  width: 800px;
  height: 100px;
  margin-top:100px;
  padding: 0.1em 1em;
  background: plum;
  border-radius: 5px;
  text-align: center;
  color: rgb(245, 245, 245);
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
}

.box.character{
  width: 100px;
  height: 100px;
  margin-top:90px;
  background: plum;
  border-radius: 5px;
  text-align: center;
  color: rgb(255, 255, 255);
  border-radius: 100px;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
}

</style>
