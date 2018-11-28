import Phaser from 'phaser'
import preloadGqimGame from './preload-gqim-game'
import GqimNode from './GqimNode'
import DropZone from './DropZone'

const { Scene } = Phaser

export default class GqimGameScene extends Scene {
  constructor () {
    super({
      key: 'GqimGameScene',
      active: false
    })
  }

  init (data) {
    this.resize = data.resize || (() => {})
    this.tree = data.tree
  }

  preload () {
    preloadGqimGame(this)
  }

  create () {
    this.gameFinished = false

    this.scene.launch('UiScene')

    this.events.on('resize', this.resize, this)

    const camera = this.cameras.main
    camera.setBackgroundColor('#bdbdbd')
    camera.setZoom(0.1)

    const tree = this.tree

    let canDrag = true
    const draggableNodes = []
    const dropZones = []
    this.draggableNodes = draggableNodes
    this.dropZones = dropZones

    const createDraggableNode = element => {
      const node = new GqimNode(this, 0, 0, element.label, {
        hasTimer: true,
        timerCount: element.timerCount
      })
      this.add.existing(node)

      node.setData('id', element.id)
      node.setData('edges', element.edges)

      draggableNodes.push(node)
    }

    const createNode = element => {
      if (element.toDrop) {
        const dropZone = new DropZone(this, 0, 0)
        dropZone.setData('id', element.id)
        dropZone.setData('edges', element.edges)
        dropZones.push(dropZone)

        createDraggableNode(element)

        return dropZone
      } else {
        const node = new GqimNode(this, 0, 0, element.label)
        this.add.existing(node)
        node.setData('id', element.id)
        node.setData('edges', element.edges)
        return node
      }
    }

    const goalData = {
      ...tree.goal,
      toDrop: true // for the demo
    }

    const goalNode = createNode(goalData)
    const questionNodes = tree.questions.map(createNode)
    const indicatorNodes = tree.indicators.map(createNode)
    const metricNodes = tree.metrics.map(createNode)

    const treeNodes = {
      goalNode,
      questionNodes,
      indicatorNodes,
      metricNodes
    }

    const highestDraggableNodeWidth = Math.max(
      ...draggableNodes.map(node => node.width)
    )
    const highestDraggableNodeHeight = Math.max(
      ...draggableNodes.map(node => node.height)
    )

    const dropZonePadding = 5

    for (let dropZone of dropZones) {
      dropZone.setSize(
        highestDraggableNodeWidth + 2 * dropZonePadding,
        highestDraggableNodeHeight + 2 * dropZonePadding
      )
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

    const TIME_TO_FOCUS_GOAL = 1000
    camera.pan(goalNode.x, goalNode.y, TIME_TO_FOCUS_GOAL)
    camera.zoomTo(0.8, TIME_TO_FOCUS_GOAL)

    const goalDraggableNode = draggableNodes[0]
    this.enableDrag(goalDraggableNode)

    this.activateNodesInterval = null
    this.activatedNodes = new Set()

    setTimeout(() => {
      this.events.emit('ui:text', {
        text: 'Puxe nós azuis às lacunas enquanto há tempo',
        time: 5
      })

      this.tweens.add({
        targets: [goalDraggableNode],
        x: goalNode.x,
        y: goalNode.y,
        ease: 'Power1',
        onComplete: () => {
          goalNode.zoneObject.onDropIn(goalDraggableNode)

          setTimeout(() => {
            goalNode.revealStatus()
            goalDraggableNode.stopTimer()
          }, 300)

          draggableNodes.slice(1).forEach((node, i) => {
            const timeToActivate = (node.timeToActivate || 0) * 1000

            setTimeout(() => {
              if (this.gameFinished) {
                return
              }

              this.enableDrag(node)
            }, timeToActivate)
          })
        }
      })
    }, TIME_TO_FOCUS_GOAL + 300)

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

    this.input.on('dragstart', function dragstart (pointer, gameObject) {
      if (canDrag) {
        draggableNodes.forEach(node => {
          node.setDepth(node === gameObject ? 15 : 10)
        })

        paddingDrag.x = pointer.x - gameObject.x
        paddingDrag.y = pointer.y - gameObject.y

        gameObject.leaveDropZone()
      }
    })
    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      if (canDrag && gameObject !== goalDraggableNode) {
        isDraggingSomething = true
        const { x, y } = camera.getWorldPoint(pointer.position.x, pointer.position.y)
        gameObject.setPosition(x, y)
      }
    })

    this.input.on('dragend', function dragend (pointer, gameObject, dropped) {
      isDraggingSomething = false
    })

    let lastPointerPosition = { x: 0, y: 0 }

    this.sys.canvas.onmousewheel = function onmousewheel ({ deltaY }) {
      if ((camera.zoom - (deltaY / 2000)) >= 0) {
        camera.zoomTo(
          camera.zoom - (deltaY / 2000),
          10
        )
      }
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

    this.sys.game.events.addListener('submit', () => {
      canDrag = false
      this.finishGame()
      this.events.emit('revealed')
    }, this)

    const uiScene = this.scene.get('UiScene')

    uiScene.events.on('timeout', this.timeout)
    uiScene.events.on('main:finish', this.handleFinish)
  }

  enableDrag = (node) => {
    this.input.setDraggable(node)
    node.setDraggable(true)
    node.startTimer()
  }

  timeout = () => {
    this.finishGame()
  }

  finishGame = () => {
    this.gameFinished = true
    this.dropZones.forEach(dropZone => dropZone.revealStatus())
    this.draggableNodes.forEach(node => node.stopTimer())
  }

  handleFinish = ({ time }) => {
    const pointsByTime = Math.ceil((time / 120) * 200)

    const nodesCount = this.draggableNodes.length - 1
    const pointsPerNode = Math.trunc(800 / nodesCount)

    const correctNodes = this.draggableNodes
      .slice(1) // ignore goal
      .filter(node => node.isCorrect())

    const pointsByNodes = correctNodes
      .map(node =>
        Math.ceil((node.timerCount / node.totalTime) * pointsPerNode)
      )
      .reduce((a, b) => a + b, 0)

    const points = correctNodes.length === 0
      ? 0
      : pointsByNodes + pointsByTime

    this.events.emit('ui:text', {
      text: `Sua pontuação foi de (${points}/1000)`
    })
  }
}
