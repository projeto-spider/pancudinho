<template>
  <div>
    <drop :class="{'droppable': !dropped, 'dropcontain': dropped}" @drop="drop" ref="el">
      <template v-if="dropped" slot-scope="props">
        <div class="dropped">
          {{ dropData }}
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

  data: () => ({
    dropData: '',
    dropped: false
  }),

  methods: {
    drop () {
      const option = this.$refs.el.transferData
      this.dropData = option.text
      this.dropped = true
      this.handleDropped(option)
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
  background: #eee;
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
</style>
