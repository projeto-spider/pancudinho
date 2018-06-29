<template>
  <div class="aligner">
    <div v-if="ligthNovel">
      <visualNovel
        :closeVisualNovel="closeNovel"
        :talks="talks"
      ></visualNovel>
    </div>
    <div v-else>
      <div class="goalarea">
        <goal
          :goal="goal"
        >
        </goal>
      </div>
      <div class="dragdroparea">
        <draggable
          :option="options[1]"
        ></draggable>
        <droppable
          ref="el"
        ></droppable>
      </div>
      <div style="margin: -5em -10em 0em 30em;">
        <tips
          :tip="tip"
        ></tips>
        <button @click="avaluateAnswer">Submit</button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Tips from './Tips.vue'
import VisualNovel from './VisualNovel.vue'
import Draggable from './Draggable.vue'
import Droppable from './Droppable'
import Goal from './Goal.vue'

export default {
  name: 'AnalysisGame',

  components: {
    Tips,
    VisualNovel,
    Draggable,
    Droppable,
    Goal
  },

  props: {
    options: {
      type: Object,
      required: true
    },
    goal: {
      type: String,
      required: true
    },
    tip: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    talks: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    ligthNovel: true
  }),

  methods: {
    closeNovel () {
      this.ligthNovel = false
    },
    avaluateAnswer () {
      this.$refs.el.avaluateAswer(this.answer)
    }
  }
}
</script>

<style type="text/css">
.aligner {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.goalarea {
  margin: 1em 0em -2em -20em
},
.tiparea {
  margin: -5em -10em 0em 30em
}
</style>
