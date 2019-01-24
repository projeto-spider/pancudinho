import Phaser from 'phaser'
import NodeTimer from './NodeTimer'

const { Text } = Phaser.GameObjects

const FILL_DARK = '#4D210F'
const FILL_LIGHT = '#243310'
const STATIC_PANEL = 'greyPanel'
const DRAGGABLE_PANEL = 'bluePanel'
// const PANEL_OFFSET = 10
const PANEL_PADDING = 25
const COLOR_ALIVE = '#C9F4C1'
const COLOR_DEAD = '#f28f65'

const style = {
  padding: PANEL_PADDING,
  fontSize: 18,
  align: 'center',
  wordWrap: {
    width: 300
  }
}

export default class Node extends Phaser.GameObjects.Container {
  constructor (scene, x, y, text, config = {}) {
    super(scene, x, y, [])

    const {
      isDraggable = false,
      hasTimer = false,
      timerCount = 60,
      timeToActivate = false
    } = config

    // Creates text
    this.textObject = new Text(scene, 0, 0, text, style)

    // Put origin at center
    this.textObject.setOrigin()

    // Add to container
    this.add(this.textObject)

    // Get the container size
    const textBounds = this.textObject.getBounds()
    const realWidth = textBounds.width + 2 //* PANEL_PADDING
    const realHeight = textBounds.height + 2 //* PANEL_PADDING

    this.leaves = []
    this.renderLeaves('dead')

    // Set the container size so we can make it draggable
    this.setSize(realWidth, realHeight)

    // Create timer
    this.interval = false
    this.totalTime = timerCount
    this.timerCount = timerCount
    this.timeToActivate = timeToActivate

    if (hasTimer) {
      const timerX = textBounds.x + (realWidth / 2)
      const timerY = textBounds.y + realHeight
      this.timerObject = new NodeTimer(this.scene, timerX, timerY, 10)
    } else {
      this.timerObject = null
    }

    // Sets the textObject fill and generates panelObject
    this.setDraggable(isDraggable)

    // Prepare for possible drag
    this.setInteractive()
    scene.physics.add.existing(this)
  }

  setDraggable = (isDraggable) => {
    if (isDraggable === this.isDraggable) {
      return
    }

    this.isDraggable = isDraggable

    const [
      panelTexture,
      fill
    ] = isDraggable
      ? [DRAGGABLE_PANEL, FILL_LIGHT]
      : [STATIC_PANEL, FILL_DARK]

    this.rerenderPanelObject(panelTexture)
    this.textObject.setFill(fill)
    this.renderLeaves(isDraggable ? false : 'alive')
  }

  rerenderPanelObject = (texture) => {
    // if (this.panelObject) {
    //   this.remove(this.panelObject)
    //   this.panelObject.destroy()
    // }

    // this.panelObject = this.scene.make.nineslice(
    //   0,
    //   0,
    //   this.width,
    //   this.height,
    //   texture,
    //   PANEL_OFFSET
    // )

    // this.panelObject.setOrigin()

    // this.addAt(this.panelObject, 0)
  }

  renderLeaves = (type = 'dead') => {
    const textBounds = this.textObject.getBounds()
    const realWidth = textBounds.width + 2
    const realHeight = textBounds.height + 2

    this.textObject.setBackgroundColor(
      type === 'alive' || !type
        ? COLOR_ALIVE
        : COLOR_DEAD
    )

    for (let leaf of this.leaves) {
      this.remove(leaf)
      leaf.destroy()
    }

    if (!type) {
      return
    }

    const leaves =
      type && type === 'dead'
        ? [
          this.scene.add.image(
            -(realWidth / 2),
            (realHeight / 2),
            `${type}/down-left`
          ),
          this.scene.add.image(
            -(realWidth / 2) + 30,
            -(realHeight / 2) + 30,
            `${type}/up-left`
          ),
          this.scene.add.image(
            (realWidth / 2),
            (realHeight / 2),
            `${type}/down-right`
          ),
          this.scene.add.image(
            (realWidth / 2) - 35,
            -(realHeight / 2) + 30,
            `${type}/up-right`
          )
        ]
        : [
          this.scene.add.image(
            -(realWidth / 2),
            (realHeight / 2),
            `${type}/down-left`
          ),
          this.scene.add.image(
            -(realWidth / 2) + 20,
            -(realHeight / 2) + 20,
            `${type}/up-left`
          ),
          this.scene.add.image(
            (realWidth / 2),
            (realHeight / 2),
            `${type}/down-right`
          ),
          this.scene.add.image(
            (realWidth / 2) - 30,
            -(realHeight / 2) + 20,
            `${type}/up-right`
          )
        ]

    for (let leaf of leaves) {
      this.add(leaf)
    }

    this.leaves = leaves
  }

  startTimer = () => {
    this.add(this.timerObject)

    this.interval = setInterval(() => {
      if (this.timerCount > 0) {
        return this.timerObject.setCount(this.timerCount--)
      }

      this.stopTimer()
    }, 1000)
  }

  stopTimer = () => {
    if (this.interval) {
      clearInterval(this.interval)
    }

    this.setDraggable(false)
    try {
      this.scene.input.setDraggable(this, false)
    } catch (_) {}
    this.remove(this.timerObject)
  }

  enterDropZone (dropZone) {
    this.setData('droppedIn', dropZone)
  }

  leaveDropZone () {
    const currentDropZone = this.getData('droppedIn')

    if (currentDropZone) {
      currentDropZone.onDropOut(this)
      this.setData('droppedIn', false)
    }
  }

  isCorrect = () => {
    const currentDropZone = this.getData('droppedIn')

    if (!currentDropZone) {
      return false
    }

    return this.getData('id') === currentDropZone.parent.getData('id')
  }
}
