import Phaser from 'phaser'
const { Text } = Phaser.GameObjects

const FILL_DARK = '#b2b2b2'
const FILL_LIGHT = '#fff'
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
  constructor (scene, x, y, text, isDraggable = false) {
    super(scene, x, y, [])

    // Creates text
    this.textObject = new Text(scene, 0, 0, text, style)

    // Put origin at center
    this.textObject.setOrigin()

    // Add to container
    this.add(this.textObject)

    // Get the container size
    const textBounds = this.textObject.getBounds()
    const realWidth = textBounds.width + 2 * PANEL_PADDING
    const realHeight = textBounds.height + 2 * PANEL_PADDING

    // Set the container size so we can make it draggable
    this.setSize(realWidth, realHeight)

    // Sets the textObject fill and generates panelObject
    this.setDraggable(isDraggable)

    // Prepare for possible drag
    this.setInteractive()
    scene.physics.add.existing(this)
  }

  setDraggable = (isDraggable) => {
    if (isDraggable === this.isDraggable) {
      return
    }

    this.isDraggable = isDraggable

    const [
      panelTexture,
      fill
    ] = isDraggable
      ? [DRAGGABLE_PANEL, FILL_LIGHT]
      : [STATIC_PANEL, FILL_DARK]

    this.rerenderPanelObject(panelTexture)
    this.textObject.setFill(fill)
  }

  rerenderPanelObject = (texture) => {
    if (this.panelObject) {
      this.remove(this.panelObject)
      this.panelObject.destroy()
    }

    this.panelObject = this.scene.make.nineslice(
      0,
      0,
      this.width,
      this.height,
      texture,
      PANEL_OFFSET
    )

    this.panelObject.setOrigin()

    this.addAt(this.panelObject, 0)
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
