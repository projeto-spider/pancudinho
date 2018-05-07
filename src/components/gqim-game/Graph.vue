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
    },

    handleEdgeAdded: {
      type: Function,
      default: () => {}
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

      this.edges.on('add', (_event, props) => this.handleEdgeAdded(this.edges.get(props.items[0])))

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
      window.network = network
    },

    addNode (node) {
      this.nodes.add(node)
    },

    addEdgeMode () {
      network.addEdgeMode()
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
