<template>
  <div>
    <drop class="droppable" @drop="handleDrop" ref="el">
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

  data: () => ({
    dropData: '',
    dropped: false
  }),

  methods: {
    handleDrop () {
      this.dropData = this.$refs.el.transferData
      this.dropped = true
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
  border-radius: 5px;
}
.dropped {
  background: #bdbdbd;
  margin: -1em !important;
  padding: 0.5em !important;
  border-radius: 5px;
  opacity: 0.5;
  display: block;
  margin: 0;
}
</style>
