import Vue from 'vue' // eslint-disable-line

import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs/vue'
import Centered from '@storybook/addon-centered'
import PhaserEngine from 'phaser'

import Phaser from '../components/gqim-game-phaser/Phaser.vue'
import GqimNode from '../components/gqim-game-phaser/GqimNode'
import DropZone from '../components/gqim-game-phaser/DropZone'

const stories = storiesOf('GQIM Game Phaser', module)

stories
  .addDecorator(withKnobs)
  .addDecorator(Centered)

stories
  .add('GqimNode', (h) => ({
    render: h => h(Phaser, { props: {
      config: {
        physics: {
          default: 'arcade'
        },
        scene: {
          preload () {},
          create () {
            new GqimNode(this, this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'lalala') // eslint-disable-line
          },
          update () {}
        }
      }
    } })
  }))
  .add('DropZone', (h) => ({
    render: h => h(Phaser, { props: {
      config: {
        physics: {
          default: 'arcade'
        },
        scene: {
          preload () {},
          create () {
            new DropZone(this, this.sys.canvas.width / 2, this.sys.canvas.height / 2) // eslint-disable-line
          },
          update () {}
        }
      }
    } })
  }))
  .add('Zoom and Drag-n-Drop Systems', (h) => ({
    render: h => h(Phaser, { props: {
      config: {
        physics: {
          default: 'arcade'
        },
        scene: {
          preload () {},
          create () {
            const camera = this.cameras.main
            camera.setBackgroundColor('#bdbdbd')
            const lorem = 'NAOCMD – Nota do aluno obtida em cada módulo da disciplina'
            new GqimNode(this, 50, 400, lorem) // eslint-disable-line
            new GqimNode(this, 50, 100, '2' + lorem) // eslint-disable-line
            let isDraggingSomething = false
            let paddingDrag = { x: 0, y: 0 }

            this.input.on('dragstart', function dragstart (pointer, gameObject) {
              paddingDrag.x = pointer.x - gameObject.x
              paddingDrag.y = pointer.y - gameObject.y
            })
            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
              isDraggingSomething = true
              if (camera.zoom < 0.7) {
                const { x, y } = camera.getWorldPoint(pointer.position.x, pointer.position.y)
                gameObject.x = x - (paddingDrag.x * Math.min(camera.zoom, 1))
                gameObject.y = y - (paddingDrag.y * Math.min(camera.zoom, 1))
              } else {
                gameObject.x = dragX
                gameObject.y = dragY
              }
            })

            this.input.on('dragend', function dragend (pointer, gameObject) {
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
          },
          update () {}
        }
      }
    } })
  }))
  .add('Can Drop GqimNode in DropZone', (h) => ({
    render: h => h(Phaser, { props: {
      config: {
        physics: {
          default: 'arcade'
        },
        scene: {
          preload () {},
          create () {
            const camera = this.cameras.main
            camera.setBackgroundColor('#bdbdbd')
            const lorem = 'NAOCMD – Nota do aluno obtida em cada módulo da disciplina'
            new DropZone(this, 200, 100) // eslint-disable-line
            new DropZone(this, -70, -100) // eslint-disable-line
            new DropZone(this, -300, 100) // eslint-disable-line
            new DropZone(this, 500, 300) // eslint-disable-line
            new DropZone(this, 0, 300) // eslint-disable-line
            new DropZone(this, -500, 300) // eslint-disable-line
            new DropZone(this, -700, 500) // eslint-disable-line
            new DropZone(this, 250, 500) // eslint-disable-line
            new DropZone(this, -250, 500) // eslint-disable-line
            new DropZone(this, 700, 500) // eslint-disable-line
            new GqimNode(this, 600, -10, lorem) // eslint-disable-line
            new GqimNode(this, 600, -60, '2' + lorem) // eslint-disable-line
            new GqimNode(this, 600, -110, '3' + lorem) // eslint-disable-line
            new GqimNode(this, 600, -160, '4' + lorem) // eslint-disable-line
            new GqimNode(this, 600, -210, '5' + lorem) // eslint-disable-line
            new GqimNode(this, 600, -260, '6' + lorem) // eslint-disable-line
            new GqimNode(this, 600, -310, '7' + lorem) // eslint-disable-line
            new GqimNode(this, 600, -360, '8' + lorem) // eslint-disable-line
            new GqimNode(this, 600, -410, '9' + lorem) // eslint-disable-line
            new GqimNode(this, 600, -460, '10' + lorem) // eslint-disable-line
            let isDraggingSomething = false
            let paddingDrag = { x: 0, y: 0 }

            this.input.on('dragstart', function dragstart (pointer, gameObject) {
              paddingDrag.x = pointer.x - gameObject.x
              paddingDrag.y = pointer.y - gameObject.y

              const currentDropZone = gameObject.getData('droppedIn')
              if (currentDropZone) {
                currentDropZone.setData('dropped', false)
                gameObject.setData('droppedIn', false)
              }
            })
            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
              isDraggingSomething = true
              const { x, y } = camera.getWorldPoint(pointer.position.x, pointer.position.y)
              gameObject.x = x
              gameObject.y = y
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
              const droppedThere = dropZone.getData('dropped')
              if (!droppedThere) {
                gameObject.x = dropZone.x
                gameObject.y = dropZone.y
                dropZone.setData('dropped', gameObject)
                gameObject.setData('droppedIn', dropZone)
              }
            })
          },
          update () {}
        }
      }
    } })
  }))
  .add('Game', (h) => ({
    render: h => h(Phaser, { props: {
      config: {
        physics: {
          default: 'arcade'
        },
        scene: {
          preload () {},
          create () {
            const camera = this.cameras.main
            camera.setBackgroundColor('#bdbdbd')

            const tree = {
              goal: {
                id: 'goal-1',
                label: 'Melhorar o desempenho do aluno',
                edges: [
                  'question-1',
                  'question-2',
                  'question-3'
                ]
              },

              questions: [
                {
                  toDrop: true,
                  id: 'question-1',
                  label: 'Qual a média dos alunos?',
                  edges: [
                    'indicator-ma'
                  ]
                },
                {
                  id: 'question-2',
                  label: 'Quais notas obtidas em cada módulo da disciplina?',
                  edges: [
                    'indicator-naocmd'
                  ]
                },
                {
                  id: 'question-3',
                  label: 'Qual é a frequência do aluno?',
                  edges: [
                    'indicator-fa'
                  ]
                }
              ],

              indicators: [
                {
                  id: 'indicator-ma',
                  label: 'MA – Média dos alunos',
                  edges: [
                    'metric-1'
                  ]
                },
                {
                  toDrop: true,
                  id: 'indicator-naocmd',
                  label: 'NAOCMD – Nota do aluno obtida em cada módulo da disciplina',
                  edges: [
                    'metric-1'
                  ]
                },
                {
                  id: 'indicator-fa',
                  label: 'FA – Frequência do aluno',
                  edges: [
                    'metric-2'
                  ]
                }
              ],

              metrics: [
                {
                  id: 'metric-1',
                  label: 'Nota'
                },
                {
                  toDrop: true,
                  id: 'metric-2',
                  label: 'Frequência'
                }
              ]
            }

            const createNode = element => {
              if (element.toDrop) {
                const node = new DropZone(this, 0, 0) // eslint-disable-line
                node.setData('id', element.id)
                node.setData('edges', element.edges)
                return node
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

                    const line = new PhaserEngine.Geom.Line(
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

            let isDraggingSomething = false
            let paddingDrag = { x: 0, y: 0 }

            this.input.on('dragstart', function dragstart (pointer, gameObject) {
              paddingDrag.x = pointer.x - gameObject.x
              paddingDrag.y = pointer.y - gameObject.y

              const currentDropZone = gameObject.getData('droppedIn')
              if (currentDropZone) {
                currentDropZone.setData('dropped', false)
                gameObject.setData('droppedIn', false)
              }
            })
            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
              isDraggingSomething = true
              const { x, y } = camera.getWorldPoint(pointer.position.x, pointer.position.y)
              gameObject.x = x
              gameObject.y = y
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
              const droppedThere = dropZone.getData('dropped')
              if (!droppedThere) {
                gameObject.x = dropZone.x
                gameObject.y = dropZone.y
                dropZone.setData('dropped', gameObject)
                gameObject.setData('droppedIn', dropZone)
              }
            })
          },
          update () {}
        }
      }
    } })
  }))
