import Phaser from 'phaser'

const { Scene } = Phaser

const timerTextStyle = {
  fontSize: 18,
  align: 'center',
  wordWrap: {
    width: 300
  },
  fontFamily: 'kenvector_future'
}

const dialogTextStyle = {
  fontSize: '18px',
  padding: { x: 10, y: 5 },
  backgroundColor: '#ffffff',
  fill: '#000000',
  wordWrap: {
    width: 500
  }
  // fontFamily: 'kenvector_future'
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

    this.timerText = this.add.text(10, 10, '', timerTextStyle)

    this.interval = setInterval(this.updateTimer, 1000)

    const gameScene = this.scene.get('GqimGameScene')

    gameScene.events.on('revealed', this.stopTimer)
    gameScene.events.on('ui:text', this.showText)
  }

  updateTimer = () => {
    this.timerText.setText(`Tempo: ${this.timerCount--}`)

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

  showText = ({ text, time }) => {
    const x = this.sys.game.config.width / 2
    const y = 100
    const dialogText = this.add.text(x, y, text, dialogTextStyle)
    dialogText.alpha = 0
    dialogText.setOrigin()

    this.tweens.add({
      targets: [dialogText],
      alpha: 1,
      ease: 'Power1',
      onComplete: () => {
        if (time) {
          setTimeout(() => {
            this.tweens.add({
              targets: [dialogText],
              alpha: 0,
              ease: 'Power1',
              onComplete: () => {
                dialogText.destroy()
              }
            })
          }, time * 1000)
        }
      }
    })
  }
}
