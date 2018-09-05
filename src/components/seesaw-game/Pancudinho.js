import Phaser from 'phaser'

export default class Pancudinho extends Phaser.GameObjects.Image {
  constructor (scene, x, y, weight) {
    super(scene, x, y, 'pancudinho')
    this.weight = weight
    this.scene.add.existing(this)
  }
}
