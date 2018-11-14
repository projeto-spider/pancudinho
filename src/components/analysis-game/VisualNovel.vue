<template>
  <div class="VisualNovel">
    <div v-if="currentTalk.name" class="box character">{{ currentTalk.name }}</div>
    <div class="box balloon" @click="handleNext">
      <div class="text">{{ currentTalk.task }}</div>
      <button class="next" @click="handleNext">>></button>
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
    nextTalk: false,
    currentTalkIndex: 0
  }),

  computed: {
    currentTalk () {
      return this.talks[this.currentTalkIndex]
    }
  },

  methods: {
    handleNext () {
      this.currentTalkIndex++

      if (!this.currentTalk) {
        this.closeVisualNovel()
      }
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
