<template>
  <div ref="el" class="Graph"></div>
</template>

<script>
import vis, { DataSet, Network } from 'vis'

let network
const UP_DOWN = 'UD'

export default {
  name: 'Graph',

  data: () => ({

  }),

  mounted () {
    this.mountNetwork()
  },

  methods: {
    mountNetwork () {
      if (network) {
        network.destroy()
        network = null
      }

      const nodes = new DataSet([
        {id: 1, label: 'Node 1'},
        {id: 2, label: 'Node 2'},
        {id: 3, label: 'Node 3'},
        {id: 4, label: 'Node 4'},
        {id: 5, label: 'Node 5'}
      ])

      const edges = new DataSet([
        {from: 1, to: 3},
        {from: 1, to: 2},
        {from: 2, to: 4},
        {from: 2, to: 5},
        {from: 3, to: 3}
      ])

      const $container = this.$refs.el
      const data = { nodes, edges }
      const options = {
        layout: {
          hierarchical: {
            direction: UP_DOWN
          }
        }
      }

      network = new Network($container, data, options)
    }
  }
}
</script>

<style>
.Graph {
  width: 100%;
  height: 100%;
}

/* To make storybook show 100% */
#root > div > div {
  width: 100%;
  height: 100%;
}
</style>
