<template>
  <div ref="el" class="Graph"></div>
</template>

<script>
import { DataSet, Network } from 'vis'

let network
const UP_DOWN = 'UD'

export default {
  name: 'Graph',

  data: () => ({
    nodes: false,
    edges: false
  }),

  props: {
    initialNodes: {
      type: Array,
      default: () => []
    },

    initialEdges: {
      type: Array,
      default: () => []
    }
  },

  mounted () {
    this.mountNetwork()
  },

  methods: {
    mountNetwork () {
      if (network) {
        network.destroy()
        network = null
      }

      this.nodes = new DataSet(this.initialNodes.copyWithin())
      this.edges = new DataSet(this.initialEdges.copyWithin())

      const $container = this.$refs.el
      const data = { nodes: this.nodes, edges: this.edges }
      const options = {
        nodes: {
          shape: 'box',
          widthConstraint: {
            maximum: 100
          }
        },

        layout: {
          hierarchical: {
            sortMethod: 'directed',
            direction: UP_DOWN,
            nodeSpacing: 150
          }
        },

        physics: {
          enabled: false
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
