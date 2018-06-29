<template>
  <div class="game">
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
          :content="options[1]"
        ></draggable>
        <droppable
          ref="el"
        ></droppable>
      </div>
      <div style="margin: -5em -10em 0em 30em;">
        <tips
          :Tip="tip"
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

  data: () => ({
    options: {
      1: 'Loren inpsun dolor',
      2: 'sit amet est',
      3: 'pro ne alterum'
    },
    goal: 'Prepare yourself!',
    tip: 'Magic is everything!',
    ligthNovel: true,
    answer: 'Loren inpsun dolor',
    talks: [
      {task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia risus ut orci hendrerit rhoncus. Etiam imperdiet, sapien non feugiat molestie.'},
      {task: 'Usce efficitur posuere elit, varius gravid dolor feugiat eget. Vestibulum condimentum odio ac erat fermentum tincidunt.'},
      {task: 'Quisque tempor, tortor at maximus finibus, tellus felis fermentum ligula, ut hendrerit magna ex non ipsum. Ut bibendum dui id diam luctus elementum.'}
    ]
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
.goalarea {
  margin: 1em 0em -2em -20em
},
.tiparea {
  margin: -5em -10em 0em 30em
}
</style>
