import Phaser from 'phaser'

const { Text } = Phaser.GameObjects

const FILL_LIGHT = '#fff'

const style = {
  fontSize: 12,
  backgroundColor: '#8EC1DA',
  fill: FILL_LIGHT,
  align: 'center',
  wordWrap: {
    width: 300
  },
  padding: {
    left: 10,
    top: 10,
    bottom: 10,
    right: 5
  },
  borderRadius: 3,
  fontFamily: 'kenvector_future'
}

export default class NodeTimer extends Text {
  constructor (scene, x, y, count) {
    super(scene, x, y, String(count), style)

    this.count = count

    this.setOrigin()
    scene.physics.add.existing(this)
  }

  setCount = (count) => {
    if (count < 0) {
      return
    }

    this.count = count
    this.setText(String(count))
  }
}
