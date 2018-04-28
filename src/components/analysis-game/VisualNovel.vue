<template>
<div class="VisualNovel">
  <div  v-if="Talk==false && Game==false">
    <div class="box character"> personal </div>
      <div class="box balloon" v-if="nextTalk==false">
        <div class="text"> {{talkList[0].task}} </div>
        <button class="next" @click="Talk=true">>></button>
      </div>
      <div class="box balloon" v-if="nextTalk==true">
        <div class="text"> {{talkList[2].task}} </div>
        <button class="next" @click="Game=true">>></button>
      </div>
  </div>
  <div v-if="Talk==true && Game==false">
    <div class="box character"> pancud </div>
      <div class="box balloon">
        <div class="text"> {{talkList[1].task}} </div>
        <button class="next" @click.prevent="(nextTalk=true)" @click="(Talk=false)" >>></button>
      </div>
  </div>
  <Tips
    v-if="Game==true"
    :showTips="showTips"
    :Tip="Tip"
  ></Tips>
</div>

</template>

<script type="text/javascript">

import Tips from './Tips.vue'

export default {
  name: 'VisualNovel',

  components: {Tips},

  props: {
    nextTalk: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    Talk: false,
    nextTalk: false,
    Game: false,
    talkList: [
      {task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia risus ut orci hendrerit rhoncus. Etiam imperdiet, sapien non feugiat molestie.'},
      {task: 'Usce efficitur posuere elit, varius gravid dolor feugiat eget. Vestibulum condimentum odio ac erat fermentum tincidunt.'},
      {task: 'Quisque tempor, tortor at maximus finibus, tellus felis fermentum ligula, ut hendrerit magna ex non ipsum. Ut bibendum dui id diam luctus elementum.'}
    ]
  })
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
  display: table;
  transition: opacity .3s ease;
  background-color: rgba(0, 0, 0, .7);
}

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
