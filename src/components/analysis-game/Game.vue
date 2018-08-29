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
        <template>
          <Button 
            v-if="gameFinished" 
            :label="'Continuar'" 
            :handle-click="closeGame"
          ></Button>
          <Button 
            v-else 
            :label="'Enviar'" 
            :handle-click="avaluateAnswer"
          ></Button>
        </template>
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
import Button from '../ui/Button.vue'

export default {
  name: 'AnalysisGame',

  components: {
    Tips,
    VisualNovel,
    Draggable,
    Droppable,
    Goal,
    Button
  },

  props: {
    state: {
      type: Object,
      required: true
    },
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
    ligthNovel: true,
    gameFinished: false
  }),

  methods: {
    closeNovel () {
      this.ligthNovel = false
    },
    avaluateAnswer () {
      this.$refs.el.avaluateAswer(this.answer)
      this.gameFinished = true
    },
    closeGame () {
      this.state.closeGame()
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
  margin: 1px 0px -2px -180px
},
.tiparea {
  margin: -5em -10em 0em 30em
}
</style>
