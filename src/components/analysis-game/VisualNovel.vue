<template>
<div class="VisualNovel">

  <div  v-if="nextTalk==false">
    <div class="box two"> personal </div>
      <div class="box baloom" v-if="talkThree==false">
       <div class="text"> {{talkList[1]}} </div>
       <button @click="nextTalk=true">>></button>
      </div>
    <div class="box baloom" v-if="talkThree==true">
      <div class="text"> {{talkList[1]}} </div>
      <button @click="Game=true">>></button>
    </div>
  </div>
<div v-if="nextTalk==true">
<div class="box two"> pancud </div>
  <div class="box baloom">
     <div class="text"> {{talkList[1]}} </div>
        <button @click.prevent="(talkThree=true)" @click="(nextTalk=false)" >>></button>
   </div>
</div>

</div>
</template>

<script type="text/javascript">

import Vue from 'vue'


export default {
  name: 'VisualNovel',

  components:{Tips},

  props: {
    talkThree: {
      type: Boolean,
      default: false
    }

  },

  data: () => ({
    talkList:{
      Talk1: "lorem",
      Talk2: "blabla",
      Talk3: "bombom"
    },
    nextTalk: false,
    talkThree: false,
    game: false,

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
  margin-top:130px;
  margin-left: 700px;
  border-radius: 15px;
  background: plum;
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
  margin-top:15cm;
  text-align: center;
}
.box.baloom{

  width: 800px;
  height: 100px;
  margin-top:100px;
  padding: 0.2em 2em;
  background: plum;
  border-radius: 5px;
  text-align: center;
  border: solid;
}
.box.two{

  width: 100px;
  height: 100px;
  margin-top:100px;

  background: plum;
  border-radius: 5px;
  text-align: center;
  border: solid;
  border-radius: 100px;
}

</style>
