import greyPanel from '../../assets/grey_panel.png'
import bluePanel from '../../assets/blue_panel.png'

const frameKeys = [
  [ 'topLeft'  ,  'top'  ,  'topRight'  ], // eslint-disable-line
  [   'left'   , 'center',    'right'   ], // eslint-disable-line
  ['bottomLeft', 'bottom', 'bottomRight']  // eslint-disable-line
]

const textures = {
  greyPanel,
  bluePanel
}

export default function preloadGqimGame (scene) {
  Object.entries(textures)
    .forEach(([key, url]) =>
      scene.load.image(key, url)
    )
  scene.load.on('complete', file => {
    Object.keys(textures)
      .forEach(textureKey => setPanelFrames(scene, textureKey))
  })
}

function setPanelFrames (scene, textureKey) {
  const frame = scene.textures.getFrame(textureKey)
  const { texture } = frame
  const frameNames = new Set(texture.getFrameNames())

  const padding = {
    top: 27,
    left: 27,
    right: 27,
    bottom: 27
  }

  const ys = [0, padding.top, frame.height - padding.bottom]
  const xs = [0, padding.left, frame.width - padding.right]
  const heights = [padding.top, frame.height - padding.top - padding.bottom, padding.bottom]
  const widths = [padding.left, frame.width - padding.left - padding.right, padding.right]

  frameKeys.forEach((row, yi) =>
    row.forEach((key, xi) => {
      if (!frameNames.has(key)) {
        texture.add(key, frame.sourceIndex, xs[xi], ys[yi], widths[xi], heights[yi])
      }
    })
  )
}
