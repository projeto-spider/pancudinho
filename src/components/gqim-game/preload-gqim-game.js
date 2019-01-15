import greyPanel from '../../assets/grey_panel.png'
import bluePanel from '../../assets/blue_panel.png'

const textures = {
  greyPanel,
  bluePanel
}

export default function preloadGqimGame (scene) {
  Object.entries(textures)
    .forEach(([key, url]) =>
      scene.load.image(key, url)
    )
}
