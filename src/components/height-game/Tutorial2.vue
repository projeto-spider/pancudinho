<template>
  <div class="aligner">
      <template>
        <div class='balloon'>
          <div class='text'>{{showText}}</div>
          <div class='text2' @click='handleClick()'>>></div>
        </div>
      </template>
  </div>
</template>

<script>
import Background from '../ui/Background.vue'
import Panel from '../ui/Panel.vue'

export default {

  components: {
    Background,
    Panel,
  },
  props: {
    finishTutorial: {
      type: Function,
      default: () => ({})
    }
  },
  data: () => ({
    counter2: -1,
    showText: '',
    showTextDigitCount: 0,
    showTextInterval: 0,
    tutorial: [
        {
          text: '(...)'
        }
    ]
  }),
  created () {
    this.nextText()
  },
  methods: {
    handleClick () {
      if (this.tutorial[this.counter2].text === this.showText) {
        this.nextText()
      } else {
        this.skipWrittingText()
      }
    },
    nextText() {
      this.counter2++
      if (this.counter2 < this.tutorial.length) {
        this.showText = ''
        this.showTextDigitCount = 0
        this.showTextInterval = setInterval(() => {
          const nextChar = this.tutorial[this.counter2].text[this.showTextDigitCount++]
          if (!nextChar) {
            this.clearShowTextInterval()
            return
          } else {
            this.showText += nextChar
          }
        }, 50)
      } else {
        this.finishTutorial()
        return
      }
    },
    skipWrittingText () {
      this.clearShowTextInterval()
      this.showText = this.tutorial[this.counter2].text
    },
    clearShowTextInterval () {
      if (this.showTextInterval) {
        clearInterval(this.showTextInterval)
      }
    },
  }
}
</script>

<style scoped>
.aligner {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.ScenePanel {
  width: 90%;
  height: 90%;
}
.submit-button {
  float: right
}
.balloon{
  width: 800px;
  height: 100px;
  top: 400px;
  left: 250px;
  margin-top: 100px;
  padding: 0.1em 1em;
  position: absolute;
  background: #FFD700;
  border-radius: 5px;
  text-align: flex-start;
  color: rgb(245, 245, 245);
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
}
.text {
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
  color: black;
}
.text2 {
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
  color: black;
  position: fixed;
  left: 1000px;
  top: 80px;
}
</style>
