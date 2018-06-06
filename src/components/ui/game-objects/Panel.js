import Phaser from 'phaser'

const frameKeys = [
  [ 'topLeft'  ,  'top'  ,  'topRight'  ], // eslint-disable-line
  [   'left'   , 'center',    'right'   ], // eslint-disable-line
  ['bottomLeft', 'bottom', 'bottomRight']  // eslint-disable-line
]

const PADDING = 27

export default class Panel extends Phaser.GameObjects.RenderTexture {
  constructor (scene, parent, panel) {
    const { x, y, width, height } = parent.getBounds()

    super(scene, x, y, width, height)

    this.parent = parent
    this.textureKey = `${panel}Panel`

    this.frames = frameKeys.map((row, yi) =>
      row.map((key, xi) =>
        scene.add.image(0, 0, this.textureKey, key)
      )
    )

    this.positionFrames()
  }

  setDepth = (depth) => {
    this.constructor.prototype.setDepth.call(this, depth)
    this.frames.forEach(row =>
      row.forEach(frame => {
        frame.setDepth(depth)
      })
    )
  }

  setPanel = (panel) => {
    this.textureKey = `${panel}Panel`

    this.frames = this.frames.map((row) =>
      row.map((frame) => {
        const key = frame.frame.name
        frame.destroy()
        return this.scene.add.image(0, 0, this.textureKey, key)
      })
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
      this.y + PADDING,
      this.y + this.height - PADDING
    ]
    const xs = [
      this.x,
      this.x + PADDING,
      this.x + this.width - PADDING
    ]
    const heights = [
      PADDING,
      this.height - PADDING - PADDING,
      PADDING
    ]
    const widths = [
      PADDING,
      this.width - PADDING - PADDING,
      PADDING
    ]

    this.frames.forEach((row, yi) =>
      row.forEach((image, xi) => {
        image.setPosition(xs[xi], ys[yi])
        image.setOrigin(0, 0)
        image.setSize(widths[xi], heights[yi])
        image.setDisplaySize(widths[xi], heights[yi])
      })
    )
  }
}
