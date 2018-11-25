import Phaser from 'phaser'

const { Scene } = Phaser

const textStyle = {
  fontSize: 18,
  align: 'center',
  wordWrap: {
    width: 300
  },
  fontFamily: 'kenvector_future'
}

export default class UiScene extends Scene {
  constructor () {
    super({
      key: 'UiScene',
      active: false
    })
  }

  create () {
    this.timerCount = 120

    this.text = this.add.text(10, 10, '', textStyle)

    this.interval = setInterval(this.updateTimer, 1000)

    const gameScene = this.scene.get('GqimGameScene')

    gameScene.events.on('revealed', this.stopTimer)
  }

  updateTimer = () => {
    this.text.setText(`Tempo: ${this.timerCount--}`)

    if (this.timerCount < 0) {
      clearInterval(this.interval)
      return this.timeout()
    }
  }

  stopTimer = () => {
    clearInterval(this.interval)
  }

  timeout = () => {
    this.events.emit('timeout')
  }
}
