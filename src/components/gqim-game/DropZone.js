import Phaser from 'phaser'
const { Container, Graphics, Zone } = Phaser.GameObjects

const DEFAULT_SIDE_SIZE = 100

const WAITING = 0
const SUCCESS = 1
const FAIL = 2

const colors = {
  [WAITING]: 0xffeaa7,
  [SUCCESS]: 0x55efc4,
  [FAIL]: 0xd63031
}

export default class DropZone extends Container {
  constructor (scene, x, y) {
    super(scene, x, y, [])

    this.status = WAITING

    this.zoneObject = new GqimZone(scene, this)

    this.graphicsObject = new Graphics(scene)

    // Make the container size
    this.setSize(DEFAULT_SIDE_SIZE, DEFAULT_SIDE_SIZE)

    // Add to container
    this.add(this.zoneObject)
    this.add(this.graphicsObject)

    this.scene.add.existing(this)
    this.setInteractive()
  }

  setSize = (width, height) => {
    this.constructor.prototype.setSize.call(this, width, height)
    this.zoneObject.setSize(width, height)
    this.updateGraphics()
  }

  updateGraphics = () => {
    this.zoneObject.setPosition(0, 0)
    const bounds = this.getBounds()

    this.graphicsObject.clear()
    this.graphicsObject.lineStyle(2, colors[this.status])
    this.graphicsObject.strokeRect(
      -(bounds.width / 2),
      -(bounds.height / 2),
      bounds.width,
      bounds.height
    )
  }

  revealStatus = () => {
    const dropped = this.zoneObject.getData('dropped')

    this.status =
      dropped && dropped.getData('id') === this.getData('id')
        ? SUCCESS
        : FAIL

    this.updateGraphics()
  }
}

class GqimZone extends Zone {
  constructor (scene, parent) {
    super(scene, 0, 0, DEFAULT_SIDE_SIZE, DEFAULT_SIDE_SIZE)

    this.parent = parent

    this.setDropZone()
    this.setOrigin(0.5)
  }

  isEmpty = () => {
    return !this.getData('dropped')
  }

  onDropIn = (node) => {
    if (this.isEmpty()) {
      node.enterDropZone(this)
      this.setData('dropped', node)
      node.setPosition(this.parent.x, this.parent.y)
    }
  }

  onDropOut = () => {
    this.setData('dropped', false)
  }
}
