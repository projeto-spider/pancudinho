import Phaser from 'phaser'

const style = {
  fontSize: 16,
  fill: '#000',
  align: 'center',
  backgroundColor: '#74b9ff',
  wordWrap: {
    width: 300
  }
}

export default class GqimNode extends Phaser.GameObjects.Text {
  constructor (scene, x, y, text) {
    super(scene, x, y, text, style)
    this.setOrigin()
    scene.add.existing(this).setInteractive()
    scene.physics.add.existing(this)
    scene.input.setDraggable(this)
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
