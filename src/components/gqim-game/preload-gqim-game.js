import greyPanel from '../../assets/grey_panel.png'
import bluePanel from '../../assets/blue_panel.png'

const textures = {
  greyPanel,
  bluePanel
}

const DOWN_LEFT = 'down-left'
const DOWN_RIGHT = 'down-right'
const UP_LEFT = 'up-left'
const UP_RIGHT = 'up-right'

const leavePositions = [DOWN_LEFT, DOWN_RIGHT, UP_LEFT, UP_RIGHT]

export default function preloadGqimGame (scene) {
  scene.load.image('background', require('../../assets/gqim-game/background.png'))

  Object.entries(textures)
    .forEach(([key, url]) =>
      scene.load.image(key, url)
    )

  for (let type of ['dead', 'alive']) {
    for (let position of leavePositions) {
      const key = `${type}/${position}`
      scene.load.image(key, require(`../../assets/gqim-game/leaves/${key}.png`))
    }
  }
}
