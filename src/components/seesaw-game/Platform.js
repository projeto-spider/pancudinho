import Phaser from 'phaser'
import Pancudinho from './Pancudinho'
import WeightBox from './WeightBox'

const PLATFORM_WIDTH = 256
const PLATFORM_HEIGHT = 18

export default class Platform extends Phaser.GameObjects.Container {
  constructor (scene, x, y) {
    super(scene, x, y, [])

    this.weight = 0
    this.load = null

    const tileSprite = this.scene.add.tileSprite(0, 0, PLATFORM_WIDTH, PLATFORM_HEIGHT, 'machine-platform')

    this.add(tileSprite)

    this.tileSprite = tileSprite

    this.scene.add.existing(this)

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

  tweenTo (y) {
    this.scene.tweens.add({
      targets: [this],
      props: {
        y: {
          value: y < 0 ? `-=${Math.abs(y)}` : `+=${y}`,
          ease: 'Power1',
          duration: 1000
        }
      },
      onComplete: () => {
      }
    })
  }

  increaseLoadWeight (by) {
    if (!this.load || !this.load.updateWeight) {
      return
    }

    this.load.updateWeight(this.load.weight + by)

    const { height } = this.load.image.getBounds()

    this.load.y = -(height / 2)
    this.weight = this.load.weight
  }

  decreaseLoadWeight (by) {
    return this.increaseLoadWeight(-by)
  }

  addPancudinho (weight) {
    return this.addLoad(new Pancudinho(this.scene, 0, 0, weight), weight)
  }

  addWeightBox (weight) {
    return this.addLoad(new WeightBox(this.scene, 0, 0, weight), weight)
  }

  addLoad (object, weight) {
    if (this.load) {
      throw new Error('Already have a load')
    }

    this.load = object
    this.weight += weight

    const { height } = object.getBounds()
    // this.scene.add.existing(object)
    this.add(object)

    object.setPosition(object.x, object.y - (height / 2))

    return object
  }

  removeLoad () {
    // const loadIndex = this.loads.findIndex((load) => gameObject === load.gameObject)
    this.weight -= this.load.weight
    this.remove(this.load)
    this.load = null
  }
}
