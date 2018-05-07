import Phaser from 'phaser'

const style = {
  fontSize: 16,
  fill: '#000',
  align: 'center',
  backgroundColor: '#dedede',
  wordWrap: {
    width: 300
  }
}

export default class GqimNode extends Phaser.GameObjects.Text {
  constructor (scene, x, y, text) {
    super(scene, x, y, text, style)
    scene.add.existing(this).setInteractive()
    scene.physics.add.existing(this)
    scene.input.setDraggable(this)
  }
}
