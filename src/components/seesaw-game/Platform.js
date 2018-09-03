import Phaser from 'phaser'
import WeightBox from './WeightBox'

const PLATFORM_WIDTH = 256
const PLATFORM_HEIGHT = 18

export default class Platform extends Phaser.GameObjects.Container {
  constructor (scene, x, y) {
    super(scene, x, y, [])

    this.weight = 0
    this.loads = []

    const tileSprite = this.scene.add.tileSprite(0, 0, PLATFORM_WIDTH, PLATFORM_HEIGHT, 'machine-platform')

    this.add(tileSprite)

    this.tileSprite = tileSprite

    this.scene.add.existing(this)


    // const label = `${weight}kg`

    // this.image = this.scene.add.image(x, y, 'boxCrate')
    // this.text = this.scene.add.text(x, y, label, {
    //   color: '#dedede',
    //   align: 'center',
    //   fontSize: 24
    // })
    // this.text.setOrigin(0.5)

    this.scene.events.on('update', this.update, this)
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

  addObject (object, weight) {
    const box = this.scene.add.existing(object)
    const { height } = box.getBounds()

    const topmostY = this.loads
      .map(({gameObject}) => gameObject.getBounds().y)
      .reduce((a, b) => Math.min(a, b), height / 2)

    box.setPosition(box.x, topmostY - height)
    this.addLoad(box, weight)
    return box
  }

  addBox (weight) {
    return this.addObject(new WeightBox(this.scene, 0, 0, weight), weight)
  }

  addLoad (gameObject, weight) {
    this.loads.push({gameObject, weight})
    this.weight += weight
    this.scene.add.existing(gameObject)
    // this.add(gameObject)
  }

  removeLoad (gameObject) {
    const loadIndex = this.loads.findIndex((load) => gameObject === load.gameObject)
    this.weight -= this.loads[loadIndex].weight
    this.loads.splice(loadIndex, 1)
    this.remove(gameObject)
  }
}
