<template>
  <div>
    <drop :class="classes" @drop="handleDrop" ref="el">
      <template slot-scope="props">
        <div v-if="dropped">
            <p class="auxiliartext"> I will... </p>
          <div class="dropped">
            <p class="droppedtext"> {{ option }} </p>
          </div>
        </div>
        <div v-else>
          <p class="tutorialtext"> What will you do? (drop answer here) </p>
        </div>
      </template>
    </drop>
  </div>
</template>

<script type="text/javascript">
import { Drop } from 'vue-drag-drop'

export default {
  name: 'Droppable',

  components: { Drop },

  computed: {
    classes () {
      return {
        droppable: !this.dropped,
        dropcontain: this.dropped,
        correctanswer: this.correct,
        wronganswer: this.wrong
      }
    }
  },

  data: () => ({
    option: null,
    dropped: false,
    wrong: null,
    correct: null
  }),

  methods: {
    handleDrop () {
      this.option = this.$refs.el.transferData
      this.dropped = true
    },

    avaluateAswer (answer) {
      if (this.option === answer) {
        this.correct = true
      } else {
        this.wrong = true
      }
    }
  }
}
</script>

<style type="text/css" scoped>
.droppable {
  background: #fbd9f4;
  border-top: 2px solid #ccc;
  border-left: 2px solid #ddd;
  padding: 30px 30px;
  border-radius: 50%;
  width: 18em;
  height: 18em;
}
.dropcontain {
  background-color: #fbd9f4;
  border-top: 2px solid #ccc;
  border-left: 2px solid #ddd;
  padding: 10px 10px;
  border-radius: 50%;
  width: 18em;
  height: 18em;
}
.dropped {
  background: plum;
  padding: 1em !important;
  opacity: 0.5;
  display: block;
  margin: 2em 1em 1em 3em;
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.dropcontain.wronganswer {
  background: #ea391c;
}
.dropcontain.correctanswer {
  background: #65ef5c;
}
.droppedtext {
  text-align: center;
  margin: 2em 1em 1em 1em;
}
.auxiliartext {
  font: 400 18px/1.3 'Arizonia', Helvetica, sans-serif;
  text-align: center;
  margin: 2em 1em 1em 1em;
}
.tutorialtext {
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
  margin: 2em 0.2em 1em 0.6em;
}
</style>
