<template>
  <Background>
    <template>
      <div v-if="state.currentlyInGame && currentGame" style="width: 100%; height: 100%">
        <GameMemory
          v-if="currentGame.type === 'memory-game'"
          :cards="currentGame.data.cards"
          :state="state"
        ></GameMemory>

        <GameGqim
          v-if="currentGame.type === 'gqim-game'"
          :tree="currentGame.data.tree"
          :state="state"
        ></GameGqim>

        <GameVisualNovel
          v-if="currentGame.type === 'visual-novel'"
          :state="state"
        ></GameVisualNovel>

        <GameAnalysis
          v-if="currentGame.type === 'analysis-game'"
          :state="state"
          :options="currentGame.data.options"
          :goal="currentGame.data.goal"
          :tip="currentGame.data.tip"
          :answer="currentGame.data.answer"
          :talks="currentGame.data.talks"
        ></GameAnalysis>

        <GameBookDragAndDrop
          v-if="currentGame.type === 'book-drag-and-drop-game'"
          :state="state"
          :items="currentGame.data.items"
        ></GameBookDragAndDrop>

        <GameBookSelectFillGame
          v-if="currentGame.type === 'book-select-fill-game'"
          :state="state"
        ></GameBookSelectFillGame>
      </div>

      <div v-else>
        <PageStart
          v-if="state.page === PAGE.START"
          :state="state"
        ></PageStart>

        <PageAbout
          v-else-if="state.page === PAGE.ABOUT"
          :state="state"
        ></PageAbout>

        <PageAuthentication
          v-else-if="state.page === PAGE.AUTHENTICATION"
          :state="state"
        ></PageAuthentication>

        <Sidebar
          v-if="state.isAuthenticated()"
          :state="state"
        ></Sidebar>
      </div>
    </template>
  </Background>
</template>

<script>
import * as engine from '../engine'

import Background from './ui/Background.vue'
import Sidebar from './ui/Sidebar.vue'

import GameMemory from './memory-game/Game.vue'
import GameGqim from './gqim-game/GqimGame.vue'
import GameAnalysis from './analysis-game/Game.vue'
import GameVisualNovel from './visual-novel/VisualNovel.vue'
import GameBookDragAndDrop from './book/drag-drop-game/Game.vue'
import GameBookSelectFillGame from './book/select-fill-game/SelectFillGame.vue'

import PageStart from './pages/Start.vue'
import PageAbout from './pages/About.vue'
import PageAuthentication from './pages/Authentication.vue'

export default {
  name: 'SceneManager',

  components: {
    Background,
    Sidebar,

    GameMemory,
    GameGqim,
    GameAnalysis,
    GameVisualNovel,
    GameBookDragAndDrop,
    GameBookSelectFillGame,

    PageStart,
    PageAbout,
    PageAuthentication
  },

  props: {
    state: {
      type: Object,
      default: engine.defaultState
    }
  },

  data: () => ({
  }),

  methods: {
  },

  computed: {
    currentGame () {
      return this.state.getGame()
    }
  }
}
</script>
