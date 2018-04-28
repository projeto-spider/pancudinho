<template>
<div class="VisualNovel">
  <div  v-if="nextTalk==false && Game==false">
    <div class="box two"> personal </div>
      <div class="box baloom" v-if="talkThree==false">
        <div class="text"> {{talkList[1].task}} </div>
        <button @click="nextTalk=true">>></button>
      </div>
      <div class="box baloom" v-if="talkThree==true">
        <div class="text"> {{talkList[2].task}} </div>
        <button @click="Game=true">>></button>
      </div>
  </div>
  <div v-if="nextTalk==true && Game==false">
    <div class="box two"> pancud </div>
      <div class="box baloom">
        <div class="text"> {{talkList[0].task}} </div>
        <button @click.prevent="(talkThree=true)" @click="(nextTalk=false)" >>></button>
      </div>
  </div>

<Tips
  v-if="Game==true"
  :showTips="showTips"
  :Tip="Tip">
</Tips>

</div>

</template>

<script type="text/javascript">

import Tips from './Tips.vue'

export default {
  name: 'VisualNovel',

  components: {Tips},

  props: {
    talkThree: {
      type: Boolean,
      default: false
    },
  },

  data: () => ({
    talkList: [
      {task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia risus ut orci hendrerit rhoncus. Etiam imperdiet, sapien non feugiat molestie.'},
      {task: 'usce efficitur posuere elit, varius gravid dolor feugiat eget. Vestibulum condimentum odio ac erat fermentum tincidunt.'},
      {task: 'Quisque tempor, tortor at maximus finibus, tellus felis fermentum ligula, ut hendrerit magna ex non ipsum. Ut bibendum dui id diam luctus elementum.'},
    ],
    nextTalk: false,
    talkThree: false,
    Game: false,

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
  margin-top:80px;
  margin-left: 700px;
  border-radius: 15px;
  background: plum;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  font: 400 30px/1.3 'Arizonia', Helvetica, sans-serif;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.2);
  text-align: center;
  border: none;
}

.box.baloom{

  width: 800px;
  height: 100px;
  margin-top:100px;
  padding: 0.1em 1em;
  background: plum;
  border-radius: 5px;
  text-align: center;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
}
.box.two{

  width: 100px;
  height: 100px;
  margin-top:90px;
  background: plum;
  border-radius: 5px;
  text-align: center;
  border-radius: 100px;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
}

</style>
