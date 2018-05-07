import Phaser from 'phaser'

export default class DropZone extends Phaser.GameObjects.Zone {
  constructor (scene, x, y) {
    super(scene, x, y, 400, 250)
    this.setDropZone()
    scene.add.existing(this)

    const graphics = scene.add.graphics()
    graphics.lineStyle(2, 0xffff00)
    graphics.strokeRect(this.x + this.input.hitArea.x, this.y + this.input.hitArea.y, this.input.hitArea.width, this.input.hitArea.height)
  }
}
