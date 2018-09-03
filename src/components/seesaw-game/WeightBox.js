import Phaser from 'phaser'

const BOX_WIDTH = 128
const BOX_HEIGHT = BOX_WIDTH

export default class WeightBox extends Phaser.GameObjects.Container {
  constructor (scene, x, y, weight) {
    super(scene, x, y, [])

    const image = new Phaser.GameObjects.Image(scene, x, y, 'boxCrate')

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
  }

  updateWeight (weight) {
    this.text.setText(`${weight}kg`)
    this.weight = weight
  }

  increaseWeight (by = 1) {
    this.updateWeight(this.weight + by)
  }

  decreaseWeight (by = 1) {
    this.updateWeight(this.weight - by)
  }
}
