import Phaser from 'phaser'

import NodeTimer from './NodeTimer'
import withPanel from '../ui/mixins/with-panel'

const FILL_DARK = '#b2b2b2'
const FILL_LIGHT = '#fff'

const style = {
  fontSize: 18,
  fill: FILL_LIGHT,
  align: 'center',
  wordWrap: {
    width: 300
  },
  fontFamily: 'kenvector_future'
}

export default class GqimNode extends withPanel(Phaser.GameObjects.Text, 'grey') {
  constructor (scene, x, y, text, timer = 60){
    super(scene, x, y, text, style)
    this.setOrigin()
    scene.add.existing(this).setInteractive()
    scene.physics.add.existing(this)
    scene.input.setDraggable(this, false)
    this.style.setFill(FILL_DARK)
    this.isDraggable = false
    this.timer = timer
    this.interval = false
    this.nodeTimer = false
  }

  setPosition = (x, y) => {
    this.constructor.prototype.setPosition.call(this, x, y)
    this.panel.setPosition(x, y)
    this.repositionTimer()
  }

  setDepth = (value) => {
    this.constructor.prototype.setDepth.call(this, value)
    this.panel.setDepth(value - 1)

    // Calling with the same depth BUT after the node depth
    // is set will make it be on the front.
    if (this.nodeTimer) {
      this.nodeTimer.setDepth(value)
    }
  }

  setDraggable (value = true) {
    this.scene.input.setDraggable(this, value)
    this.isDraggable = value

    if (!value) {
      this.panel.setPanel('grey')
      this.style.setFill(FILL_DARK)
    } else {
      this.panel.setPanel('blue')
      this.style.setFill(FILL_LIGHT)
      this.startTimer()
    }
  }

  enterDropZone = (dropZone) => {
    this.setData('droppedIn', dropZone)
    this.setPosition(dropZone.x, dropZone.y)
  }

  leaveDropZone = () => {
    const currentDropZone = this.getData('droppedIn')

    if (currentDropZone) {
      currentDropZone.onDropOut(this)
      this.setData('droppedIn', false)
    }
  }

  startTimer = () => {
    const { x, y, width, height } = this.getBounds()
    this.nodeTimer = new NodeTimer(this.scene, x + width, y + height, this.timer)
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.nodeTimer.setCount(this.timer--)
      } else {
        clearInterval(this.interval)
        this.stopTimer()
      }
    }, 1000)
  }

  stopTimer = () => {
    this.nodeTimer.destroy()
    this.nodeTimer = false
    this.setDraggable(false)
  }

  repositionTimer = () => {
    if (!this.nodeTimer) {
      return
    }

    const { x, y, width, height } = this.getBounds()
    this.nodeTimer.setPosition(x + width, y + height)
  }
}
