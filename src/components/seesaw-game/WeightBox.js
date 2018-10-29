import Phaser from 'phaser'

const MIN_WEIGHT = 1
const MAX_WEIGHT = 250

export default class WeightBox extends Phaser.GameObjects.Container {
  constructor (scene, x, y, weight) {
    super(scene, x, y, [])

    const image = new Phaser.GameObjects.Image(scene, x, y, 'weight')

    const label = `${weight}kg`

    const text = new Phaser.GameObjects.Text(scene, x, y, label, {
      color: '#dedede',
      align: 'center',
      fontSize: 24
    })

    this.add(image)
    this.add(text)

    this.image = image
    this.text = text
    this.weight = weight
    this.label = label

    this.text.setOrigin(0.5)

    // this.scene.add.existing(image)
    // this.scene.add.existing(text)
    // this.scene.add.existing(this)

    // this.scene.events.on('update', this.update, this)
  }

  update () {
    // Debug Container Bounds {{{
    // if (!this.graphics) this.graphics = this.scene.add.graphics()
    // this.graphics.clear()
    // this.graphics.lineStyle(1, 0xffff00)
    // this.graphics.strokeRectShape(this.getBounds())
    // }}} Debug Container Bounds
  }

  updateWeight (weight) {
    weight = Math.max(MIN_WEIGHT, Math.min(MAX_WEIGHT, weight))

    this.text.setText(`${weight}kg`)
    this.weight = weight

    const dimensions = 128 + (weight * 0.5)

    this.image.setDisplaySize(dimensions, dimensions)
  }

  increaseWeight (by = 1) {
    this.updateWeight(this.weight + by)
    if (this.parentContainer) {
      this.parentContainer.weight += by
    }
  }

  decreaseWeight (by = 1) {
    this.updateWeight(this.weight - by)
    if (this.parentContainer) {
      this.parentContainer.weight -= by
    }
  }
}
