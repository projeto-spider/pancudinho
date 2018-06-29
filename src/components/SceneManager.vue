<template>
  <Background>
    <template>
      <div v-if="state.currentlyInGame && currentGame" style="width: 100%; height: 100%">
        <GameMemory
          v-if="currentGame.type === 'memory-game'"
          :cards="currentGame.data.cards"
        ></GameMemory>

        <GameGqim
          v-if="currentGame.type === 'gqim-game'"
          :tree="currentGame.data.tree"
        ></GameGqim>
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
