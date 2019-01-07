<template>
  <Panel>
    <div v-for="(scene, index) in scenes" :key="scene.id" v-show="index === counter">
      <div>
        <img :src="images[index]">
      </div>

      <div
        class='text'
        :class="{ 'text-fix': [0, 5, 8, 9, 10, 11].includes(index) }"
      >
        {{ showText }}
      </div>
    </div>
    {{passAuto}}
    <div v-if='auto'>
      <div class='btn' style='color: green; ' @click="auto=!auto">Auto</div><br>
    </div>
    <div v-else>
      <div class='btn' style='color: red;' @click="auto=!auto">Auto</div><br>
    </div>
    <div class='btn' @click="handleClick()" @click.prevent="displayText()">>></div>
  </Panel>

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
    images: []
  }),

  created () {
    this.images = this.scenes.map(scene => {
      return require(`../../assets/${scene.image}`)
    })

    this.nextText()
  },

  computed: {
    currentScene () {
      return this.scenes[this.counter]
    },
    passAuto () {
      if (this.auto) {
        if (this.currentScene.text === this.showText) {
          let vm = this

          setTimeout (
            function () {
              if (!vm.autoManualPass){
                return vm.nextText()
              }
              vm.autoManualPass = false
            } , 1000)
        }
      }
    }
  },

  methods: {

    handleClick () {


      if (this.currentScene.text === this.showText) {
        if (this.auto){
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
      }
    }
  }
}

</script>

<style scoped>
.next{
  width: 100px;
  border: none;
  margin-top:0.1px;
  margin-left: 670px;
  text-align: center;
  background: #70a1ff;
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgba(0,0,0,0.0);
  text-shadow: 4px 4px 0px rgba(0,0,0,0.2);
  font: 400 30px/1.3 'Arizonia', Helvetica, sans-serif;
}

.box.balloon{
  width: 800px;
  height: 100px;
  margin-top: 50px;
  padding: 0.2em 2em;
  background: #70a1ff;
  border-radius: 5px;
  text-align: left;
  color: rgb(245, 245, 245);
  box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
  text-shadow: 4px 4px 0px rgba(0,0,0,0.1);
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
}

.text {
  color: black;
  position: absolute;
  margin-top: -130px;
  margin-left: 95px;
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
}

/* Since ballons are on the image, we need this hack */
.text-fix {
  margin-top: -100px;
  margin-left: 100px;
}

.btn{
  color: black;
  position: absolute;
  margin-top: -80px;
  margin-left: 900px;
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
}

.btn2{
  color: black;
  position: absolute;
  margin-top: -90px;
  margin-left: 420px;
  font: 400 20px/1.3 'Arizonia', Helvetica, sans-serif;
}

</style>
