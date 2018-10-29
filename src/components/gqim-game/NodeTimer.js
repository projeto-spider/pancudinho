import Phaser from 'phaser'

import withPanel from '../ui/mixins/with-panel'

const FILL_DARK = '#b2b2b2'
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

export default class NodeTimer extends Phaser.GameObjects.Text {
  constructor (scene, x, y, count) {
    super(scene, x, y, String(count), style)
    this.setOrigin()
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.count = count
  }

  setCount = (count) => {
    if (count >= 0) {
      this.count = count
      this.setText(String(count))
    }
  }
}
