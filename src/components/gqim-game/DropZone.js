import Phaser from 'phaser'

const WAITING = 0
const SUCCESS = 1
const FAIL = 2

const colors = {
  [WAITING]: 0xffeaa7,
  [SUCCESS]: 0x55efc4,
  [FAIL]: 0xd63031
}

export default class DropZone extends Phaser.GameObjects.Zone {
  constructor (scene, x, y) {
    super(scene, x, y, 400, 100)
    this.setDropZone()

    this.status = WAITING
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
    this.graphics.lineStyle(2, colors[this.status])
    this.graphics.strokeRect(this.x + this.input.hitArea.x, this.y + this.input.hitArea.y, this.input.hitArea.width, this.input.hitArea.height)
  }

  setStatus = (status) => {
    this.status = status
    this.updateGraphics()
  }

  isEmpty = () => {
    return !this.getData('dropped')
  }

  onDropIn = (node) => {
    if (this.isEmpty()) {
      node.enterDropZone(this)
      this.setData('dropped', node)

      this.setStatus(
        node.getData('id') === this.getData('id')
          ? SUCCESS
          : FAIL
      )
    }
  }

  onDropOut = () => {
    this.setData('dropped', false)
    this.setStatus(WAITING)
  }
}
