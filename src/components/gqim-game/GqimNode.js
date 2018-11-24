import Phaser from 'phaser'
const { Text } = Phaser.GameObjects

const FILL_DARK = '#b2b2b2'
const FILL_LIGHT = '#fff'
const DEFALT_WIDTH = 320
const DEFALT_HEIGHT = 200
const STATIC_PANEL = 'greyPanel'
const DRAGGABLE_PANEL = 'bluePanel'
const PANEL_OFFSET = 10
const PANEL_PADDING = 20

const style = {
  fontSize: 18,
  align: 'center',
  wordWrap: {
    width: 300
  },
  fontFamily: 'kenvector_future'
}

export default class Node extends Phaser.GameObjects.Container {
  constructor (scene, x, y, text, draggableStyle = false) {
    super(scene, x, y, [])

    const [
      panelTexture,
      textColor
    ] = draggableStyle
      ? [DRAGGABLE_PANEL, FILL_LIGHT]
      : [STATIC_PANEL, FILL_DARK]

    this.panelObject = scene.make.nineslice(
      0,
      0,
      DEFALT_WIDTH,
      DEFALT_HEIGHT,
      panelTexture,
      PANEL_OFFSET
    )
    this.textObject = new Text(scene, 0, 0, text, {...style, fill: textColor})

    // Get the container size
    const textBounds = this.textObject.getBounds()
    const realWidth = textBounds.width + 2 * PANEL_PADDING
    const realHeight = textBounds.height + 2 * PANEL_PADDING

    // Resize the panel to fit
    this.panelObject.setSize(realWidth, realHeight)

    // Set the container size so we can make it draggable
    this.setSize(realWidth, realHeight)

    // Put origin at center
    this.panelObject.setOrigin()
    this.textObject.setOrigin()

    // Add to container
    this.add(this.panelObject)
    this.add(this.textObject)
  }

  enterDropZone (dropZone) {
    this.setData('droppedIn', dropZone)
  }

  leaveDropZone () {
    const currentDropZone = this.getData('droppedIn')

    if (currentDropZone) {
      currentDropZone.onDropOut(this)
      this.setData('droppedIn', false)
    }
  }
}
