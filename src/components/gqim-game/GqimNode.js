import Phaser from 'phaser'

import Panel from '../ui/game-objects/Panel'

const style = {
  fontSize: 18,
  fill: '#000',
  align: 'center',
  wordWrap: {
    width: 300
  },
  // TODO: don't hardcode here and in Panel
  padding: {
    left: 27,
    right: 27,
    top: 27,
    bottom: 27
  },
  fontFamily: 'kenvector_future'
}

export default class GqimNode extends Phaser.GameObjects.Text {
  constructor (scene, x, y, text) {
    super(scene, x, y, text, style)
    this.setOrigin()
    scene.add.existing(this).setInteractive()
    scene.physics.add.existing(this)
    scene.input.setDraggable(this)

    this.panel = new Panel(scene, this, 'greyPanel')
  }

  setPosition = (x, y) => {
    this.constructor.prototype.setPosition.call(this, x, y)
    this.panel.setPosition(x, y)
  }

  setDraggable (value = true) {
    this.scene.input.setDraggable(this, value)
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
