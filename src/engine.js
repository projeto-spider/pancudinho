const GAME_STATE = 'pancudinho/game-state'

export const PAGE = {
  START: 'pancudinho/PAGE_START',
  ABOUT: 'pancudinho/PAGE_ABOUT',
  AUTHENTICATION: 'pancudinho/AUTHENTICATION'
}

const validPages = new Set(Object.values(PAGE))

export class State {
  playerName = null
  newGame = true
  page = PAGE.START

  constructor (state = {}) {
    for (let [key, value] of Object.entries(state)) {
      this[key] = value
    }
  }

  saveState () {
    if (!State.checkIntegrity(this)) {
      throw new Error('Invalid state')
    }

    localStorage.setItem(GAME_STATE, JSON.stringify(this))
  }

  static getSavedState () {
    const savedStateRaw = localStorage.getItem(GAME_STATE)

    if (!savedStateRaw) {
      return new State()
    }

    let savedState

    try {
      savedState = JSON.parse(savedStateRaw)
    } catch (_) {
      return new State()
    }

    if (State.checkIntegrity(savedState)) {
      return new State(savedState)
    }

    return new State()
  }

  static checkIntegrity (state) {
    if (typeof state.newGame !== 'boolean') {
      return false
    }

    if (!state.playerName && !state.newGame) {
      return false
    }

    return true
  }

  isAuthenticated () {
    return !this.newGame && this.playerName != null
  }

  goTo (pageName) {
    if (!validPages.has(pageName)) {
      throw new Error('Invalid page name', pageName)
    }

    this.page = pageName
  }

  authenticate (playerName) {
    this.newGame = false
    this.playerName = playerName
    this.goTo(PAGE.START)
  }
}

export function defaultState () {
  return new State()
}
