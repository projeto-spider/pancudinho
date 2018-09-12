<template>
  <div class="aligner" v-if="currentTalk">
    <div class="character">
      <img :src="characters[currentTalk.character][currentTalk.emotion]">
    </div>

    <Panel class="box balloon" @click.native="next">
      {{currentTalk.task}}
    </Panel>

    <!-- <div class="box balloon" v-if="nextTalk==false">
      <div class="text"> {{talks[0].task}} </div>
      <button class="next" @click="Talk=true">>></button>
    </div> -->
  </div>

  <div v-else class="aligner">
    <div class="box character"> pancud </div>
      <div class="box balloon">
        <div class="text"> {{talks[1].task}} </div>
        <button class="next" @click.prevent="(nextTalk=true)" @click="closeVisualNovel" >>></button>
      </div>
  </div>
</template>

<script>
import Panel from '../ui/Panel.vue'

const characters = {
  pancudinho: {
    smile: require('../../assets/pancudinho-smile.png'),
    blushing: require('../../assets/pancudinho-blushing.png'),
    normal: require('../../assets/pancudinho-normal.png'),
    puzzled: require('../../assets/pancudinho-puzzled.png'),
    unhappy: require('../../assets/pancudinho-unhappy.png')
  },

  coach: {
    normal: require('../../assets/coach-normal.png')
  }
}

export default {
  name: 'VisualNovel',

  components: { Panel },

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
    characters,
    nextTalk: false,
    currentTalkId: 0
  }),

  computed: {
    currentTalk () {
      if (this.talks.length <= this.currentTalkId) {
        return false
      }

      return this.talks[this.currentTalkId]
    }
  },

  methods: {
    next () {
      this.currentTalkId++
    }
  }
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
  position: absolute;
  z-index: 2;
  bottom: 20px;
  width: 90%;
  height: 200px;
  left: 5%;
  font-size: 1.5em;
  cursor: pointer;
  /* width: 100%;
  height: 100px;
  margin: 0 30px;
  /* padding: 15px; */
  /* font-size: 1.15em; */
}

.character{
  max-height: 100vh;
  z-index: 1;
  /* position: absolute2; */
  /* width: 100px;
  height: 100px;
  margin-top:90px;
  background: plum;
  border-radius: 5px;
  text-align: center;
  color: rgb(255, 255, 255);
  border-radius: 100px;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8); */
}

</style>
