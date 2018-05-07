<template>
  <Graph
    :initial-nodes="initialNodes"
    :initial-edges="initialEdges"
    :handle-edge-added="edgeAdded"
    ref="graph"
  ></Graph>
</template>

<script>
import Graph from './Graph'

export default {
  name: 'GqimGame',

  components: { Graph },

  data: () => ({
    initialNodes: [
      { id: 'goal-1', label: 'Melhorar o desempenho do aluno' },
      { id: 'question-1', label: 'Qual a média dos alunos?' },
      { id: 'question-2', label: 'Quais notas obtidas em cada módulo da disciplina?' },
      { id: 'question-3', label: 'Qual é a frequência do aluno?' }
    ],

    nextNodes: [
      { id: 'indicator-ma', label: 'MA – Média dos alunos' },
      { id: 'indicator-naocmd', label: 'NAOCMD – Nota do aluno obtida em cada módulo da disciplina' },
      { id: 'indicator-fa', label: 'FA – Frequência do aluno' },
      { id: 'metric-1', label: 'Nota' },
      { id: 'metric-2', label: 'Frequência' }
    ],

    initialEdges: [
      { from: 'goal-1', to: 'question-1', arrows: 'to' },
      { from: 'goal-1', to: 'question-2', arrows: 'to' },
      { from: 'goal-1', to: 'question-3', arrows: 'to' }
    ],

    solutions: [
      { from: 'question-1', to: 'indicator-ma', arrows: 'to' },
      { from: 'question-2', to: 'indicator-naocmd', arrows: 'to' },
      { from: 'question-3', to: 'indicator-fa', arrows: 'to' },
      { from: 'indicator-ma', to: 'metric-1', arrows: 'to' },
      { from: 'indicator-naocmd', to: 'metric-1', arrows: 'to' },
      { from: 'indicator-fa', to: 'metric-2', arrows: 'to' }
    ]
  }),

  mounted () {
    this.nextNode()
  },

  methods: {
    nextNode () {
      const { graph } = this.$refs

      if (this.solutions.length) {
        // QUICKFIX: won't work from the second time
        // without a timeout
        setTimeout(graph.addEdgeMode, 1)
      }

      if (!this.nextNodes.length) {
        return
      }

      graph.addNode(this.nextNodes.shift())
    },

    edgeAdded (edge) {
      const nextSolution = this.solutions[0]

      if (
        edge.from === nextSolution.from &&
        edge.to === nextSolution.to
      ) {
        this.solutions.shift()
        this.nextNode()
      } else {
        // todo: Wrong
      }
    }
  }
}
</script>
