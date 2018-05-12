import Phaser from 'phaser'

export default class DropZone extends Phaser.GameObjects.Zone {
  constructor (scene, x, y) {
    super(scene, x, y, 400, 100)
    this.setDropZone()

    this.graphics = new Phaser.GameObjects.Graphics(scene)

    scene.add.existing(this)
    scene.add.existing(this.graphics)

    this.updateGraphics()
  }

  // `this` sucks
  setPosition = (x, y) => {
    this.constructor.prototype.setPosition.call(this, x, y)
    this.updateGraphics()
  }

  updateGraphics () {
    this.graphics.clear()
    this.graphics.lineStyle(2, 0xffff00)
    this.graphics.strokeRect(this.x + this.input.hitArea.x, this.y + this.input.hitArea.y, this.input.hitArea.width, this.input.hitArea.height)
  }
}
