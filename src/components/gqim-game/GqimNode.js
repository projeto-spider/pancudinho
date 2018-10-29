import Phaser from 'phaser'

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

export default class GqimNode extends withPanel(Phaser.GameObjects.Text) {
  constructor (scene, x, y, text) {
    super(scene, x, y, text, style)
    this.setOrigin()
    scene.add.existing(this).setInteractive()
    scene.physics.add.existing(this)
    scene.input.setDraggable(this)
  }

  setDepth = (value) => {
    this.constructor.prototype.setDepth.call(this, value)
    this.panel.setDepth(value - 1)
  }

  setDraggable (value = true) {
    this.scene.input.setDraggable(this, value)

    if (!value) {
      this.panel.setPanel('grey')
      this.style.setFill(FILL_DARK)
    } else {
      this.panel.setPanel('blue')
      this.style.setFill(FILL_LIGHT)
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
}
