import Phaser from 'phaser'

const frameKeys = [
  [ 'topLeft'  ,  'top'  ,  'topRight'  ], // eslint-disable-line
  [   'left'   , 'center',    'right'   ], // eslint-disable-line
  ['bottomLeft', 'bottom', 'bottomRight']  // eslint-disable-line
]

export default class Panel extends Phaser.GameObjects.RenderTexture {
  constructor (scene, parent, textureKey) {
    const { x, y, width, height } = parent.getBounds()

    super(scene, x, y, width, height)

    this.parent = parent

    const frame = scene.textures.getFrame(textureKey)
    const { texture } = frame
    const frameNames = new Set(texture.getFrameNames())

    this.padding = {
      top: 27,
      left: 27,
      right: 27,
      bottom: 27
    }

    const ys = [0, this.padding.top, frame.height - this.padding.bottom]
    const xs = [0, this.padding.left, frame.width - this.padding.right]
    const heights = [this.padding.top, frame.height - this.padding.top - this.padding.bottom, this.padding.bottom]
    const widths = [this.padding.left, frame.width - this.padding.left - this.padding.right, this.padding.right]

    frameKeys.forEach((row, yi) =>
      row.forEach((key, xi) => {
        if (!frameNames.has(key)) {
          texture.add(key, frame.sourceIndex, xs[xi], ys[yi], widths[xi], heights[yi])
        }
      })
    )

    this.frames = frameKeys.map((row, yi) =>
      row.map((key, xi) =>
        this.scene.add.image(0, 0, 'greyPanel', key)
      )
    )

    this.positionFrames()
  }

  setPosition = (x, y) => {
    this.constructor.prototype.setPosition.call(this, x, y)
    const nextBounds = this.parent.getBounds()
    this.x = nextBounds.x
    this.y = nextBounds.y
    this.width = nextBounds.width
    this.height = nextBounds.height
    this.positionFrames()
  }

  positionFrames = () => {
    const ys = [
      this.y,
      this.y + this.padding.top,
      this.y + this.height - this.padding.top
    ]
    const xs = [
      this.x,
      this.x + this.padding.left,
      this.x + this.width - this.padding.right
    ]
    const heights = [
      this.padding.top,
      this.height - this.padding.top - this.padding.bottom,
      this.padding.bottom
    ]
    const widths = [
      this.padding.left,
      this.width - this.padding.left - this.padding.right,
      this.padding.right
    ]

    this.frames.forEach((row, yi) =>
      row.forEach((image, xi) => {
        image.setPosition(xs[xi], ys[yi])
        image.setOrigin(0, 0)
        image.setSize(widths[xi], heights[yi])
        image.setDisplaySize(widths[xi], heights[yi])
        image.setDepth(-1)
      })
    )
  }
}
