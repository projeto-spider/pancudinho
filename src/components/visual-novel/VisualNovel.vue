<template>
  <div
    class="background"
    :style="`background-image: url(${images[counter]});`"
  >
    <div
      class='balloon-wrapper'
      @click="handleClick()"
    >
      <div class="balloon">
        <div v-if="currentScene && currentScene.name" class="balloon-name">
          {{ currentScene.name }}
        </div>
        <span>{{ showText.length ? showText : '&nbsp;' }}</span>
      </div>

      <div class="btn-wrapper">
        <div
          class='btn btn-auto'
          :class="{ 'btn-auto-on': auto }"
          @click.stop="auto = !auto"
        >Auto</div>
        <div class='btn' @click.stop="handleClick()">>></div>
      </div>
    </div>

    <img v-for="(scene, index) in scenes" :key="index" :src="images[index]" v-show="false">

    <div v-if="currentScene && currentScene.question" v-show="showingOptions" class="option-area">
      <ul>
        <li
          v-for="(option, i) in currentScene.options"
          :key="i"
        >
          <button
            :class="{ 'option-correct': selectedAnswer && option.correct, 'option-incorrect': selectedAnswer === option && !option.correct}"
            @click="selectOption(option)"
          >{{option.text}}</button>
        </li>
      </ul>

      <button v-if="selectedAnswer" @click="continueFromOptions()" class="hide-options-button">Continuar</button>
    </div>
  </div>
</template>

<script>
import Panel from '../ui/Panel.vue'

export default {
  components: {Panel},

  props: {
    state: {
      type: Object,
      required: true
    },

    scenes: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    counter: -1,
    auto: false,
    autoManualPass: false,
    showText: '',
    showTextDigitCount: 0,
    showTextInterval: null,
    images: [],
    showingOptions: false,
    autoWasOnBeforeOptions: false,
    selectedAnswer: false,
    correctAnswer: false,
    interval: false
  }),

  created () {
    this.images = this.scenes.map(scene => {
      return require(`../../assets/${scene.image}`)
    })

    this.interval = setInterval(() => {
      if (this.auto && this.currentScene.text === this.showText) {
        this.auto = false

        setTimeout(() => {
          this.nextText()
          this.auto = true
        }, 1000)
      }
    })

    this.nextText()
  },

  destroyed () {
    clearInterval(this.interval)
  },

  computed: {
    currentScene () {
      return this.scenes[this.counter]
    }
  },

  methods: {
    handleClick () {
      if (this.currentScene.text === this.showText) {
        if (this.auto) {
          this.autoManualPass = true
        }
        return this.nextText()
      }

      this.skipWrittingText()
    },

    skipWrittingText () {
      this.clearShowTextInterval()
      this.showText = this.currentScene.text
    },

    nextText () {
      this.counter++

      this.clearShowTextInterval()

      if (this.counter === this.scenes.length) {
        this.state.closeGame()
      }

      this.showText = ''
      this.showTextDigitCount = 0

      this.showTextInterval = setInterval(() => {
        const nextChar = this.currentScene.text[this.showTextDigitCount++]

        if (!nextChar) {
          return this.clearShowTextInterval()
        }

        this.showText += nextChar
      }, 50)
    },

    clearShowTextInterval () {
      if (this.showTextInterval) {
        clearInterval(this.showTextInterval)
        this.showOptions()
      }
    },

    showOptions () {
      if (!this.currentScene || !this.currentScene.question) {
        return false
      }

      this.showingOptions = true
      this.autoWasOnBeforeOptions = this.auto
      this.auto = false
    },

    selectOption (option) {
      if (this.selectedAnswer) {
        return
      }

      this.selectedAnswer = option
      this.correctAnswer = option.correct
    },

    continueFromOptions () {
      this.selectedAnswer = false
      this.auto = this.autoWasOnBeforeOptions
      this.correctAnswer = false
      this.showingOptions = false

      if (!this.auto) {
        this.nextText()
      }
    }
  }
}

</script>

<style scoped>
.background {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .4);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.nexat{
  width: 100px;
  border: none;
  margin-top:0.1px;
  margin-left: 670px;
  text-align: center;
  background: #70a1ff;
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.0);
  text-shadow: 4px 4px 0px rgba(0,0,0,0.2);
}

.box.aballoon{
  width: 800px;
  height: 100px;
  margin-top: 50px;
  margin-bottom: 10px;
  padding: 0.2em 2em;
  background: #70a1ff;
  border-radius: 5px;
  text-align: left;
  color: rgb(245, 245, 245);
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
}

.balloon-wrapper {
  position: fixed;
  bottom: 0;
  /* padding: 20px; */
  width: 100%;
}

.balloon {
  position: relative;
  width: 90%;
  margin: 20px auto;
  cursor: pointer;
  color: black;
  background-color: #E6E6D3;
  text-align: left;
  min-height: 50px;
  font-size: 1.3em;
  background-color: #E6E6D3;
  border: solid 2px #000;
  border-radius: 15px;
  padding: 18px 20px;
  font-family: none;
  font-weight: bold;
  user-select: none;
  min-height: 100px;
  display: flex;
}

.balloon > span {
  align-self: center;
  max-width: 90%;
}

.balloon-name {
  position: absolute;
  left: 0;
  top: -25px;
  background-color: #D6BAF7;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
}

.text {
  position: absolute;
  bottom: 10px;
  text-align: left;
  width: 100%;
  margin: 0 10px;
  /* border-style: solid;
  box-sizing: border-box;
  user-select: none;

  border-width: 69px 73px 73px; */

  /* min-height: 50px;

  border: solid 2px #000;
  border-radius: 15px;
  padding: 3px 10px;
  text-align: center;
  font-family: none;
  font-weight: bold; */
}

/* Since ballons are on the image, we need this hack */
.text-fix {
  margin-top: -100px;
  margin-left: 100px;
}

.balloon-wrapper .btn-wrapper {
  position: absolute;
  left: 92%;
  bottom: 20px;
  width: 100px;
}

.balloon-wrapper .btn-wrapper .btn {
  margin: 20px auto;
  cursor: pointer;
  color: black;
  background-color: #E6E6D3;
  text-align: center;
  font-size: 1.3em;
  background-color: #E6E6D3;
  border: solid 2px #000;
  border-radius: 15px;
  padding: 6px;
  font-family: none;
  font-weight: bold;
  user-select: none;
}

.balloon-wrapper .btn-wrapper .btn.btn-auto.btn-auto-on {
  background-color: antiquewhite;
}

.btn2{
  color: black;
  position: absolute;
  margin-top: -90px;
  margin-left: 420px;
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
}

.option-area {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100000;
  background: rgba(0,0,0,0.5);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.option-area ul {
  list-style: none;
  width: 75%;
  padding: 0;
  margin: 30px auto;
}

.option-area li {
  width: 100%;
  margin: 10px;
}

.option-area li button {
  width: 100%;
  min-height: 32px;
  text-align: left;
}

.option-correct {
  border-color: green;
}

.option-incorrect {
  border-color: red;
}

.hide-options-button  {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 30px;
}
</style>
