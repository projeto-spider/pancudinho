import Panel from '../game-objects/Panel'

export default function withPanel (cls, defaultPanel = 'blue') {
  const withPanelClass = class extends cls {
    constructor (...args) {
      super(...args)

      this.setPadding(27, 27, 27, 27)
      this.panel = new Panel(this.scene, this, defaultPanel)
      this.setDepth(10)
    }

    setPosition = (x, y) => {
      this.constructor.prototype.setPosition.call(this, x, y)
      this.panel.setPosition(x, y)
    }

    setDepth = depth => {
      this.constructor.prototype.setDepth.call(this, depth)
      this.panel.setDepth(depth - 1)
    }
  }

  return withPanelClass
}
