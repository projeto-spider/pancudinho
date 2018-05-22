<template>
  <div>
    <drop :class="computedClasses" @drop="drop" ref="el">
      <template v-if="dropped" slot-scope="props">
        <drag @dragstart="cleanDropArea" :draggable="!revealAnswers">
          <draggable
            class="dropped"
            :option="option"
            :drag="!revealAnswers"
          >
            {{option.text}}
          </draggable>
        </drag>
      </template>
    </drop>
  </div>
</template>

<script type="text/javascript">
import { Drop, Drag } from 'vue-drag-drop'
import Draggable from './Draggable.vue'

export default {
  name: 'Droppable',

  components: { Drop, Drag, Draggable },

  props: {
    handleDropped: {
      type: Function,
      default: () => {}
    },

    revealAnswers: {
      type: Boolean,
      required: true
    },

    correctAnswers: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    computedClasses () {
      const valid = this.option && this.correctAnswers.includes(this.option.id)
      return {
        droppable: !this.dropped,
        dropcontain: this.dropped,
        valid: this.revealAnswers && valid,
        invalid: this.revealAnswers && !valid
      }
    }
  },

  data: () => ({
    dropData: '',
    dropped: false,
    option: null
  }),

  methods: {
    drop () {
      this.option = this.$refs.el.transferData
      this.dropData = this.option.text
      this.dropped = true
      this.handleDropped(this.option)
    },

    cleanDropArea () {
      this.option = null
      this.dropped = false
    }
  }
}
</script>

<style type="text/css">
.droppable {
  background: #eee;
  border-top: 2px solid #ccc;
  border-left: 2px solid #ddd;
  padding: 25px 90px;
  border-radius: 5px
}
.dropcontain {
  background-color: #eee;
  border-top: 2px solid #ccc;
  border-left: 2px solid #ddd;
  padding: 10px 10px;
  border-radius: 5px
}
.dropped {
  background: #bdbdbd;
  padding: 1em !important;
  border-radius: 5px;
  opacity: 0.5;
  display: block;
  margin: 0
}
.dropcontain.valid {
  background-color: #12f51963
}
.dropcontain.invalid {
  background-color: #f5121263
}
</style>
