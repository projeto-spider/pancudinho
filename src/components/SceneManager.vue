<template>
  <Background>
    <template>
      <div v-if="state.currentlyInGame && currentGame" style="width: 100%; height: 100%">
        <GameMemory
          v-if="currentGame.type === 'memory-game'"
          :cards="currentGame.data.cards"
          :state="state"
          :finish-game="finishGame"
        ></GameMemory>

        <GameGqim
          v-if="currentGame.type === 'gqim-game'"
          :tree="currentGame.data.tree"
          :state="state"
          :finish-game="finishGame"
        ></GameGqim>

        <GameVisualNovel
          v-if="currentGame.type === 'visual-novel'"
          :state="state"
          :scenes="currentGame.data.scenes"
          :on-end="() => state.closeGame()"
          :open-hand-book="word => $refs.handbook.openHandBook(word)"
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
          :title="currentGame.data.title"
          :chunks="currentGame.data.chunks"
          :finish-game="finishGame"
        ></GameBookSelectFillGame>

        <GameSeesaw
          v-if="currentGame.type === 'seesaw-game'"
          :state="state"
          :weight="currentGame.data.weight"
        ></GameSeesaw>

        <GameHeight
          v-if="currentGame.type === 'height-game'"
          :state="state"
        ></GameHeight>
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

    <Rewards
      :open="rewardsOpen"
      :real-percentage="rewardsPercentage"
      :on-continue="rewardsOnContinue"
    ></Rewards>

    <HandBook
      ref="handbook"
    ></HandBook>

    <div class="button-corner">
      <button
        @click="showSettings = !showSettings"
      >
        {{ showSettings ? 'FECHAR' : 'CONFIGURAÇÕES' }}
      </button>

      <button
        v-if="!showSettings"
        class="open-handbook"
        @click="() => $refs.handbook.openHandBook()"
      >
        LIVRO
      </button>
    </div>

    <Mixer
      ref="mixer"
      :volume="volume"
      :mute="mute"
    ></Mixer>

    <div v-if='showSettings' class="settings-container">
      <div class='balloon'>
        <h2>CONFIGURAÇÕES</h2>

        <h2>VELOCIDADE DO TEXTO</h2>

        <button @click.stop="setSpeed(110)">
          <div :style="`color: ${textSpeed === 110 ? 'green' : 'red'}`">
            BAIXA
          </div>
        </button>

        <button @click.stop='setSpeed(65)'>
          <div :style="`color: ${textSpeed === 65 ? 'green' : 'red'}`">
            MÉDIA
          </div>
        </button>

        <button @click.stop='setSpeed(35)'>
          <div :style="`color: ${textSpeed === 35 ? 'green' : 'red'}`">
            ALTA
          </div>
        </button>

        <br>

        <h2>Volume</h2>

        <button @click.stop="setVolume(50)">
          <div :style="`color: ${volume === 50 ? 'green' : 'red'}`">
            BAIXA
          </div>
        </button>

        <button @click.stop='setVolume(75)'>
          <div :style="`color: ${volume === 75 ? 'green' : 'red'}`">
            MÉDIA
          </div>
        </button>

        <button @click.stop='setVolume(100)'>
          <div :style="`color: ${volume === 100 ? 'green' : 'red'}`">
            ALTA
          </div>
        </button>

        <br>

        <h2> EFEITOS SONOROS: </h2>
        <button
          @click.stop="mute = !mute"
          :style="`color: ${mute ? 'red' : 'green'};`"
        >{{ mute ? 'OFF' : 'ON' }}</button>
      </div>
    </div>
  </Background>
</template>

<script>
import * as engine from '../engine'

import Mixer from './Mixer.vue'

import Background from './ui/Background.vue'
import Sidebar from './ui/Sidebar.vue'
import Rewards from './ui/Rewards.vue'
import HandBook from './ui/HandBook.vue'

import GameMemory from './memory-game/Game.vue'
import GameGqim from './gqim-game/GqimGame.vue'
import GameAnalysis from './analysis-game/Game.vue'
import GameVisualNovel from './visual-novel/VisualNovel.vue'
import GameBookDragAndDrop from './book/drag-drop-game/Game.vue'
import GameBookSelectFillGame from './book/select-fill-game/SelectFillGame.vue'
import GameSeesaw from './seesaw-game/SeesawGame.vue'
import GameHeight from './height-game/NewHeightGame.vue'

import PageStart from './pages/Start.vue'
import PageAbout from './pages/About.vue'
import PageAuthentication from './pages/Authentication.vue'

export default {
  name: 'SceneManager',

  components: {
    Mixer,

    Background,
    Sidebar,
    Rewards,
    HandBook,

    GameMemory,
    GameGqim,
    GameAnalysis,
    GameVisualNovel,
    GameBookDragAndDrop,
    GameBookSelectFillGame,
    GameSeesaw,
    GameHeight,

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
    rewardsOpen: false,
    rewardsPercentage: 0,
    // Settings
    showSettings: false,
    mute: false,
    volume: 50,
    // Visual Novel related
    textSpeed: 65
  }),

  methods: {
    finishGame (points) {
      this.rewardsPercentage = points
      this.rewardsOpen = true
    },

    rewardsOnContinue () {
      this.rewardsOpen = false
      this.rewardsPercentage = 0
      this.state.closeGame()
    },

    updateBgm () {
      if (this.currentGame) {
        const key = this.currentGame.data.bgm || 'BgSchoolOfQuirksBearOgg'

        return this.$refs.mixer.setBackground(key)
      }

      this.$refs.mixer.setBackground('BgSchoolOfQuirksBearOgg')
    },

    setSpeed (speed) {
      this.textSpeed = speed
    },

    setVolume (volume) {
      this.volume = volume
    }
  },

  mounted () {
    this.updateBgm()
  },

  computed: {
    currentGame () {
      return this.state.getGame()
    }
  },

  watch: {
    currentGame (currentGame) {
      // TODO
      if (currentGame.type === 'transition') {
        setTimeout(() => this.state.closeGame(), 1)
      }

      this.updateBgm()
    }
  }
}
</script>

<style scoped>
.button-corner {
  position: fixed;
  font-family: Tahoma, Geneva, sans-serif;
  font-weight: bold;
  text-align: center;
  height: 30px;
  top: 5px;
  left: 75px;
  z-index: 50;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-corner > * {
  margin-right: 5px;
}

.settings-container {
  background-color: rgba(0, 0, 0, 0.9);
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
