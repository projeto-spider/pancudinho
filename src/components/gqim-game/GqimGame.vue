<template>
  <Background>
    <Panel class="ScenePanel">
      <Scene v-if="config" :config="config"></Scene>
    </Panel>
  </Background>
</template>

<script>
import Phaser from 'phaser'
import Background from '../ui/Background.vue'
import Panel from '../ui/Panel.vue'
import Scene from '../phaser/Scene.vue'

import GqimNode from './GqimNode'
import DropZone from './DropZone'
import preloadGqimGame from './preload-gqim-game'

export default {
  name: 'GqimGame',

  components: {
    Background,
    Panel,
    Scene
  },

  props: {
    tree: {
      type: Object,
      required: true
    }
  },

  data () {
    const $vm = this

    function resize (width, height) {
      if (width === undefined) { width = this.sys.game.config.width }
      if (height === undefined) { height = this.sys.game.config.height }

      if (this.cameras) {
        this.cameras.resize(width, height)
      }
    }

    return {
      config: {
        physics: {
          default: 'arcade'
        },
        scene: {
          preload () {
            preloadGqimGame(this)
          },

          create () {
            this.events.on('resize', resize, this)

            const camera = this.cameras.main
            camera.setBackgroundColor('#bdbdbd')

            const tree = $vm.tree

            const draggableNodes = []

            const createDraggableNode = element => {
              const node = new GqimNode(this, 0, 0, element.label) // eslint-disable-line
              node.setData('id', element.id)
              node.setData('edges', element.edges)

              draggableNodes.push(node)
            }

            const createNode = element => {
              if (element.toDrop) {
                const dropZone = new DropZone(this, 0, 0) // eslint-disable-line
                dropZone.setData('id', element.id)
                dropZone.setData('edges', element.edges)

                createDraggableNode(element)

                return dropZone
              } else {
                const node = new GqimNode(this, 0, 0, element.label) // eslint-disable-line
                node.setDraggable(false)
                node.setData('id', element.id)
                node.setData('edges', element.edges)
                return node
              }
            }

            const goalNode = createNode(tree.goal)
            const questionNodes = tree.questions.map(createNode)
            const indicatorNodes = tree.indicators.map(createNode)
            const metricNodes = tree.metrics.map(createNode)

            const treeNodes = {
              goalNode,
              questionNodes,
              indicatorNodes,
              metricNodes
            }

            const NODE_HORIZONTAL_MARGIN = 100
            const NODE_VERTICAL_MARGIN = 100

            centralizeVerticallyGroups([goalNode], questionNodes, indicatorNodes, metricNodes)
            centralizeHorizontalyNodes(questionNodes)
            centralizeHorizontalyNodes(indicatorNodes)
            centralizeHorizontalyNodes(metricNodes)
            positionDraggableNodesBesidesTree(treeNodes, draggableNodes)

            camera.setScroll(goalNode.x - this.sys.game.canvas.width / 2, goalNode.y - 100)

            connectBetweenTreeLevels(this, [goalNode], questionNodes)
            connectBetweenTreeLevels(this, questionNodes, indicatorNodes)
            connectBetweenTreeLevels(this, indicatorNodes, metricNodes)

            function connectBetweenTreeLevels (scene, topNodes, bottomNodes) {
              topNodes.forEach(topNode => {
                if (!topNode) return
                const edges = topNode.getData('edges')

                bottomNodes.forEach(bottomNode => {
                  const id = bottomNode.getData('id')

                  if (edges.includes(id)) {
                    const graphics = scene.add.graphics({ lineStyle: { width: 3, color: 0xaa00aa } })

                    const line = new Phaser.Geom.Line(
                      topNode.x,
                      topNode.y + topNode.height / 2,
                      bottomNode.x,
                      bottomNode.y - bottomNode.height / 2
                    )

                    graphics.strokeLineShape(line)
                  }
                })
              })
            }

            function centralizeHorizontalyNodes (nodes) {
              const middleIndex = Math.ceil(nodes.length / 2)

              let lefts = nodes.slice(0, middleIndex)
              let rights = []

              if (nodes.length % 2 === 0) {
                const leftMiddleNode = nodes[middleIndex - 1]
                const rightMiddleNode = nodes[middleIndex]

                const leftMiddleNodeX =
                  -(NODE_HORIZONTAL_MARGIN / 2) - (leftMiddleNode.width / 2)
                const rightMiddleNodeX =
                  (NODE_HORIZONTAL_MARGIN / 2) + (rightMiddleNode.width / 2)
                leftMiddleNode.setPosition(leftMiddleNodeX, leftMiddleNode.y)
                rightMiddleNode.setPosition(rightMiddleNodeX, rightMiddleNode.y)

                // Includes the right middle node
                rights = nodes.slice(middleIndex)
              } else {
                const middleNode = nodes[middleIndex]
                middleNode.setPosition(0, middleNode.y)

                // Include middle node
                rights = nodes.slice(middleIndex - 1)
              }

              lefts.reverse().forEach((node, i, nodes) => {
                if (!nodes[i - 1]) return

                const neighborBounds = nodes[i - 1].getBounds()
                const x = neighborBounds.x - NODE_HORIZONTAL_MARGIN - node.width / 2
                node.setPosition(x, node.y)
              })

              rights.forEach((node, i, nodes) => {
                if (!nodes[i - 1]) return

                const neighborBounds = nodes[i - 1].getBounds()
                const x = neighborBounds.x + neighborBounds.width + NODE_HORIZONTAL_MARGIN + node.width / 2
                node.setPosition(x, node.y)
              })
            }

            function centralizeVerticallyGroups (...groups) {
              groups.forEach((group, i) => {
                if (!groups[i - 1]) return

                const prev = groups[i - 1]
                const prevHighestYBound = Math.max(
                  ...prev.map(node => {
                    const { y, height } = node.getBounds()
                    return y + height
                  })
                )
                const baseY = prevHighestYBound + NODE_VERTICAL_MARGIN

                group.forEach(node =>
                  node.setPosition(node.x, baseY + node.getBounds().height / 2)
                )
              })
            }

            function positionDraggableNodesBesidesTree (treeNodes, nodes) {
              const rightmostTreePosition =
                Math.max(...Object.values(treeNodes)
                  // Force be array for goalNode
                  .map(x => Array.isArray(x) ? x : [x])
                  .map(nodes =>
                    Math.max(...nodes.map(node => {
                      const { x, width } = node.getBounds()
                      return x + width
                    }))
                  )
                )

              const baseX = rightmostTreePosition + NODE_HORIZONTAL_MARGIN

              const largestNodeWidth = Math.max(...draggableNodes.map(node => node.width))

              nodes.forEach((node, i) => {
                const prev = nodes[i - 1]

                const x = baseX + largestNodeWidth / 2

                if (!prev) {
                  return node.setPosition(x, goalNode.getBounds().y)
                }

                const prevBounds = prev.getBounds()
                const y = prevBounds.y + prevBounds.height + NODE_VERTICAL_MARGIN
                return node.setPosition(x, y)
              })
            }

            let isDraggingSomething = false
            let paddingDrag = { x: 0, y: 0 }
            const scene = this
            this.input.on('dragstart', function dragstart (pointer, gameObject) {
              draggableNodes.forEach(node => {
                node.setDepth(node === gameObject ? 15 : 10)
              })

              paddingDrag.x = pointer.x - gameObject.x
              paddingDrag.y = pointer.y - gameObject.y

              gameObject.leaveDropZone()
            })
            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
              isDraggingSomething = true
              const { x, y } = camera.getWorldPoint(pointer.position.x, pointer.position.y)
              gameObject.setPosition(x, y)
            })

            this.input.on('dragend', function dragend (pointer, gameObject, dropped) {
              isDraggingSomething = false
            })

            let lastPointerPosition = { x: 0, y: 0 }

            this.sys.canvas.onmousewheel = function onmousewheel ({ deltaY }) {
              camera.setZoom(
                camera.zoom - (deltaY / 2000)
              )
            }

            let originDragPoint = null

            this.input.on('pointermove', function pointermove (pointer, objects) {
              if (isDraggingSomething) return
              lastPointerPosition.x = pointer.x
              lastPointerPosition.y = pointer.y

              if (pointer.isDown) {
                if (originDragPoint) {
                  camera.setScroll(
                    camera.scrollX + (originDragPoint.x - pointer.x),
                    camera.scrollY + (originDragPoint.y - pointer.y)
                  )
                }

                originDragPoint = Object.assign({}, lastPointerPosition)
              } else {
                originDragPoint = null
              }
            })

            this.input.on('drop', function drop (pointer, gameObject, dropZone) {
              dropZone.onDropIn(gameObject)
            })
          },
          update () {},
          resize,
        }
      }
    }
  }
}
</script>

<style scoped>
.ScenePanel {
  width: 90%;
  height: 90%;
}
</style>
